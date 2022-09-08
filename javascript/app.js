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
    if (cantCuotas != 12 && cantCuotas != 24 && cantCuotas != 36 && cantCuotas != 48) return (
        (Swal.fire({
            title: 'Inválido',
            text: 'Seleccione el monto de cuotas',
            icon: 'warning',
            showConfirmButton: false,
            timer: 2500
        })))

    interes = financiacion(monto, num, tasa, cantCuotas)
    cuota = cuotas(interes, cantCuotas)

    const impCalculados = new Banco(monto, cantCuotas, interes, cuota)
    return impCalculados
}

//---------------Trayendo template del HTML
let resultado = []
const resultadoLS = JSON.parse(localStorage.getItem('resultado'))
if (resultadoLS) {
    resultado = resultadoLS
}

let form = document.getElementById("datos")


//----------------Evento aplicado al boton calcular
form.addEventListener("submit", (e) => {
    e.preventDefault()
    monto = document.querySelector('#monto').value
    selectCuota = () => {
        let selectorCuotas = document.getElementById("lang")
        cantCuotas = selectorCuotas.value
        return
    }
    selectCuota(cantCuotas)
    resultado.push(calculador())

//-----------------Renderizado de calculos
    const prestCalculado = document.querySelector('#cardCalculos')
    const card = document.createElement('div')
    card.classList.add('op-list')

 
    resultado.forEach((eleme) => {
        card.innerHTML = `
                            <p>Su prestamo es de: $ ${eleme.monto}</p>
                            <p>Vas a devolver: $ ${eleme.interes.toFixed(2)}</p>
                            <p>En ${eleme.cantCuotas} cuotas de $ ${eleme.cuota.toFixed(2)} </p>
                            <button class="btn btn-success">Solicitar</button>
                            <button id="borrar" class="btn btn-danger">Borrar</button>
`
        prestCalculado.append(card)
    })
        
    //-----------------localStorage
    const calculosJSON = JSON.stringify(resultado)
    localStorage.setItem('resultado', calculosJSON)
    
    /*const borrarCard = document.querySelectorAll('.borrar');
    borrarCard.forEach(buttonDelete => buttonDelete.addEventListener("click", (event) => {
        event.target.parentElement.remove();
        // agregar codigo pra eliminar del localStorage por id
    }));*/
})

    const prestCalculado = document.querySelector('#cardCalculos')
    const mostrarResult = JSON.parse(localStorage.getItem('resultado'))
    console.log(mostrarResult);
    
    mostrarResult.forEach((eleme) => {
        const card = document.createElement('div')
        card.classList.add('op-list')
        card.innerHTML = `
                                <p>Su prestamo es de: $ ${eleme.monto}</p>
                                <p>Vas a devolver: $ ${eleme.interes.toFixed(2)}</p>
                                <p>En ${eleme.cantCuotas} cuotas de $ ${eleme.cuota.toFixed(2)} </p>
                                <button class="btn btn-success">Solicitar</button>
                                <button id="borrar" class="btn btn-danger">Borrar</button>
    `
        prestCalculado.append(card)
    })
    
    const borrarCard = document.querySelector('#borrar')
    
    const fnBorrarCard = () => {
        const calculo = mostrarResult.find((calcu) => calcu.id === id)
        const indice =  mostrarResult.indexOf(calculo)

        mostrarResult.splice(indice, 1)
    }

    borrarCard.addEventListener("click", fnBorrarCard)
    
    // -------------borrar elementos
    // const borrarCard = document.querySelectorAll('.borrar');
    /*borrarCard.forEach(buttonDelete => buttonDelete.addEventListener("click", (event) => {
        event.target.parentElement.remove();
        // agregar codigo pra eliminar del localStorage por id
    }));*/
    




