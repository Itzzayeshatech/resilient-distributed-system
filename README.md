\# 🚀 Resilient Distributed System Simulator



\## 🧠 Overview



This project simulates a fault-tolerant distributed system with retry mechanisms, failover handling, and auto-recovery logic. It demonstrates how modern backend systems maintain availability under failures.



\---



\## 🔥 Key Features



\* 🔁 Retry Mechanism (handles transient failures)

\* ❌ Failover Handling (switches to backup node)

\* 🔄 Auto-Recovery Logic (restarts failed nodes)

\* 📊 Basic Observability (logs + metrics)

\* ⚡ Chaos Simulation (random failures \& delays)



\---



\## 🏗️ Architecture



Client → Node1 → (Failure) → Retry → Node2 → Success



\---



\## ⚙️ Tech Stack



\* Java (Core Logic)

\* Git \& GitHub

\* System Design Concepts



\---



\## ▶️ How to Run



```bash

javac Main.java

java Main

```



\---



\## 📸 Sample Output



```

Starting Distributed System...



Attempt 1: Sending request to Node1

Checking Node1...

Node1 FAILED

Retrying with Node2...

Checking Node2...

Node2 SUCCESS



Request Completed Successfully

```



\---



\## 🎯 Learning Outcomes



\* Distributed Systems Basics

\* Fault Tolerance

\* Retry \& Failover Design

\* System Resilience Concepts



\---



\## 🎥 Demo



(Add your demo video link here)



\---



\## 🚀 Future Improvements



\* Spring Boot Microservices

\* Docker Deployment

\* Kubernetes Integration

\* Prometheus \& Grafana Monitoring



\---



