# ☁️ CloudStore – AWS Cloud & DevOps Project

CloudStore is a full-stack e-commerce application deployed using AWS cloud infrastructure and DevOps practices.

The project demonstrates hands-on implementation of **AWS networking, compute, database, caching, load balancing, CDN, deployment, monitoring and alerting** in a production-oriented architecture.

---

## 🚀 Project Overview

CloudStore provides a product-based e-commerce interface with a React.js frontend and Node.js/Express backend.

The application is deployed on AWS with a scalable architecture using:

- EC2
- VPC
- Application Load Balancer
- Network Load Balancer
- RDS
- Redis
- S3
- CloudFront
- Nginx
- Prometheus
- Grafana
- Alertmanager

---

## 🏗️ Architecture

```text
                         👤 User
                           │
                           ▼
                    ☁️ CloudFront
                           │
                           ▼
                       ⚖️ ALB
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
        🖥️ EC2 Server              🖥️ EC2 Server
        Frontend/API                Backend/API
              │                         │
              │                    ┌────┴────┐
              │                    ▼         ▼
              │                  🗄️ RDS    🔴 Redis
              │
              ▼
             🪣 S3

                  🔍 Monitoring Layer
                         │
              ┌──────────┼──────────┐
              ▼          ▼          ▼
          Prometheus   Grafana   Alertmanager
              │
              ▼
        Node Exporter
