//Steuerung adminPanel anhang von rolle
function updateAdminPanel(role) {

    if (role === "admin") {
        document.getElementById("adminBtn").style.display = "block";
    } else {

        document.getElementById("adminBtn").style.display = "none";
        document.getElementById("adminSection").style.display = "none";
    }
}

//Adminseite anzeigen
function showAdmin() {

    showView("adminSection");
}
//Adminseite schlißen
function closeAdmin() {

    showView("homeView");
}