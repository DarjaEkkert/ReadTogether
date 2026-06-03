//Registrierung
async function registerUser() {

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    const { error } =
        await supabaseClient.auth.signUp({
            email,
            password
        });

    if (error) {
        alert(error.message);
        return;
    }

    
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

    document.getElementById("currentUser").textContent = data.user.email;
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";

    document.getElementById("email").style.display = "none";
    document.getElementById("password").style.display = "none";

    document.getElementById("registerBtn").style.display = "none";
    document.getElementById("loginBtn").style.display = "none";

    document.getElementById("logoutBtn").style.display = "inline-block";
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

    document.getElementById("logoutBtn").style.display = "none";
    document.getElementById("currentUser").textContent = "";
    books = [];
    renderBooks();

    
}

//Benutzer beim Laden anzeigen
async function checkUser() {

    const {
        data: { user }
    } = await supabaseClient.auth.getUser();

    if (user) {

        document.getElementById("currentUser").textContent =  user.email;
        document.getElementById("email").style.display = "none";
        document.getElementById("password").style.display = "none";

        document.getElementById("registerBtn").style.display = "none";
        document.getElementById("loginBtn").style.display = "none";

        document.getElementById("logoutBtn").style.display = "inline-block";



        await loadBooks();
    }
}

checkUser();
