# Overview
A user should be able to log in and out of the application. A user will be able to store as many books as they want. For each book they should be able to store the title, author, pubDate, ISBN, rating, percentage read, personal notes, coverUrl, and the lists it belongs to. They cannot store a book if it does not belong to a list

## User
A user should be able to store as many books as they want in several different lists.
* [ ] userID - unique
* [ ] name
* [ ] email
* [ ] phone
* [ ] createdAT

## Users_Book 
* [ ] bookID - unique
* [ ] userID - foreign key - connects to user
* [ ] title
* [ ] author
* [ ] pubDate
* [ ] ISBN
* [ ] rating - stars to fill in
* [ ] percentRead
* [ ] personalNotes
* [ ] coverUrl
* [ ] createdAt
* [ ] updatedAt
* [ ] lists - An array of lists the book belongs too
  * [ ] Maybe to fill in icons - user can select the icon of the list they want