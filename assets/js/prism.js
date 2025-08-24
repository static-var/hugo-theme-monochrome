function highlight() {
    document.querySelectorAll("pre:not(.emgithub-pre)").forEach(e => {
        Prism.highlightAllUnder(e, false, () => {
            requestAnimationFrame(() => {
                e.classList.remove("hide");
                
                // Also remove hide class from any nested pre elements (line numbers)
                e.querySelectorAll("pre.hide").forEach(nestedPre => {
                    nestedPre.classList.remove("hide");
                });
            })
        });
    });
}

window.addEventListener("DOMContentLoaded", () => {
    highlight();
})
