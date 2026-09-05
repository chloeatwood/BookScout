# 📚 BookScout

BookScout is a mobile book discovery and tracking application that I am building as a personal software engineering project.

The long-term goal is to create an application that helps users discover books, track their personal library, and eventually compare book prices across different sources.

The project is also being used as a way to learn and apply **full-stack development, APIs, databases, data engineering, and machine learning** as the application grows.

---

## 🚧 Current Status

**Active development**

BookScout currently consists of a **React Native / Expo mobile application**. The frontend and core navigation are being developed first, with backend and data features planned as the application grows.

### Current Progress

* [x] Expo / React Native project setup
* [x] TypeScript
* [x] Application navigation
* [x] Initial application UI
* [x] Book search screen UI
* [ ] Connect book search to an external API
* [ ] Display real book search results
* [ ] Book details screen
* [ ] ISBN / barcode scanning
* [ ] Personal bookshelf
* [ ] Backend API
* [ ] Database
* [ ] User accounts / authentication
* [ ] Book price data collection
* [ ] Price comparison
* [ ] Data analysis
* [ ] Book recommendation system
* [ ] Cloud deployment

---

## 📱 Current Application

The mobile application is built with:

* **React Native**
* **Expo**
* **TypeScript**
* **Expo Router**
* **React Navigation**

The current focus is building out the mobile experience and connecting it to real book data.

---

## 🗺️ Planned Architecture

As BookScout grows, the application is planned to evolve toward a full-stack architecture:

```text
┌─────────────────────────────┐
│       React Native App      │
│       Expo + TypeScript     │
└──────────────┬──────────────┘
               │
               │ HTTP / REST
               ▼
┌─────────────────────────────┐
│        Backend API          │
│       Python + FastAPI      │
└──────────────┬──────────────┘
               │
        ┌──────┴──────┐
        ▼             ▼
┌──────────────┐ ┌──────────────┐
│   Database   │ │ External APIs│
│              │ │              │
│ PostgreSQL*  │ │ Open Library │
└──────────────┘ └──────────────┘
```

* The database technology has not been finalized. PostgreSQL is currently one option being considered.

The architecture will evolve as the project develops.

---

## 🔎 Book Search

The first major functional feature is book search.

The planned flow is:

```text
User enters a title or author
            ↓
      Search request
            ↓
      Book data API
            ↓
       Parse results
            ↓
    Display book results
            ↓
      Select a book
            ↓
      Book details
```

The initial external data source will be the **Open Library API**.

---

## 🧠 Data & Machine Learning Goals

Machine learning and data engineering are **future stages of the project**, rather than current features.

Potential future components include:

### Data Engineering

* Book and edition data collection
* Data cleaning and normalization
* ETL pipelines
* Historical price tracking
* Price comparison
* Book/edition entity matching

### Machine Learning

* Content-based book recommendations
* Book similarity
* NLP and text embeddings
* Vector-based representations
* Price prediction

These features will be added after the core application and data infrastructure are established.

---

## 🛠️ Technology Roadmap

### Current

* React Native
* Expo
* TypeScript
* Expo Router
* React Navigation

### Planned

**Backend**

* Python
* FastAPI

**Database**

* PostgreSQL or another free relational database solution

**Data**

* Python
* pandas
* NumPy

**Machine Learning**

* scikit-learn
* NLP
* Embeddings

**External Services**

* Open Library API
* Additional APIs as needed

**Deployment**

* Docker
* Cloud hosting

---

## 🚀 Development Roadmap

### Phase 1 — Mobile Application

* [x] Project setup
* [x] Navigation
* [x] Initial UI
* [x] Search screen
* [X] Connect search to Open Library
* [X] Display search results
* [X] Book details
* [X] ISBN/barcode scanning

### Phase 2 — User Features / Backend

* [X] Personal bookshelf
* [ ] Design Database Schema
* [ ] Setup backend and connect to frontend
  * [ ] FastAPI
  * [ ] REST API
  * [ ] Database
* [ ] Add login/out pages
* [ ] Add/remove books
* [ ] Track reading status
* [ ] User accounts
* [ ] User authentication
* [ ] Persist book and user data

### Phase 3 — Price Tracking

* [ ] Collect price data
* [ ] Normalize book editions
* [ ] Store historical prices
* [ ] Compare prices
* [ ] Display cheapest options

### Phase 4 — Data & Machine Learning

* [ ] Build data pipeline
* [ ] Book similarity
* [ ] Recommendations
* [ ] NLP / embeddings
* [ ] Price analysis
* [ ] Price prediction

### Phase 5 — Deployment

* [ ] Dockerize application
* [ ] Set up CI/CD
* [ ] Deploy backend
* [ ] Deploy database
* [ ] Deploy production application

---

## 📂 Project Structure

```text
BookScout/
│
├── mobile/
│   ├── app/
│   ├── components/
│   ├── constants/
│   ├── assets/
│   ├── scripts/
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## 📌 Project Goals

BookScout is intentionally being developed incrementally.

Rather than building the entire planned architecture at once, each stage is being used to learn and apply a different area of software engineering:

```text
Mobile Development
        ↓
API Integration
        ↓
Backend Development
        ↓
Database Design
        ↓
Data Engineering
        ↓
Machine Learning
        ↓
Cloud Deployment
```

The goal is to eventually turn BookScout into a complete, production-style application while using the project to develop practical software engineering skills.


## Copyright

© 2026 Chloe Atwood. All rights reserved.

This project and its source code are the original work of Chloe Atwood.
Viewing this repository does not grant permission to copy, modify,
distribute, or use the source code or original content without permission.
