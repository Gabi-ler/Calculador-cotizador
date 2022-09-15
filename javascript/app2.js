class Banco {
    constructor(monto, cantCuotas, interes, cuota) {
        this.id = Math.random().toString(36).substring(2, 9);
        this.monto = monto
        this.cantCuotas = cantCuotas
        this.interes = interes
        this.cuota = cuota
    }
}

function financiacion(num1, num2, num3, num4) {
    return num1 * (num2 + num3 * num4)
}
function cuotas(montoFinal, cuotas) {
    return montoFinal / cuotas
}
const tasa = 0.045
const num = 1
let monto;
let cantCuotas;
let interes;
let cuota;
let salida;

//----------------Funcion que integra el calculo princiapl del prestamo----
const calculador = () => {
    if (monto === 0) return //(alert('Monto invalido'))
    if (cantCuotas !== 12 && cantCuotas !== 24 && cantCuotas !== 36 && cantCuotas !== 48) {
        return Swal.fire({
            title: 'Inválido',
            text: 'Seleccione el monto de cuotas',
            icon: 'warning',
            showConfirmButton: false,
            timer: 2500
        });
    }

    interes = financiacion(monto, num, tasa, cantCuotas)
    cuota = cuotas(interes, cantCuotas)

    return new Banco(monto, cantCuotas, interes, cuota)
}

//---------------Trayendo template del HTML
let resultado = []
const resultadoLS = getLocalStorage()
if (resultadoLS) {
    resultado = resultadoLS
}

let form = document.getElementById("datos")


const generateHTML = (element) => {
    return `<p>Su prestamo es de: $ ${element.monto}</p>
            <p>Vas a devolver: $ ${element.interes.toFixed(2)}</p>
            <p>En ${element.cantCuotas} cuotas de $ ${element.cuota.toFixed(2)} </p>
            <button class="btn btn-success">Solicitar</button>
            <button id="${element.id}" class="borrar btn btn-danger">Borrar</button>`;
}


function getLocalStorage() {
    return JSON.parse(localStorage.getItem('resultado'));
}

const fnBorrarCardArray = (calId) => {
    const resultado = getLocalStorage()
    return resultado.filter((calcu) => calcu.id !== calId)
}

const fnBorrarCard = (calculoId) => {
    const mostrarResult = getLocalStorage()
    return mostrarResult.filter((calcu) => calcu.id !== calculoId)
}

// -------------borrar elementos
const fnDeleteButtonsEvents = () => {
    const borrarCard = document.querySelectorAll('.borrar');
    console.log(borrarCard);
    borrarCard.forEach(buttonDelete => buttonDelete.addEventListener("click", (event) => {
        event.target.parentElement.remove();
        const calculosRestantes = fnBorrarCard(event.target.id)
        localStorage.setItem('resultado', JSON.stringify(calculosRestantes))
    }));
}


/**
 * Get local storage elements and append it to DOM
 */
const fnAppendLocalStorageElements = () => {
    const mostrarResult = getLocalStorage()
    const prestCalculado = document.querySelector('#cardCalculos')

    mostrarResult.forEach((element) => {
        const card = document.createElement('div')
        card.classList.add('op-list')
        card.innerHTML = generateHTML(element);
        prestCalculado.append(card)
    })
    // Assign event to existing buttons for delete card
    fnDeleteButtonsEvents();
}

//----------------Evento aplicado al boton calcular
form.addEventListener("submit", (event) => {
    event.preventDefault()
    monto = document.querySelector('#monto').value
    selectCuota = () => {
        let selectorCuotas = document.getElementById("lang")
        cantCuotas = parseInt(selectorCuotas.value)

    }
    selectCuota(cantCuotas)
    resultado.push(calculador())
//-----------------Renderizado de calculos
    const prestCalculado = document.querySelector('#cardCalculos')
    const card = document.createElement('div')
    card.classList.add('op-list')

    resultado.forEach((element) => {
        card.innerHTML = generateHTML(element)
        prestCalculado.append(card)
    })

    //-----------------localStorage
    const calculosJSON = JSON.stringify(resultado)
    localStorage.setItem('resultado', calculosJSON)

    fnDeleteButtonsEvents();
})

// Init Functions
fnAppendLocalStorageElements();