let myLibrary = [];
let bookIdCounter = 0; // Counter to assign unique IDs to books

function Book(id, title, author, pages, read) {
  this.id = id;
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
function createBookToLibrary(title, author, pages, read) {
  let newBook = new Book(bookIdCounter++, title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

createBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", 1216, "Yes");
createBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "Yes");

const card = document.createElement("div");
function displayBooks() {
  const bookContainer = document.getElementsByClassName("books")[0];
  bookContainer.innerHTML = "";

  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.setAttribute("data-id", book.id);
    card.innerHTML = `
    <div class="stripe"></div>
    <div class="rest-of-card">
      <div class="close"><button >X</button></div>
      <div class="info">
        <div class="title">${book.title}</div>
        <div class="author">By: ${book.author}</div>
        <div class="pages">Pages: ${book.pages}</div>
        <div class="readSection">
          <div class="read">Read: ${book.read}</div>
          <div class="change"><button >toggle</button></div>
        </div>
      </div>
    </div>
  `;
    bookContainer.appendChild(card);
    // Add event listeners for the buttons
    card
      .querySelector(".close button")
      .addEventListener("click", () => removeBook(book.id));
    card
      .querySelector(".change button")
      .addEventListener("click", () => toggleRead(book.id));
  });
}
// Function to remove a book by ID
function removeBook(id) {
  myLibrary = myLibrary.filter((book) => book.id !== id);
  displayBooks();
}
// Function to toggle the read status of a book
function toggleRead(id) {
  const book = myLibrary.find((book) => book.id === id);
  if (book) {
    book.read = book.read === "Yes" ? "No" : "Yes";
    displayBooks();
  }
}
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
// "Cancel" button closes the dialog without submitting because of [formmethod="dialog"], triggering a close event.
// dialog.addEventListener("close", (e) => {
//   outputBox.value =
//     dialog.returnValue === "default"
//       ? "No return value."
//       : `ReturnValue: ${dialog.returnValue}.`; // Have to check for "default" rather than empty string
// });
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
    createBookToLibrary(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      readValue
    );
    dialog.close();
    form.reset(); // Clear the form inputs after submission
  }
});
