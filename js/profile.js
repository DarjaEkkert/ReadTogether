//lädt das Profil des aktuell eingeloggten Benutzers aus der Tabelle profiles und gibt es als JavaScript-Objekt zurück.
async function getProfile(userId) {

    const { data, error } =
        await supabaseClient
            .from("profiles")
            .select("*")
            .eq("id", userId)
            .single();

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}

//Avatars
function loadAvatarSelection(currentAvatar) {

    selectedAvatar = currentAvatar;

    const container =
        document.getElementById("avatarSelection");

    container.innerHTML = "";

    for (let i = 1; i <= 20; i++) {

        const img =
            document.createElement("img");

        img.src =
            `avatars/avatar${i}.png`;

        img.className = "avatar-option";

        if (`avatar${i}` === currentAvatar) {
            img.classList.add("avatar-selected");
        }

        img.onclick = () => {

            selectedAvatar = `avatar${i}`;

            document
                .querySelectorAll(".avatar-option")
                .forEach(a =>
                    a.classList.remove("avatar-selected"));

            img.classList.add("avatar-selected");
        };

        container.appendChild(img);
    }
}

//My Profil seite einzeigen

async function showProfile() {

    showView("profileSection");

    const {
        data: { user }
    } = await supabaseClient.auth.getUser();

    const profile = await getProfile(user.id);

    document.getElementById("profileUsername").value = profile?.username || "";
    document.getElementById("profileBirthday").value = profile?.birthday || "";
    loadAvatarSelection(
        profile?.avatar || "avatar1"
    );
}

// my Profil updaten
async function saveProfile() {

    const {
        data: { user }
    } = await supabaseClient.auth.getUser();

    const username = document.getElementById("profileUsername").value;
    const birthday = document.getElementById("profileBirthday").value;
    const avatar = selectedAvatar;

    const { error } =
        await supabaseClient
            .from("profiles")
            .update({
                username: username,
                birthday: birthday,
                avatar: avatar
            })
            .eq("id", user.id);

    if (error) {
        alert(error.message);
        return;
    }

    document.getElementById("profileName").textContent =
        username;
    document.getElementById("avatarImage").src =
    `avatars/${avatar}.png`;



    document.getElementById("welcomeMessage").textContent =
        `Ich freue mich, dass du da bist, ${username}! Lass uns lesen!`;


    const message =
        document.getElementById("saveMessage");
;
   
    message.textContent =
        "✓ Änderungen gespeichert!";

    setTimeout(() => {
         message.textContent = "";
        }, 10000);
}

//Name und Avatar anzeigen
function updateProfileInfo(profile, user, role) {

    const userName = profile?.username || user.email.split("@")[0];
    const avatar = profile?.avatar || "avatar1";

    const img = document.getElementById("avatarImage");

    if (img) {
        img.src = `avatars/${avatar}.png`;
    }

    document.getElementById("profileName").textContent = userName;

    const roleText =
    role === "admin"
        ? "Administrator"
        : "Mitglied";

    const roleElement = document.getElementById("userRole");

console.log("roleElement:", roleElement);

if (roleElement) {
    roleElement.textContent = roleText;
}

    document.getElementById("welcomeMessage").textContent =
        `Ich freue mich, dass du da bist, ${userName}! Lass uns lesen!`;
}
//MyProfile Menü schließen
function closeProfile() {

    showView("homeView");
}