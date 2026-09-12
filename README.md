# 📚 BookScout

BookScout is a mobile book discovery and tracking application that I am building as a personal software engineering project.

The long-term goal is to create an application that helps users discover books, manage their personal library, and eventually compare book prices across different sources.

The project is also being used to learn and apply **mobile development, APIs, databases, backend development, data engineering, and machine learning** as the application grows.

---

## 🚧 Current Status

**Active development**

BookScout currently consists of a **React Native / Expo mobile application** connected to a **Supabase backend and PostgreSQL database**.

The application now supports user accounts, authentication, persistent book collections, reading lists, and book search. The next stages of development will focus on expanding the application's data capabilities, price tracking, and eventually machine learning features.

### Current Progress

* [x] Expo / React Native project setup
* [x] TypeScript
* [x] Application navigation
* [x] Initial application UI
* [x] Book search screen UI
* [x] Open Library API integration
* [x] Display real book search results
* [x] Book details screen
* [x] ISBN / barcode scanning
* [x] Personal bookshelf UI
* [x] Database schema
* [x] Supabase backend setup
* [x] PostgreSQL database
* [x] User accounts
* [x] User authentication
* [x] Login / logout
* [x] Account deletion
* [x] Persistent user data
* [x] Add books to personal collection
* [x] Remove books from personal collection
* [x] Update books and reading status
* [x] Reading lists backed by user data
* [x] Search within personal book collection
* [x] Help / feedback page
* [ ] About BookScout page
* [ ] Book price data collection
* [ ] Price comparison
* [ ] Historical price tracking
* [ ] Data analysis
* [ ] Book recommendation system
* [ ] Machine learning features
* [ ] Cloud deployment / production release

---

## 📱 Current Application

The mobile application is built with:

* **React Native**
* **Expo**
* **TypeScript**
* **Expo Router**
* **React Navigation**

BookScout currently uses **Supabase** for its backend services, including:

* **PostgreSQL database**
* **User authentication**
* **Persistent user data**
* **Database access from the mobile application**

The application also integrates with the **Open Library API** for book discovery and metadata.

The current focus is **Phase 2: User Features / Backend**, which has progressed from initial UI development into a functional database-backed application.

---

## 🏗️ Current Architecture

The current application uses Supabase directly from the React Native application:

```text
┌─────────────────────────────┐
│       React Native App      │
│       Expo + TypeScript     │
└──────────────┬──────────────┘
               │
               │ Supabase Client
               ▼
┌─────────────────────────────┐
│           Supabase          │
│                             │
│  Authentication             │
│  PostgreSQL Database        │
│  User Data                  │
└──────────────┬──────────────┘
               │
               │
               ▼
┌─────────────────────────────┐
│       External APIs         │
│                             │
│      Open Library API       │
└─────────────────────────────┘
```

Supabase currently provides the backend infrastructure for the application, allowing the mobile client to authenticate users and read/write their persistent book data.

A separate custom backend API may be introduced in the future if BookScout requires additional server-side processing, data pipelines, or application-specific backend logic.

The architecture will continue to evolve as the project expands.

---

## 🔎 Book Search

BookScout supports searching for books using the **Open Library API**.

The current search flow is:

```text
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

The application also supports **ISBN / barcode scanning**, allowing users to find books using an ISBN rather than manually entering a title or author.

### Personal Collection Search

Users can also search through books that they have already added to their personal collection.

The personal collection search currently filters books by:

* Book title
* Author

This allows users to quickly find books within their own library without searching the external Open Library catalog.

---

## 📚 Personal Bookshelf

BookScout includes a database-backed personal bookshelf for organizing books into different reading lists.

Current list categories include:

* **Currently Reading**
* **Wishlist**
* **Finished**
* **Bookshelf**

Users can:

* Add books to their collection
* Remove books
* Update book information
* Change a book's reading status
* View books organized by list
* Search through their personal collection

The bookshelf UI is designed around a **library / bookshelf theme**, with books visually displayed as collections on shelves.

Unlike the earlier prototype, the bookshelf no longer relies on local dummy data. Lists are populated from the authenticated user's persistent database records.

---

## 👤 User Accounts & Authentication

BookScout now includes user account functionality through Supabase.

Implemented functionality includes:

* Account creation
* Login
* Logout
* Authentication state
* Persistent user data
* Account deletion

Book collections are associated with individual users, allowing each account to maintain its own library and reading lists.

---

## 🗄️ Database

The application now uses a **PostgreSQL database through Supabase** to persist user and book information.

The database-backed implementation replaced the original local sample data used during early UI development.

Current database functionality includes storing:

* User information
* Books
* User book collections
* Reading status / list assignments

The database structure is designed to allow additional book metadata and features to be added as the application grows.

---

## 🧠 Data & Machine Learning Goals

Machine learning and data engineering are **future stages of the project**, rather than current features.

The goal is to eventually use the growing book dataset to experiment with data processing, recommendation systems, and machine learning.

### Data Engineering

Potential future components include:

* Book and edition data collection
* Data cleaning and normalization
* ETL pipelines
* Historical price tracking
* Price comparison
* Book / edition entity matching
* Data analysis

### Machine Learning

Potential future components include:

* Content-based book recommendations
* Book similarity
* NLP and text embeddings
* Vector-based representations
* Personalized recommendations
* Price analysis
* Price prediction

These features will be added after the core application and data infrastructure are established.

---

## 💰 Planned Price Tracking

One of the long-term goals of BookScout is to help users find books at the lowest available price.

The planned system will eventually collect pricing information from multiple sources and allow users to compare prices for the same book or edition.

Potential functionality includes:

```text
Book / ISBN
     ↓
Identify edition
     ↓
Collect prices
     ↓
Normalize data
     ↓
Store historical prices
     ↓
Compare sources
     ↓
Display cheapest option
```

Challenges that will need to be addressed include identifying specific editions, normalizing book information across sources, collecting price data, and maintaining historical pricing information.

---

## 🛠️ Technology Roadmap

### Current

**Mobile**

* React Native
* Expo
* TypeScript
* Expo Router
* React Navigation

**Backend / Database**

* Supabase
* PostgreSQL
* Supabase Authentication

**External APIs**

* Open Library API

### Planned

**Backend / Data Processing**

* Python
* FastAPI, if a dedicated backend API becomes necessary
* pandas
* NumPy

**Machine Learning**

* scikit-learn
* NLP
* Text embeddings
* Vector representations

**External Services**

* Open Library API
* Additional book / pricing APIs as needed

**Deployment**

* Docker
* CI/CD
* Cloud hosting
* Production mobile deployment

---

## 🚀 Development Roadmap

### Phase 1 — Mobile Application

* [x] Project setup
* [x] Navigation
* [x] Initial UI
* [x] Search screen
* [x] Connect search to Open Library
* [x] Display search results
* [x] Book details
* [x] ISBN / barcode scanning
* [x] Personal bookshelf UI

### Phase 2 — User Features / Backend

* [x] Design database schema
* [x] Set up Supabase
* [x] Connect Supabase to the mobile application
* [x] PostgreSQL database
* [x] User accounts
* [x] User authentication
* [x] Login
* [x] Logout
* [x] Account deletion
* [x] Add books
* [x] Remove books
* [x] Update books
* [x] Track reading status
* [x] Persist book and user data
* [x] Populate reading lists from database data
* [x] Search personal book collection
* [x] Help / feedback page

## Phase 2.5 - Some App Cleanup
* [X] Fix back button navigation
* [X] About BookScout page
* [X] Test for bugs and fix them

### Phase 3 — Price Tracking

* [ ] Identify supported pricing sources
* [ ] Collect price data
* [ ] Normalize book editions
* [ ] Store historical prices
* [ ] Compare prices
* [ ] Display cheapest options

### Phase 4 — Data Engineering & Machine Learning

* [ ] Build data pipeline
* [ ] Clean and normalize book data
* [ ] Book / edition entity matching
* [ ] Book similarity
* [ ] Recommendation system
* [ ] NLP / embeddings
* [ ] Price analysis
* [ ] Price prediction

### Phase 5 — Finalize App frontend

* [ ] Finish Settings Page
* [ ] Do I want the nav bar to dissapear when viewing details about a book?
* [ ] Incorportate more nature elements into app. Its called BookScout - make camping/woods related?
* [ ] Look into implementing more reading tracking functionalites
 * [ ] Notifications/reminders?
 * [ ] Read in the last week?
 * [ ] Reading goals?
 * [ ] etc. 

### Phase 6 — Deployment

* [ ] Dockerize backend services if needed
* [ ] Set up CI/CD
* [ ] Deploy backend services
* [ ] Production database configuration
* [ ] Production mobile application
* [ ] Production monitoring

---

## 📈 Development Progress

BookScout is being developed incrementally, with each stage introducing another area of software engineering.

```text
Mobile Development
        ↓
API Integration
        ↓
User Features
        ↓
Authentication
        ↓
Database Design
        ↓
Persistent Data
        ↓
Data Engineering
        ↓
Machine Learning
        ↓
Cloud Deployment
```

The project has progressed from a basic mobile UI and external API integration into a functional application with user accounts, authentication, a PostgreSQL database, and persistent personal book collections.

The next major stages will focus on expanding the application's data infrastructure and eventually using that data for price comparison and machine learning.

---

## 📌 Project Goals

BookScout is intentionally being developed incrementally.

Rather than building the entire planned architecture at once, each stage is being used to learn and apply a different area of software engineering.

The long-term goal is to turn BookScout into a complete, production-style application while using the project to develop practical experience with:

* Mobile application development
* API integration
* Authentication
* Backend development
* Relational database design
* Data persistence
* Data engineering
* Machine learning
* Cloud deployment

---

## 📄 Copyright

© 2026 Chloe Atwood. All rights reserved.

This project and its source code are the original work of Chloe Atwood.

Viewing this repository does not grant permission to copy, modify, distribute, or use the source code or original content without permission.
