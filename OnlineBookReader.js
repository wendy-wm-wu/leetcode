var BookReader = function() {
  this.currentBook = null; 
  this.books = {};
}

BookReader.prototype.add = function(book) {
  this.books[book.title] = book;
}

BookReader.prototype.find = function(title) {
  return this.books[title]; 
}

BookReader.prototype.open = function(title) {
  this.currentBook = this.books[title];
  return this.currentBook.file; 
}

var Book = function(title, file) {
  this.title = title; 
  this.file = file; 
}