let books = [];
let editingBookId = null;

//Buch anzeigen
async function loadBooks() {

  const {
    data: { user }
  } = await supabaseClient.auth.getUser();

  if (!user) {
    books = [];
    renderBooks();
    return;
  }

  const { data, error } = await supabaseClient
    .from("books")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  books = data;
  renderBooks();
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
    if (editingBookId) {

        const { error } = await supabaseClient
            .from("books")
            .update({
                title: title,
                author: author,
                review: review,
                rating: parseInt(rating)
            })
            .eq("id", editingBookId);

        if (error) {
            console.error(error);
            alert("Fehler beim Aktualisieren");
            return;
        }

        editingBookId = null;

        document.querySelector(".form button").textContent =
            "Add Book";

        await loadBooks();

        

        return;
    }

    let coverUrl = "";

    if (coverData) {

    const fileName = `cover-${Date.now()}.png`;

    const base64Response = await fetch(coverData);
    const blob = await base64Response.blob();

    const { error: uploadError } = await supabaseClient
        .storage
        .from("covers")
        .upload(fileName, blob);

    if (uploadError) {
        console.error(uploadError);
        
        return;
    }

    const { data } = supabaseClient
        .storage
        .from("covers")
        .getPublicUrl(fileName);

    coverUrl = data.publicUrl;
    }
    const {
  data: { user }
} = await supabaseClient.auth.getUser();
  const { data, error } = await supabaseClient
    .from("books")
    .insert([
      {
        title: title,
        author: author,
        review: review,
        rating: parseInt(rating),
        cover_url: coverUrl,
        user_id: user.id
      }
    ]);

  if (error) {
    console.error(error);
    alert("Fehler beim Speichern");
    return;
  }

  await loadBooks();
  
}

async function deleteBook(id) {

  console.log("Lösche Buch:", id);
  console.log("Typ:", typeof id);

  const { error } = await supabaseClient
    .from("books")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    alert("Fehler beim Löschen");
    return;
  }

  console.log("Gelöscht");

  await loadBooks();
}

function editBook(id) {

  const book = books.find(b => b.id === id);

  if (!book) return;

  document.getElementById("title").value = book.title;
  document.getElementById("author").value = book.author;
  document.getElementById("review").value = book.review;
  document.getElementById("rating").value = book.rating;

  editingBookId = id;

  document.querySelector(".form button").textContent =
    "Save Changes";
}

function renderBooks() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  books.forEach(b => {
    const div = document.createElement("div");
    div.className = "book";
    console.log(b.id);
    div.innerHTML = `
        ${b.cover_url ? `<img src="${b.cover_url}" />` : ""}
      <div class="book-content">
        <div class="book-title">${b.title}</div>
        <div class="book-author">by ${b.author}</div>

        <div class="rating">⭐ ${b.rating}</div>

        <div class="review">${b.review || ""}</div>

        <div class="actions">
            <button onclick="editBook('${b.id}')">✏️</button>
            <button onclick="deleteBook('${b.id}')">🗑️</button>
        </div>
      </div>
    `;

    list.appendChild(div);
  });
}