
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const projects = document.querySelectorAll("#project>.container>.row>div");
const form = document.querySelector("#verify");
let timeout = undefined;
window.addEventListener("resize", resizeProjectsItems);
window.addEventListener("DOMContentLoaded", resizeProjectsItems);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.querySelector("#email");
    email.classList.remove('is-invalid');
    if (emailRegex.test(email.value)) {
        email.classList.add("is-valid")
        email.classList.remove('is-invalid');
        setTimeout(() => {
            form.classList.add("d-none");
            document.querySelector("#personal-detail").classList.remove("d-none");
        }, 500);

    } else {
        clearTimeout(timeout);
        email.classList.add('is-invalid');
        timeout = setTimeout(() => {
            email.classList.remove('is-invalid');
        }, 5000);
    }
});
document.querySelectorAll(".btn--view-more").forEach(btn => {
    btn.addEventListener("click", e => {
        e.target.nextElementSibling.classList.toggle("d-none");
    });
});
document.querySelectorAll(".btn--view-less").forEach(btn => {
    btn.addEventListener("click", e => {
        e.target.previousElementSibling.classList.toggle("d-none");
    });
});
function resizeProjectsItems() {
    /** Reset Height */
    projects.forEach((item) => {
        item.querySelector("table tr:last-child").style.height = '';
    });

    const maxHeight = projects[0].offsetHeight;
    projects.forEach((item) => {
        const totalHeight = Array.from(item.children).reduce((acc, item) => {
            return acc + item.offsetHeight;
        }, 0);
        if (Math.abs(totalHeight - maxHeight) > 1) {
            const lastRow = item.querySelector("table tr:last-child");
            lastRow.style.height = maxHeight - (totalHeight) + lastRow.offsetHeight + "px";
        }
    });
}
