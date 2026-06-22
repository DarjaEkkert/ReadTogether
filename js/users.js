let selectedAvatar = "avatar1";

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

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
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

        document.getElementById("adminBtn").style.display = "block";
    }else {
        document.getElementById("adminBtn").style.display ="none";
    }
    const userName = profile?.username || data.user.email.split("@")[0];
    const avatar = profile?.avatar || "avatar1";
    const img = document.getElementById("avatarImage");
    console.log(img);

    if (img) {
    img.src = `avatars/${avatar}.png`;
    }
    document.getElementById("profileName").textContent = userName;

    const roleText = role === "admin"
    ? "Administrator"
    : "Mitglied";

    document.getElementById("userRole").textContent = roleText;

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
    showView("homeView");
    document.getElementById("coverSlider").style.display = "none";
    
    await loadBooks();
        
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
    document.getElementById("profileSection").style.display = "none";
    document.getElementById("coverSlider").style.display = "block";
    document.getElementById("adminSection").style.display = "none";
    document.getElementById("homeView").style.display = "none";
    

    books = [];
    renderBooks();

    
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
    updateProfileInfo(profile, user, role);
    showLoggedInView();

    const roundYear = document.getElementById("roundYear"); //in menü leseround wird jahr automatisch auf aktuelle gesetzt
    if (roundYear) {
        roundYear.value = new Date().getFullYear();
    }

    await loadBooks();
    await loadReadingRounds();
}

checkUser();

