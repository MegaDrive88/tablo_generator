import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';

const nameSelector = document.querySelector("#nameSelector")
const imageSelector = document.querySelector("#imageSelector")

const createDivBtn = document.querySelector("#uj")
const tabloDiv = document.querySelector(".tablo-image")
const bgImage = document.querySelector("#tabloKep")
const REL_IMG_PATH = "./images/"

bgImage.src = REL_IMG_PATH + "tablo.jpg"
bgImage.ondragstart = function() { return false; };

let imgsLength = 0;

async function fillSelectors() {
    fetch("./data/people.txt").then((res) => res.text())
        .then((text) => {
            text.split("\r\n").forEach(x=>{
                nameSelector.innerHTML += `<option value="${x}">${x}</option>`;
                imgsLength++
                let twoLongNumber = imgsLength < 10 ? '0'+imgsLength : imgsLength
                imageSelector.innerHTML += `<option value="${twoLongNumber}">${twoLongNumber}</option>`;
            })
        })
} 

// function detectLeftButton(evt) {
//     evt = evt || window.event;
//     if ("buttons" in evt) {
//         return evt.buttons == 1;
//     }
//     var button = evt.which || evt.button;
//     return button == 1;
// }




let divsSoFar = 0

const moveDiv = (e, target, contentStart)=>{
        let clickedDivId = target.id
        target.style.top = e.clientY - 5 + "px"
        target.style.left = e.clientX - 5 - window.screen.width*.05 + "px"
        target.innerHTML = contentStart + "top: " + target.style.top + "<br>left: " + target.style.left +"<br><button>\🔒</button>"

        // console.log(e.clientX);
    
}

const main = async ()=>{
    await fillSelectors()
    createDivBtn.addEventListener("click", ()=>{
        let diakDiv = document.createElement("div")
        divsSoFar++
        diakDiv.className = "diakDiv"
        diakDiv.id = "d" + divsSoFar
        let contentStart = `${nameSelector.value}<br>${imageSelector.value}.jpg<br>`
        diakDiv.style.top = 0
        diakDiv.style.left = 0
        diakDiv.innerHTML = contentStart + "top: " + diakDiv.style.top + "<br>left: " + diakDiv.style.left
        tabloDiv.appendChild(diakDiv)
        tabloDiv.addEventListener("mousedown", (e) => {moveDiv(e, diakDiv, contentStart)}) // szar otlet...
    })
}

window.onload = main