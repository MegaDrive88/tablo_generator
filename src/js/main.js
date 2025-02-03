import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';

const nameSelector = document.querySelector("#nameSelector")
const imageSelector = document.querySelector("#imageSelector")

const createDivBtn = document.querySelector("#uj")
const tabloDiv = document.querySelector(".tablo-image")
const bgImage = document.querySelector("#tabloKep")
const REL_IMG_PATH = "./images/"


bgImage.src = REL_IMG_PATH + "tablo.jpg"


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


const main = async ()=>{
    await fillSelectors()
    createDivBtn.addEventListener("click", ()=>{
        let diakDiv = document.createElement("div")
        diakDiv.className = "diakDiv"
        tabloDiv.appendChild(diakDiv)
        // createDivBtn.enabled = false
    })
}

window.onload = main