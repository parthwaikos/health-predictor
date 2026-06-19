
---

# architecture.md

```md
# SYSTEM ARCHITECTURE

---

# 📌 Overview

The AI Health Predictor follows a layered architecture that separates responsibilities into frontend, backend, machine learning, and storage layers.

This architecture ensures:

- Scalability
- Maintainability
- Modularity
- Easier debugging
- Better performance optimization

---

# 🏗️ High-Level Architecture

```txt
                    ┌───────────────────────────┐
                    │        USER (WEB)         │
                    │  (Browser / Frontend UI) │
                    └─────────────┬────────────┘
                                  │
                                  ▼
                    ┌───────────────────────────┐
                    │        FRONTEND           │
                    │ (React / HTML / CSS / JS)│
                    │ - Forms (Input Data)     │
                    │ - Dashboard UI           │
                    │ - Charts & Results       │
                    └─────────────┬────────────┘
                                  │ API CALL (HTTP)
                                  ▼
                    ┌───────────────────────────┐
                    │        BACKEND API        │
                    │ (FastAPI / Python)        │
                    │ - Request Handling       │
                    │ - Data Validation        │
                    │ - Business Logic         │
                    └─────────────┬────────────┘
                                  │
                                  ▼
                    ┌───────────────────────────┐
                    │     MACHINE LEARNING      │
                    │ (Scikit-learn Models)     │
                    │ - Model Training          │
                    │ - Prediction Engine       │
                    └─────────────┬────────────┘
                                  │
                                  ▼
                    ┌───────────────────────────┐
                    │        DATA STORAGE       │
                    │ (CSV / SQLite / MongoDB) │
                    │ - User Data              │
                    │ - Health Records         │
                    └───────────────────────────┘