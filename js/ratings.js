function updateStars(stars, ratingValue) {

    stars.forEach((star, index) => {

        if (index < ratingValue) {

            star.textContent = "★";

            star.classList.add("star-active");
            star.classList.remove("star-inactive");

        } else {

            star.textContent = "☆";

            star.classList.add("star-inactive");
            star.classList.remove("star-active");
        }

    });

}

function initRatings() {

    const ratings =
        document.querySelectorAll(".rating-stars");

    ratings.forEach(rating => {

        const stars =
            rating.querySelectorAll("span");

        stars.forEach((star, index) => {

            star.addEventListener("mouseenter", () => {

                updateStars(stars, index + 1);

            });

            star.addEventListener("click", () => {

                rating.dataset.rating = index + 1;

                updateStars(stars, index + 1);

            });

        });

        rating.addEventListener("mouseleave", () => {

            const savedRating =
                parseInt(rating.dataset.rating || 0);

            updateStars(stars, savedRating);

        });

    });

}