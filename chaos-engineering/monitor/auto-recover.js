const { exec } = require('child_process');
const cron = require('node-cron');

// 🤖 CHAOSGUARD AUTO-RECOVERY ENGINE
console.log('🚀 ChaosGuard Auto-Recovery ACTIVE - Monitoring pods...');

// Check every 30 seconds for crashed pods
cron.schedule('*/30 * * * * *', () => {
  console.log('🔍 Scanning for CrashLoopBackOff pods...');
  
  exec('kubectl get pods --no-headers 2>/dev/null | grep -i crashloopbackoff || true', (err, stdout, stderr) => {
    if (stdout.trim()) {
      console.log('❌ CRASH DETECTED:', stdout.trim());
      
      // Auto-restart chaos-app deployment
      exec('kubectl rollout restart deployment chaos-app', (restartErr, restartStdout) => {
        if (restartErr) {
          console.log('⚠️  Restart command failed:', restartErr.message);
        } else {
          console.log('✅ AUTO-RECOVERY TRIGGERED - chaos-app restarted!');
        }
      });
    }
    
    // Check pod restarts count
    exec('kubectl get pods --no-headers 2>/dev/null | awk "{print \\$4}" | grep -v "0" | sort -nr | head -5', (err, stdout) => {
      if (stdout.trim()) {
        console.log('📊 TOP RESTARTS:', stdout.trim());
      }
    });
  });
});

// Alert on high restart counts (>10 restarts)
cron.schedule('*/10 * * * * *', () => {
  exec('kubectl get pods --no-headers 2>/dev/null | awk "{if($4>10) print $0}" || true', (err, stdout) => {
    if (stdout.trim()) {
      console.log('🔥 CRITICAL: Pods with 10+ restarts!', stdout.trim());
    }
  });
});

// Recovery stats every 5 minutes
cron.schedule('*/5 * * * *', () => {
  exec('kubectl get pods --no-headers 2>/dev/null | wc -l', (err, podCount) => {
    exec('kubectl get events --sort-by=.lastTimestamp -1 | grep -i restart | tail -1 || true', (eventErr, lastEvent) => {
      console.log(`📈 STATS: ${podCount.trim()} pods active | Last event: ${lastEvent.trim() || 'None'}`);
    });
  });
});

console.log('⏰ Auto-recovery scheduled: 30s checks + 10s critical alerts');
console.log('💾 Logs saved to monitor/auto-recover.log');