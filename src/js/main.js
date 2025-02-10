import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';

const nameSelector = document.querySelector("#nameSelector")
const imageSelector = document.querySelector("#imageSelector")

const createDivBtn = document.querySelector("#uj")
const REL_IMG_PATH = "./images/"

let currentID = "---"

let stage = new Konva.Stage({
    container: 'container',
    width: 1000,
    height: 1000,
});

let layer = new Konva.Layer();
stage.add(layer)


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
            document.querySelector("#diakPreview").src = REL_IMG_PATH + "diakok/01.jpg"
        })

}

imageSelector.addEventListener("change", ()=>{
    document.querySelector("#diakPreview").src = REL_IMG_PATH + "diakok/" + imageSelector.value + ".jpg"
    
})


createDivBtn.addEventListener("click", ()=>{
    let name = nameSelector.value
    let pic = imageSelector.value
    let picturePath = REL_IMG_PATH + "diakok/" + pic + ".jpg"
    currentID = name.replace(" ", "-") + "_" + pic
    let c = stage.find(`#${currentID}`);    
    if(c.length != 0) {
        console.log("Ehhez a név-kép párhoz már tartozik doboz")
        return
    }
    let box = new Konva.Group({
        x: 0, 
        y: 0, 
        width: 100,
        height: 100,
        draggable: true,
        id: currentID
    }); 
    let rect = new Konva.Rect({
        width: 100,
        height: 100,
        fill: '#FF000080',
    })
    box.add(rect)
    box.add(new Konva.Text({
        text: `${name}\n${pic}\n`, // x és y ? 
        fill: '#FFFFFF',
        padding: 5
    }))
    let tr = new Konva.Transformer({
        node: rect,
        resizeEnabled: true,
        rotateEnabled: false
    });
    layer.add(box);
    layer.add(tr)
})





const main = ()=>{
    fillSelectors()
}

// 🔒
window.onload = main