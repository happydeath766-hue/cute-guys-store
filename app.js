setTimeout(() => {
    document.getElementById("splash-screen").style.opacity = "0";

    setTimeout(() => {
        document.getElementById("splash-screen").style.display = "none";
        document.getElementById("app").style.display = "block";
    }, 500);

}, 2000);
function openProduct(product) {
    alert("Has abierto: " + product);
}
