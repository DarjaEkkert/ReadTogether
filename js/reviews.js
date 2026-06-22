function markAsRead(bookId) {

    const form =
        document.getElementById(`readForm-${bookId}`);

    form.style.display = "block";
}

//Review Speichern
async function saveReview(bookId) {

    const readDate = document.getElementById(`readDate-${bookId}`).value;
    const review = document.getElementById(`review-${bookId}`).value;
    const rating = document.getElementById(`rating-${bookId}`)
            .dataset.rating || 0;
    const {
            data: { user }
            } = await supabaseClient.auth.getUser();

const { data: existingReview } =
    await supabaseClient
        .from("book_reviews")
        .select("*")
        .eq("book_id", bookId)
        .eq("user_id", user.id)
        .maybeSingle();

if (existingReview) {

    alert("Du hast dieses Buch bereits bewertet.");

    return;
}

const { error } =
    await supabaseClient
        .from("book_reviews")
        .insert([
            {
                book_id: bookId,
                user_id: user.id,
                rating: rating,
                review: review,
                read_date: readDate
            }
        ]);

if (error) {

    console.error(error);
    alert(error.message);
    return;
}


const form = document.getElementById(`readForm-${bookId}`);
form.style.display = "none";


const message = document.getElementById("reviewsaveMessage");

message.textContent ="✓ Änderungen gespeichert!";
setTimeout(() => { message.textContent = "";}, 5000);

await loadBooks();

for (const roundId of openedRounds) {

    await toggleLibraryRound(roundId);
}
}