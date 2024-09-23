import { MiniMaple} from "./miniMaple.js";

const mm = new MiniMaple();


document.addEventListener('DOMContentLoaded',setup)

function setup() {
    let demoButton = document.getElementById('demoButton');
    demoButton.onclick = addSomething;

    let variableInput = document.getElementById("variableInput");
    variableInput.addEventListener("input", function () {
        console.log(this.value === "");
        demoButton.disabled = (this.value === "");
    })
    demoButton.disabled = variableInput.value === "";
}

function addSomething(){
    let variableInput = document.getElementById("variableInput");
    let variableName = variableInput.value;

    let polynomialInput = document.getElementById("polynomialInput");
    let polynomial = polynomialInput.value;


    let generated = document.getElementById('generated'); 
    if (generated === null) {
        
        generated = document.createElement('div');
        generated.id='generated';
    }
    
    const diffResult = mm.diff(polynomial, variableName);

    generated.innerHTML = diffResult;
    const container = document.getElementById('result');
    container.appendChild(generated);
}