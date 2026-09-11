# **BookScout Database Schema**

## **Overview**

A user should be able to create an account, log in and out of the application, and maintain their own personal book collection.

A user can store as many books as they want. Each book can contain information such as:

* Title
* Author
* Publication date
* ISBN
* Rating
* Percentage read
* Personal notes
* Cover URL
* Reading status / list membership

Books are associated with the user who added them so that each user has their own personal collection.

A book must belong to at least one of the user's lists in order to be stored in their collection.

BookScout uses **Supabase Authentication** for user accounts and **PostgreSQL through Supabase** for persistent application data.

---

# **User**

User authentication is handled by **Supabase Auth**.

Supabase automatically maintains the authenticated user record in `auth.users`. The user's UUID is used to associate application data with the correct account.

### Supabase Auth User

* [x] `id` - unique UUID / primary key
* [x] `email`
* [x] `created_at`
* [x] `updated_at`

Additional authentication information is managed by Supabase rather than being stored directly in the BookScout application tables.

The application uses the authenticated user's ID to determine which books belong to them.

---

# **Users / Profiles**

If application-specific user information is needed in the future, it can be stored in a separate public user/profile table that references `auth.users`.

Potential information could include:

* `userID`
* `name`
* `createdAt`

The user's authentication credentials and login information should remain managed by Supabase Auth.

---

# **Books**

The Books table stores the book information associated with a user's personal collection.

Each book record belongs to a specific user.

### Fields

* [x] `bookID` - unique identifier / primary key
* [x] `userID` - foreign key referencing the authenticated user
* [x] `title`
* [x] `author`
* [x] `pubDate`
* [x] `ISBN`
* [x] `rating`
* [x] `percentRead`
* [x] `personalNotes`
* [x] `coverUrl`
* [x] `createdAt`
* [x] `updatedAt`

### Relationships

```text
auth.users
    │
    │ userID
    ▼
  Books
```

Each book record is associated with the user who added it.

This prevents books from one user's collection from being mixed with another user's collection.

---

# **Lists / Reading Categories**

Books can be organized into multiple lists.

Current BookScout lists include:

* **Currently Reading**
* **Wishlist**
* **Finished**
* **Bookshelf**

A book can belong to multiple lists at the same time.

For example, a book could theoretically be in both:

```text
Bookshelf
Currently Reading
```

The list relationship should therefore be treated as a **many-to-many relationship** between books and lists.

---

# **Book Lists**

The list information identifies the different collections that a user can organize their books into.

### Fields

* [x] `listID` - unique identifier
* [x] `userID` - foreign key referencing the user
* [x] `name`
* [ ] `icon` - optional list icon

Each user's lists are associated with that specific user.

```text
auth.users
    │
    │ userID
    ▼
  Lists
```

This allows different users to have their own independent collections.

---

# **Book / List Relationship**

Because a book can belong to multiple lists, and each list can contain multiple books, a relationship table is used to connect them.

### Fields

* [x] `bookID` - foreign key referencing the book
* [x] `listID` - foreign key referencing the list

```text
             ┌──────────────┐
             │    Books     │
             └──────┬───────┘
                    │
                    │
                    ▼
             ┌──────────────┐
             │ Book / List  │
             │ Relationship │
             └──────┬───────┘
                    │
                    │
                    ▼
             ┌──────────────┐
             │    Lists     │
             └──────────────┘
```

This allows:

```text
Book A → Currently Reading
Book A → Bookshelf

Book B → Wishlist

Book C → Finished
Book C → Bookshelf
```

A book cannot exist in the user's collection without being associated with at least one list.

---

# **Overall Database Relationship**

The overall structure is:

```text
                 ┌─────────────────┐
                 │   auth.users    │
                 │                 │
                 │      id         │
                 │     email       │
                 └────────┬────────┘
                          │
                ┌─────────┴─────────┐
                │                   │
                ▼                   ▼
        ┌───────────────┐    ┌───────────────┐
        │     Books     │    │     Lists     │
        │               │    │               │
        │ bookID        │    │ listID        │
        │ userID        │    │ userID        │
        │ title         │    │ name          │
        │ author        │    │ icon          │
        │ pubDate       │    └───────┬───────┘
        │ ISBN          │            │
        │ rating        │            │
        │ percentRead   │            │
        │ personalNotes │            │
        │ coverUrl      │            │
        │ createdAt     │            │
        │ updatedAt     │            │
        └───────┬───────┘            │
                │                    │
                └─────────┬──────────┘
                          │
                          ▼
                  ┌───────────────┐
                  │  Book / List  │
                  │  Relationship │
                  │               │
                  │  bookID       │
                  │  listID       │
                  └───────────────┘
```

---

# **Data Ownership**

Every user's books and lists should be isolated from other users.

The relationship is:

```text
Authenticated User
        │
        ├── Books
        │    ├── Book A
        │    ├── Book B
        │    └── Book C
        │
        └── Lists
             ├── Currently Reading
             ├── Wishlist
             ├── Finished
             └── Bookshelf
```

Supabase Row Level Security can be used to ensure that users can only access and modify their own data.

---

# **Future Database Expansion**

The current schema is designed to support additional functionality later.

Potential future tables or relationships include:

### **Book Metadata**

Additional information from external APIs could eventually be stored, such as:

* Publisher
* Edition
* Format
* Page count
* Description
* Language
* Multiple ISBNs
* External API identifiers

### **Prices**

A future price-tracking system could introduce:

```text
Books
  │
  ▼
Book Editions
  │
  ▼
Prices
  │
  ├── Retailer
  ├── Price
  ├── URL
  └── Timestamp
```

This would allow BookScout to track historical prices and compare different sources.

### **Recommendations**

The existing user/book relationships could eventually be used as the foundation for a recommendation system.

Potential data sources include:

* Books a user has finished
* User ratings
* Reading history
* Books in a user's wishlist
* Book metadata
* Book similarity

---

# **Current Schema Goals**

The current database is focused on the core functionality required for BookScout:

```text
Authentication
      ↓
User
      ↓
Books
      ↓
Lists
      ↓
Book / List Relationships
      ↓
Persistent User Collection
```

Once this foundation is established, additional data engineering, price tracking, and machine learning functionality can be built on top of it.
