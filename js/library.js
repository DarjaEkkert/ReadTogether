let openedRounds = [];
// Bibliothek anzeigen
async function loadLibrary() {

    const { data, error } =
        await supabaseClient
                .from("reading_rounds")
                .select("*")
                .eq("is_active", false)
                .order("year", { ascending: false })
                .order("round_number", { ascending: false });

    if (error) {

        console.error(error);
        return;
    }

    const library =
        document.getElementById("libraryList");

    library.innerHTML = "";

    data.forEach(round => {

        library.innerHTML += `
            <div class="library-round">

                <strong>
                    ${round.year} Runde ${round.round_number}
                </strong>

                <br>

                ${round.theme}

                <br><br>

                <button
                    id="roundButton-${round.id}"
                    onclick="toggleLibraryRound('${round.id}')">

                    Bücher anzeigen

                </button>

                <div
                    id="roundBooks-${round.id}"
                    class="library-books"
                    style="display:none;">
                </div>

            </div>
        `;
    });
}

async function toggleLibraryRound(roundId) {

    const area = document.getElementById(`roundBooks-${roundId}`);
    const button = document.getElementById(`roundButton-${roundId}`);

    if (area.style.display === "none") {

        const { data, error } =
            await supabaseClient
                .from("books")
                .select("*")
                .eq("reading_round_id", roundId);

        if (error) {

            console.error(error);
            return;
        }

        area.innerHTML = "";

        const role = document.getElementById("userRole").textContent;

        data.forEach(book => {

            const div =
                createBookCard(book, role);

            area.appendChild(div);
        });

        initRatings();

        if (!openedRounds.includes(roundId)) {
            openedRounds.push(roundId);
        }

        area.style.display = "flex";
        button.textContent = "Bücher ausblenden";

    } else {

        openedRounds =
            openedRounds.filter(
                id => id !== roundId
            );

        area.style.display = "none";
        button.textContent = "Bücher anzeigen";
    }
}