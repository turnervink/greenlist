/**
 * Created by Kieran on 5/10/2017.
 */
function openNav() {
    document.getElementByID("sidebar").style.width = "600px";
    document.getElementByID("sidebar").innerHTML = "test";
}
function closeNav() {
    document.getElementByID("sidebar").style.width = "0px";
}