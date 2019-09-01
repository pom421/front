let modal = null
const focusableSelectors = "button, a, input, textarea, select"
let focusables = []
let previouslyFocused = null

const open = e => {
    e.preventDefault()
    previouslyFocused = document.querySelector(":focus")
    modal = document.querySelector(e.target.getAttribute("href"))
    modal.style.display = null
    modal.querySelector(".modal-wrapper").scrollTop = 0
    modal.removeAttribute("aria-hidden")
    modal.setAttribute("aria-modal", true)

    focusables = Array.from(modal.querySelectorAll(focusableSelectors))

    modal.addEventListener("click", close)
    modal.querySelector("[data-close-modal]").addEventListener("click", close)
    modal.querySelector("[data-stop-propagation]").addEventListener("click", stopPropagation)

}

const close = e => {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    previouslyFocused.focus()
    modal.setAttribute("aria-hidden", true)
    modal.removeAttribute("aria-modal")

    modal.removeEventListener("click", close)
    modal.querySelector("[data-close-modal]").removeEventListener("click", close)
    modal.querySelector("[data-stop-propagation]").removeEventListener("click", stopPropagation)
    modal = null

}


const focusInModal = function(e) {
    e.preventDefault()
    let index = focusables.findIndex(f => f === modal.querySelector(":focus"))
    if (e.shiftKey) {
        index--
    } else {
        index++
    }
    if (index >= focusables.length) {
        index = 0;
    }
    if (index < 0) {
        index = focusables.length - 1
    }
    focusables[index].focus()

}

const stopPropagation = e => {
    e.stopPropagation()
}


document.querySelectorAll("[data-open-modal]").forEach(a => {
    a.addEventListener("click", open)
})

window.addEventListener("keydown", e => {
    if (e.key === "Escape" || e.key === "Esc") {
        close(e)
    }
    if (e.key === "Tab" && modal !== null) {
        focusInModal(e)

    }

})

