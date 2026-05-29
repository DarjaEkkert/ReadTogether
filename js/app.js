renderBooks();
async function testDatabase() {
  const { data, error } = await supabaseClient
    .from("books")
    .insert([
      {
        title: "Test Book",
        author: "Daria",
        review: "Supabase Test",
        rating: 5
      }
    ]);

  if (error) {
    console.error(error);
  } else {
    console.log("Buch gespeichert");
  }
}

testDatabase();