class Book {
  constructor(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  info() {
    console.log(`The ${title} by ${author}, ${pages} pages, ${read}`);
  }

  toggleRead() {
    this.read = this.read === "Yes" ? "No" : "Yes";
  }
}

class Library {
  constructor() {
    this.myLibrary = [];
    this.bookIdCounter = 0; // Counter to assign unique IDs to books
  }
  addBook(title, author, pages, read) {
    const newBook = new Book(this.bookIdCounter++, title, author, pages, read);
    this.myLibrary.push(newBook);
    this.displayBooks();
  }
  displayBooks() {
    const bookContainer = document.querySelector(".books");
    bookContainer.innerHTML = ""; // Clear previous content
    this.myLibrary.forEach((book) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.setAttribute("data-id", book.id);
      card.innerHTML = `
    <div class="stripe"></div>
    <div class="rest-of-card">
      <div class="close"><button>X</button></div>
      <div class="info">
        <div class="title">${book.title}</div>
        <div class="author">By: ${book.author}</div>
        <div class="pages">Pages: ${book.pages}</div>
        <div class="readSection">
          <div class="read">Read: ${book.read}</div>
          <div class="change"><button>toggle</button></div>
        </div>
      </div>
    </div>
  `;
      bookContainer.appendChild(card);
      // Add event listeners for the buttons
      card
        .querySelector(".close button")
        .addEventListener("click", () => this.removeBook(book.id));
      card
        .querySelector(".change button")
        .addEventListener("click", () => this.toggleRead(book.id));
    });
  }
  removeBook(id) {
    // card.classList.add("imploding");
    this.myLibrary = this.myLibrary.filter((book) => book.id !== id);
    this.displayBooks();
  }
  toggleRead(id) {
    const book = this.myLibrary.find((book) => book.id === id);
    if (book) {
      book.toggleRead();
      this.displayBooks();
    }
  }
}

// Function to remove a book by ID

// function removeBook(card, id) {
//   setTimeout(() => {
//     myLibrary = myLibrary.filter((book) => book.id !== id);
//     displayBooks();
//   }, 500); // Match the duration of the implode animation
// }

const library = new Library(); // Starts the Library

library.addBook("The Lord of the Rings", "J.R.R. Tolkien", 1216, "Yes");
library.addBook("The Hobbit", "J.R.R. Tolkien", 295, "Yes");

const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".addBook");
const closeButton = document.querySelector("#cancel");
const confirmBtn = dialog.querySelector("#confirmBtn");
const titleInput = dialog.querySelector("#title");
const authorInput = dialog.querySelector("#autor");
const pagesInput = dialog.querySelector("#pages");
const readInput = dialog.querySelector("#read");
const form = dialog.querySelector("form");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});
// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
  resetForm();
});

// Reset form and clear validation messages
function resetForm() {
  form.reset(); // Clear the form inputs
  // Clear custom validation messages
  titleInput.setCustomValidity("");
  authorInput.setCustomValidity("");
  pagesInput.setCustomValidity("");
  // Reset placeholders if needed
  titleInput.placeholder = "";
  authorInput.placeholder = "";
  pagesInput.placeholder = "";
}

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (event) => {
  event.preventDefault(); // We don't want to submit this fake form
  // Check if the form is valid
  if (!form.checkValidity()) {
    // This will automatically show validation messages
    form.reportValidity();
    //alert("Please fill in all fields");
  } else {
    const readValue = readInput.checked ? "Yes" : "No";
    library.addBook(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      readValue
    );
    dialog.close();
    form.reset(); // Clear the form inputs after submission
  }
});
