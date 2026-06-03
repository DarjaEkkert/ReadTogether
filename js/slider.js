let sliderBooks = [];
let currentSlide = 0;

async function loadSliderBooks() {

    const { data, error } = await supabaseClient
        .from("books")
        .select("cover_url");

    if (error) {
        console.error(error);
        return;
    }

    sliderBooks = data.filter(
        book => book.cover_url
    );

    console.log(sliderBooks);
    console.log("Anzahl Cover:", sliderBooks.length);

    if (sliderBooks.length === 0) {
        return;
    }

    document.getElementById("sliderImage").src =
        sliderBooks[0].cover_url;

    
    startSlider();
}

function startSlider() {

    setInterval(() => {

        currentSlide++;

        if (currentSlide >= sliderBooks.length) {
            currentSlide = 0;
        }

        document.getElementById("sliderImage").src =
            sliderBooks[currentSlide].cover_url;

    }, 20000);

}

loadSliderBooks();