const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    console.log(`The ${title} by ${author}, ${pages} pages, ${read}`);
  };
}

function addBookToLibrary() {
  let autor = prompt("Who is the author?");
  let title = prompt("What is the title?");
  let pages = prompt("How many pages?");
  let read = prompt("Have you read it?");
  let newBook = new Book(title, autor, pages, read);
  myLibrary.push(newBook);
}
