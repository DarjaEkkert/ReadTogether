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

//Registrierung
async function registerUser() {

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    const { data, error } =
        await supabaseClient.auth.signUp({
            email,
            password
        });

    if (error) {
        alert(error.message);
        return;
    }

    const user = data.user;

    if (user) {

        const { error: profileError } =
            await supabaseClient
                .from("profiles")
                .insert([
                    {
                        id: user.id,
                        username: email.split("@")[0],
                        favorite_book: ""
                    }
                ]);

        if (profileError) {
            console.error(profileError);
        }
    }

    alert("Registrierung erfolgreich!");
}
//Login
async function loginUser() {

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    const { data, error } =
        await supabaseClient.auth.signInWithPassword({
            email,
            password
        });

    if (error) {
        alert(error.message);
        return;
    }

    document.getElementById("currentUser").textContent = "";

    const profile = await getProfile(data.user.id);
    const role = profile?.role || "user";
    if (role === "admin") {

        document.getElementById("adminPanel").style.display = "block";

        document.getElementById("adminBookForm").style.display = "block";
    }else {

    document.getElementById("adminBookForm").style.display = "none";
    }
    const userName = profile?.username || data.user.email.split("@")[0];
    const avatar = profile?.avatar || "avatar1";
    const img = document.getElementById("avatarImage");
    console.log(img);

    if (img) {
    img.src = `avatars/${avatar}.png`;
    }
    document.getElementById("profileName").textContent = userName;

    document.getElementById("welcomeMessage").textContent =
                            `Ich freue mich, dass du da bist, ${userName}! Lass uns lesen!`;

    document.getElementById("email").value = "";
    document.getElementById("password").value = "";

    document.getElementById("email").style.display = "none";
    document.getElementById("password").style.display = "none";

    document.getElementById("registerBtn").style.display = "none";
    document.getElementById("loginBtn").style.display = "none";

    document.getElementById("profileBtn").style.display = "inline-block";
    document.getElementById("logoutBtn").style.display = "inline-block";
    document.getElementById("sidebar").style.display = "flex";
    document.getElementById("logoutBtn").style.display = "block";
    document.getElementById("bookSection").style.display = "block";
    document.getElementById("coverSlider").style.display = "none";
    console.log("Vor loadBooks");
    await loadBooks();
    console.log("Nach loadBooks");
    
}

//Logout
async function logoutUser() {

    const { error } =
        await supabaseClient.auth.signOut();

    if (error) {
        alert(error.message);
        return;
    }

    document.getElementById("email").style.display = "block";
    document.getElementById("password").style.display = "block";

    document.getElementById("registerBtn").style.display = "inline-block";
    document.getElementById("loginBtn").style.display = "inline-block";

    document.getElementById("logoutBtn").style.display = "none";

    document.getElementById("profileBtn").style.display = "none";
    document.getElementById("logoutBtn").style.display = "none";
    document.getElementById("currentUser").textContent = "";
    document.getElementById("welcomeMessage").textContent =
                                "Lass uns lesen!";
    document.getElementById("sidebar").style.display = "none";
    document.getElementById("bookSection").style.display = "none";
    document.getElementById("coverSlider").style.display = "block";
    document.getElementById("adminPanel").style.display = "none";
    document.getElementById("adminBookForm").style.display = "none";

    books = [];
    renderBooks();

    
}

//Steuerung adminPanel anhang von rolle
function updateAdminPanel(role) {

    const display = role === "admin" ? "block" : "none";

    document.getElementById("adminPanel").style.display = display;
    document.getElementById("adminBookForm").style.display = display;
}

//Name und Avatar anzeigen
function updateProfileInfo(profile, user) {

    const userName = profile?.username || user.email.split("@")[0];
    const avatar = profile?.avatar || "avatar1";

    const img = document.getElementById("avatarImage");

    if (img) {
        img.src = `avatars/${avatar}.png`;
    }

    document.getElementById("profileName").textContent = userName;

    document.getElementById("welcomeMessage").textContent =
        `Ich freue mich, dass du da bist, ${userName}! Lass uns lesen!`;
}
//Anzeigesteuerung nach LOgin
function showLoggedInView() {

    document.getElementById("email").style.display = "none";
    document.getElementById("password").style.display = "none";

    document.getElementById("registerBtn").style.display = "none";
    document.getElementById("loginBtn").style.display = "none";

    document.getElementById("profileBtn").style.display = "inline-block";
    document.getElementById("logoutBtn").style.display = "inline-block";

    document.getElementById("sidebar").style.display = "flex";
    document.getElementById("bookSection").style.display = "block";
}
//Verstecken Gast elements
function hideGuestElements() {

    document.getElementById("currentUser").textContent = "";
    document.getElementById("coverSlider").style.display = "none";
}
//Benutzer eingelogt, anzeigen

async function checkUser() {

    const {
        data: { user }
    } = await supabaseClient.auth.getUser();

    if (!user) return;

    hideGuestElements();

    const profile = await getProfile(user.id);
    const role = profile?.role || "user";

    updateAdminPanel(role);
    updateProfileInfo(profile, user);
    showLoggedInView();

    await loadBooks();
}
/*async function checkUser() {

    const {
        data: { user }
    } = await supabaseClient.auth.getUser();

    if (user) {

        document.getElementById("currentUser").textContent = "";
        document.getElementById("coverSlider").style.display = "none";

        const profile = await getProfile(user.id);

        const role = profile?.role || "user";

        console.log("Role:", role);

        document.getElementById("adminPanel").style.display = "none";
        document.getElementById("adminBookForm").style.display = "none";

        if (role === "admin") {

            document.getElementById("adminPanel").style.display = "block";
            document.getElementById("adminBookForm").style.display = "block";

        } else {

            document.getElementById("adminPanel").style.display = "none";
            document.getElementById("adminBookForm").style.display = "none";
        }

        const userName = profile?.username || user.email.split("@")[0];

        const avatar = profile?.avatar || "avatar1";

        const img = document.getElementById("avatarImage");
        console.log(img);

        if (img) {
            img.src = `avatars/${avatar}.png`;
        }

        document.getElementById("profileName").textContent = userName;

        document.getElementById("welcomeMessage").textContent =
            `Ich freue mich, dass du da bist, ${userName}! Lass uns lesen!`;

        document.getElementById("email").style.display = "none";
        document.getElementById("password").style.display = "none";

        document.getElementById("registerBtn").style.display = "none";
        document.getElementById("loginBtn").style.display = "none";

        document.getElementById("profileBtn").style.display = "inline-block";
        document.getElementById("logoutBtn").style.display = "inline-block";
        document.getElementById("sidebar").style.display = "flex";
        document.getElementById("bookSection").style.display = "block";

        await loadBooks();
    }
}*/

checkUser();

//My Profil seite einzeigen

async function showProfile() {

    document.getElementById("bookSection").style.display = "none";
    document.getElementById("profileSection").style.display = "block";

    const {
        data: { user }
    } = await supabaseClient.auth.getUser();

    const profile = await getProfile(user.id);

    document.getElementById("profileUsername").value =
        profile?.username || "";

    document.getElementById("profileBirthday").value =
        profile?.birthday || "";
    document.getElementById("profileAvatar").value =
        profile?.avatar || "avatar1";
}

// my Profil updaten
async function saveProfile() {

    const {
        data: { user }
    } = await supabaseClient.auth.getUser();

    const username =
        document.getElementById("profileUsername").value;

    const birthday =
        document.getElementById("profileBirthday").value;
    const avatar =
        document.getElementById("profileAvatar").value;

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