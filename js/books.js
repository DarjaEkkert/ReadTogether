let books = [];

//Buch anzeigen
async function loadBooks() {

  const { data, error } = await supabaseClient
    .from("books")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  books = data;
  renderBooks();
}

function save() {
  localStorage.setItem("books", JSON.stringify(books));
}

function addBook() {
  const fileInput = document.getElementById("coverFile");
  const file = fileInput.files[0];

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const review = document.getElementById("review").value;
  const rating = document.getElementById("rating").value;

  if (!title || !author) return;

  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      saveBook(title, author, review, rating, e.target.result);
    };
    reader.readAsDataURL(file);
  } else {
    saveBook(title, author, review, rating, "");
  }

  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("review").value = "";
  document.getElementById("coverFile").value = "";
}
//Buch hinzufügen
async function saveBook(title, author, review, rating, coverData) {

  const { data, error } = await supabaseClient
    .from("books")
    .insert([
      {
        title: title,
        author: author,
        review: review,
        rating: parseInt(rating)
      }
    ]);

  if (error) {
    console.error(error);
    alert("Fehler beim Speichern");
    return;
  }

  await loadBooks();
  alert("Buch erfolgreich gespeichert");
}

function deleteBook(id) {
  books = books.filter(b => b.id !== id);
  save();
  renderBooks();
}

function renderBooks() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  books.forEach(b => {
    const div = document.createElement("div");
    div.className = "book";

    div.innerHTML = `
      ""

      <div class="book-content">
        <div class="book-title">${b.title}</div>
        <div class="book-author">by ${b.author}</div>

        <div class="rating">⭐ ${b.rating}</div>

        <div class="review">${b.review || ""}</div>

        <div class="actions">
          <button onclick="deleteBook(${b.id})">🗑️</button>
        </div>
      </div>
    `;

    list.appendChild(div);
  });
}