const button = document.querySelector(".button");

function printScreenSize() {
    let size = getScreenSize()
    button.innerText = `width: ${size.width} px, height: ${size.height} px`
}

function getScreenSize() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    return {
        "width": width,
        "height": height
    }
}


button.addEventListener("click", printScreenSize)