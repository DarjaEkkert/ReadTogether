let books = [];
let reviews = [];
let library =[];
let allReviews = [];
let profiles = [];
let editingBookId = null;
let activeReadingRound = null;

//Buch anzeigen
async function loadBooks() {

    const {
        data: { user }
    } = await supabaseClient.auth.getUser();

    const {
        data: activeRound,
        error: roundError
    } = await supabaseClient
        .from("reading_rounds")
        .select("*")
        .eq("is_active", true)
        .single();

    if (roundError) {

        console.error(roundError);

        return;
    }

activeReadingRound = activeRound;
//Information über Aktive Leserunde
document.getElementById("currentReadingRoundInfo").innerHTML = `
    <div class="form">

        <strong>
            ${activeRound.year} Runde ${activeRound.round_number}
        </strong>

        <br>

        Thema:
        ${activeRound.theme}

        <br>

        Lesen bis:
        ${activeRound.end_date}

    </div>
`;

    if (!user) {

        books = [];
        reviews = [];

        renderBooks();

        return;
    }

    const { data: booksData, error: booksError } =
        await supabaseClient
            .from("books")
            .select("*")
            .eq("reading_round_id", activeRound.id) //bücher nur aktuelle runde laden
            .order("created_at", { ascending: false });

    if (booksError) {

        console.error(booksError);

        return;
    }

    const { data: reviewsData, error: reviewsError } =
        await supabaseClient
            .from("book_reviews")
            .select("*")
            .eq("user_id", user.id);

    const { data: allReviewsData, error: allReviewsError } =
        await supabaseClient
            .from("book_reviews")
            .select("*");

    const { data: profilesData, error: profilesError } =
        await supabaseClient
            .from("profiles")
            .select("id, username");

    if (profilesError) {

        console.error(profilesError);

        return;
}

if (allReviewsError) {

    console.error(allReviewsError);

    return;
}

    if (reviewsError) {

        console.error(reviewsError);

        return;
    }

    books = booksData;
    reviews = reviewsData;
    allReviews = allReviewsData;
    profiles = profilesData;
  
    document.getElementById("booksRead").textContent = `Gelesene Bücher 2026: ${reviews.length}`;

    renderBooks();
    await loadLibrary();
}


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

function createBookCard(b, role) {

    const alreadyRead = reviews.some(r => r.book_id === b.id);
    const div = document.createElement("div");
    div.className = "book";
    const bookReviews = allReviews.filter(r => r.book_id === b.id);
    const reviewCount = bookReviews.length;
    const readerCount = bookReviews.length;
    const reviewsHtml = bookReviews.map(review => {
    const profile = profiles.find(p => p.id === review.user_id); 
    const username = profile?.username || "Unbekannt";
    const fullReview = review.review || "";

    const shortReview =
        fullReview.length > 100
            ? fullReview.substring(0, 100) + "..."
            : fullReview;

    const stars = "★".repeat(review.rating);

    return `
        <div class="single-review">
            <strong>${username}</strong> ${stars}
            <br>
            ${shortReview}
            </div>
        `;
    }).join("");

    const averageRating =
        reviewCount > 0
            ? (bookReviews.reduce(
                (sum, r) => sum + Number(r.rating), 0
            ) / reviewCount).toFixed(1)
            : "-";

    if (alreadyRead) {
        div.classList.add("book-read");
    }
       let actions = "";
      if (role === "Administrator") {

    actions = `
        <button id="readButton-${b.id}" onclick="markAsRead('${b.id}')"> Gelesen </button>
        <button onclick="editBook('${b.id}')">Ändern</button>
        <button onclick="deleteBook('${b.id}')">Löschen</button>
    `;

} else {

    if (alreadyRead) {

        actions = "";

    } else {

        actions = `
            <button
                id="readButton-${b.id}"
                onclick="markAsRead('${b.id}')">

                Gelesen

            </button>
        `;
    }
}
    div.innerHTML = `
        ${b.cover_url ? `<img src="${b.cover_url}" />` : ""}
      <div class="book-content">
        <div class="book-title">${b.title}</div>
        <div class="book-author">by ${b.author}</div>
        <div class="book-rating">
            ⭐ ${averageRating}
            (${reviewCount} Bewertungen)
        </div>
        <div class="book-readers">
            👥 ${readerCount} Leser
        </div>

    <button
        id="reviewButton-${b.id}"
        onclick="toggleReviews('${b.id}')">

        💬 Reviews anzeigen

    </button>

    <div
    id="reviews-${b.id}"
    style="display:none; margin-top:10px;">

    ${reviewsHtml}

    </div>

    <div class="actions">
        ${actions}
    </div>

    <div id="readForm-${b.id}"
     class="read-form"
     style="display:none;">

    <input
        type="date"
        id="readDate-${b.id}">

    <div class="rating-stars"
      id="rating-${b.id}">

        <span class="star-inactive">☆</span>
        <span class="star-inactive">☆</span>
        <span class="star-inactive">☆</span>
        <span class="star-inactive">☆</span>
        <span class="star-inactive">☆</span>

    </div>

    <textarea
        id="review-${b.id}"
        placeholder="Deine Meinung zum Buch">
    </textarea>

    <button onclick="saveReview('${b.id}')">
        Speichern
    </button>

  </div>
      </div>
    `;
return div;
}


function renderBooks() {
  const list = document.getElementById("list");
  const role = document.getElementById("userRole").textContent;
    list.innerHTML = "";

  books.forEach(b => {
        const div =
            createBookCard(b, role);

        list.appendChild(div);
    });

    initRatings();
}

function markAsRead(bookId) {

    }

//Alle Reviews anzeigen
function toggleReviews(bookId) {

    const area =
        document.getElementById(`reviews-${bookId}`);

    const button =
        document.getElementById(`reviewButton-${bookId}`);

    if (area.style.display === "none") {

        area.style.display = "block";
        button.textContent = "💬 Reviews ausblenden";

    } else {

        area.style.display = "none";
        button.textContent = "💬 Reviews anzeigen";
    }
}

//Leserunde  anlegen 
async function saveReadingRound() {

    const year = document.getElementById("roundYear").value;
    const roundNumber = document.getElementById("roundNumber").value;
    const theme = document.getElementById("roundTheme").value;
    const endDate = document.getElementById("roundEndDate").value;
    const isActive = document.getElementById("roundActive").checked;

    if (isActive) {

        await supabaseClient
            .from("reading_rounds")
            .update({
                is_active: false
            })
            .eq("is_active", true);
    }

    const { error } =
        await supabaseClient
            .from("reading_rounds")
            .insert([
    {
        year: year,
        round_number: roundNumber,
        theme: theme,
        end_date: endDate,
        is_active: isActive
    }
    ]);

    if (error) {

        console.error(error);
        alert(error.message);

        return;
    }
    document.getElementById("roundYear").value = new Date().getFullYear();
    document.getElementById("roundNumber").value = "";
    document.getElementById("roundTheme").value = "";
    document.getElementById("roundEndDate").value = "";
    document.getElementById("roundActive").checked = false;

    const message = document.getElementById("roundSaveMessage");

    message.textContent =
        "✓ Änderungen gespeichert!";

    setTimeout(() => {
        message.textContent = "";
    }, 5000);
}

//leserunden werden aus supabase geladen
async function loadReadingRounds() {

    const { data, error } =
        await supabaseClient
            .from("reading_rounds")
            .select("*")
            .order("year", { ascending: false });

    if (error) {
        console.error(error);
        return;
    }

    const select =
        document.getElementById("readingRoundSelect");

    select.innerHTML = "";

    data.forEach(round => {

        const option =
            document.createElement("option");

        option.value = round.id;

        option.textContent =
            `${round.year} Runde ${round.round_number} - ${round.theme}`;

        select.appendChild(option);
    });
}
