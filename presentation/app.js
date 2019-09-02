const pages = Array.from(document.querySelectorAll(".page"))
const urlParts = window.location.href.split("#")
const currentPage = urlParts.length > 1? urlParts[1] : null;
const mainTitle = document.querySelector("#title")

if (currentPage) {
    let index = pages.findIndex(p => p.id === currentPage)

    if (index === -1) {
        index = 0
    }
    showPage(pages[index])
}

document.addEventListener("keyup", e => {
    if (e.key === "ArrowRight") {
        next()
    } else if (e.key === "ArrowLeft") {
        previous();
    }
})

document.addEventListener("popstate", e => {
    showPage(e.state.page)
})

document.querySelector("#floating-next").addEventListener("click", e => {
    next()
})
document.querySelector("#floating-previous").addEventListener("click", e => {
    previous()
})


function showPage(page) {
    window.history.pushState({ page: {...page} }, "", `#${page.id}`)

    pages.forEach(p => {
        if (p.id === page.id) {
            p.setAttribute("aria-hidden", false)
        } else {
            p.setAttribute("aria-hidden", true)
        }
    })
}

const next = () => {
    const current = document.querySelector("[aria-hidden=false]")
    let index = pages.findIndex(p => p === current)

    index++
    if (index === pages.length) {
        index = 0
    }
    showPage(pages[index])

}


const previous = () => {
    const current = document.querySelector("[aria-hidden=false]")
    let index = pages.findIndex(p => p === current)

    index--
    if (index < 0) {
        index = pages.length - 1
    }

    showPage(pages[index])

}