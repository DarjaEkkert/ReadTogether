

function addBook() {
  const fileInput = document.getElementById("coverFile");
  const file = fileInput.files[0];

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  
  if (!title || !author) return;

  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      saveBook(title, author, e.target.result);
    };
    reader.readAsDataURL(file);
  } else {
    saveBook(title, author, "");
  }

  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("coverFile").value = "";
}
//Buch hinzufügen
async function saveBook(title, author, coverData) {
    const readingRoundId = document.getElementById("readingRoundSelect").value;
    if (editingBookId) {

        const { error } = await supabaseClient
            .from("books")
            .update({
                title: title,
                author: author,
                
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
        cover_url: coverUrl,
        user_id: user.id,
        reading_round_id: readingRoundId
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

    const { error } = await supabaseClient
    .from("books")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    alert("Fehler beim Löschen");
    return;
  }

 
  await loadBooks();
}

function editBook(id) {

    console.log("Edit ID:", id);

    const book = books.find(b => b.id === id);

    console.log("Book:", book);

    showAdmin();

    if (!book) return;

    document.getElementById("title").value = book.title;
    document.getElementById("author").value = book.author;

    editingBookId = id;

    document.querySelector(".form button").textContent =
        "Save Changes";
}