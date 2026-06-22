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