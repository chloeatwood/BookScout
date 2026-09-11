# 📚 BookScout

BookScout is a mobile book discovery and tracking application that I am
building as a personal software engineering project.

The long-term goal is to create an application that helps users discover
books, track their personal library, and eventually compare book prices
across different sources.

The project is also being used as a way to learn and apply **full-stack
development, APIs, databases, data engineering, and machine learning**
as the application grows.

------------------------------------------------------------------------

## 🚧 Current Status

**Active development**

BookScout currently consists of a **React Native / Expo mobile
application**. The frontend and core navigation are being developed
first, with backend and data features being added incrementally.

### Current Progress

-   [x] Expo / React Native project setup
-   [x] TypeScript
-   [x] Application navigation
-   [x] Initial application UI
-   [x] Book search screen UI
-   [x] Connect book search to an external API
-   [x] Display real book search results
-   [x] Book details screen
-   [x] ISBN / barcode scanning
-   [x] Personal bookshelf UI
-   [ ] Backend API
-   [ ] Database
-   [ ] User accounts / authentication
-   [ ] Book persistence
-   [ ] Book price data collection
-   [ ] Price comparison
-   [ ] Data analysis
-   [ ] Book recommendation system
-   [ ] Cloud deployment

------------------------------------------------------------------------

## 📱 Current Application

The mobile application is built with:

-   **React Native**
-   **Expo**
-   **TypeScript**
-   **Expo Router**
-   **React Navigation**

The current focus is **Phase 2: User Features / Backend**, including
designing the database structure, setting up Supabase, connecting the
backend/database to the mobile application, and implementing user
authentication and persistent book data.

------------------------------------------------------------------------

## 🗺️ Planned Architecture

As BookScout grows, the application is planned to evolve toward a
full-stack architecture:

``` text
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

\* The database technology has not been finalized. PostgreSQL is
currently one option being considered, with **Supabase** being evaluated
as the backend/database platform.

The architecture will evolve as the project develops.

------------------------------------------------------------------------

## 🔎 Book Search

The first major functional feature is book search.

The current flow is:

``` text
User enters a title or author
            ↓
      Search request
            ↓
      Open Library API
            ↓
       Parse results
            ↓
    Display book results
            ↓
      Select a book
            ↓
      Book details
```

The initial external data source is the **Open Library API**.

BookScout also supports **ISBN / barcode scanning**, allowing users to
find a book using its ISBN rather than manually entering a title or
author.

------------------------------------------------------------------------

## 📚 Personal Bookshelf

The mobile application now includes the initial UI for organizing books
into different lists.

Current list categories include:

-   **Currently Reading**
-   **Wishlist**
-   **Finished**
-   **Bookshelf**
-   **Recommendations**

Books can be selected from search results or the bookshelf to view a
dedicated book details page.

The bookshelf UI is designed around a **library / bookshelf theme**,
with books visually displayed as collections on shelves.

The current implementation uses local sample data while the persistent
database and user-specific book collections are being developed.

------------------------------------------------------------------------

## 🧠 Data & Machine Learning Goals

Machine learning and data engineering are **future stages of the
project**, rather than current features.

Potential future components include:

### Data Engineering

-   Book and edition data collection
-   Data cleaning and normalization
-   ETL pipelines
-   Historical price tracking
-   Price comparison
-   Book / edition entity matching

### Machine Learning

-   Content-based book recommendations
-   Book similarity
-   NLP and text embeddings
-   Vector-based representations
-   Price prediction

These features will be added after the core application and data
infrastructure are established.

------------------------------------------------------------------------

## 🛠️ Technology Roadmap

### Current

-   React Native
-   Expo
-   TypeScript
-   Expo Router
-   React Navigation
-   Open Library API

### Planned

**Backend**

-   Python
-   FastAPI

**Database / Backend Platform**

-   Supabase
-   PostgreSQL
-   Relational database design

**Data**

-   Python
-   pandas
-   NumPy

**Machine Learning**

-   scikit-learn
-   NLP
-   Embeddings

**External Services**

-   Open Library API
-   Additional APIs as needed

**Deployment**

-   Docker
-   CI/CD
-   Cloud hosting

------------------------------------------------------------------------

## 🚀 Development Roadmap

### Phase 1 --- Mobile Application

-   [x] Project setup
-   [x] Navigation
-   [x] Initial UI
-   [x] Search screen
-   [x] Connect search to Open Library
-   [x] Display search results
-   [x] Book details
-   [x] ISBN / barcode scanning

### Phase 2 --- User Features / Backend

-   [x] Personal bookshelf UI
-   [X] Design database schema
-   [X] Set up backend and connect to frontend
    -   [X] Supabase
    -   [X] Database
-   [X] Add login / logout pages
-   [X] Add / remove books
-   [X] Track reading status
-   [X] User accounts
-   [X] User authentication
-   [X] Persist book and user data

### Phase 3 --- Price Tracking

-   [ ] Collect price data
-   [ ] Normalize book editions
-   [ ] Store historical prices
-   [ ] Compare prices
-   [ ] Display cheapest options

### Phase 4 --- Data & Machine Learning

-   [ ] Build data pipeline
-   [ ] Book similarity
-   [ ] Recommendations
-   [ ] NLP / embeddings
-   [ ] Price analysis
-   [ ] Price prediction

### Phase 5 --- Deployment

-   [ ] Dockerize application
-   [ ] Set up CI/CD
-   [ ] Deploy backend
-   [ ] Deploy database
-   [ ] Deploy production application

------------------------------------------------------------------------

## 📌 Project Goals

BookScout is intentionally being developed incrementally.

Rather than building the entire planned architecture at once, each stage
is being used to learn and apply a different area of software
engineering:

``` text
Mobile Development
        ↓
API Integration
        ↓
User Features
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

The goal is to eventually turn BookScout into a complete,
production-style application while using the project to develop
practical software engineering skills.

------------------------------------------------------------------------

## 📄 Copyright

© 2026 Chloe Atwood. All rights reserved.

This project and its source code are the original work of Chloe Atwood.

Viewing this repository does not grant permission to copy, modify,
distribute, or use the source code or original content without
permission.
