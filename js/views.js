//Verstecke alle Views und zeige nur die View, deren ID ich als Parameter übergebe
function showView(viewId) {

    document
        .querySelectorAll(".view")
        .forEach(view => {
            view.style.display = "none";
        });

    document.getElementById(viewId).style.display = "block";
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
    showView("homeView");
}
//Verstecken Gast elements
function hideGuestElements() {

    document.getElementById("currentUser").textContent = "";
    document.getElementById("coverSlider").style.display = "none";
}