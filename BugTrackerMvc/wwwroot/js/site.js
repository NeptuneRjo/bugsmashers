// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
const indexDisplayDropdown = document.getElementById("indexDisplay")

indexDisplayDropdown.addEventListener("change", function () {
    let solvedItems = document.getElementsByClassName('solved')
    let unsolvedItems = document.getElementsByClassName('unsolved')

    switch (this.value) {
        case "all":
            Array.from(solvedItems).forEach((item) => item.classList.remove("d-none"))
            Array.from(unsolvedItems).forEach((item) => item.classList.remove("d-none"))
            break;
        case "solved":
            Array.from(unsolvedItems).forEach((item) => item.classList.add("d-none"))
            Array.from(solvedItems).forEach((item) => item.classList.remove("d-none"))
            break;
        case "unsolved":
            Array.from(solvedItems).forEach((item) => item.classList.add("d-none"))
            Array.from(unsolvedItems).forEach((item) => item.classList.remove("d-none"))
            break;
        default:
            Array.from(solvedItems).forEach((item) => item.classList.remove("d-none"))
            Array.from(unsolvedItems).forEach((item) => item.classList.remove("d-none"))
            break;
    }
})