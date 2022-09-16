class Banco {
    constructor(monto, tasaRecibida, cantCuotas, interes, cuota) {
        this.id = Math.random().toString(36).substring(2, 9);
        this.monto = monto
        this.tasaRecibida = tasaRecibida
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

function conversorTasa(tasaRecibid, operador) {
    return tasaRecibid / operador
}

// const tasa = 0.045
const num = 1
const numOperador = 1000
let tasa;
let monto;
let cantCuotas;
let tasaRecibida;
let interes;
let cuota;
let salida;


//----------------Funcion que integra el calculo princiapl del prestamo----
const calculador = () => {
    if (cantCuotas != 12 && cantCuotas != 24 && cantCuotas != 36 && cantCuotas != 48) return (
        (Swal.fire({
            title: 'Inválido',
            text: 'Seleccione el monto de cuotas',
            icon: 'warning',
            showConfirmButton: false,
            timer: 2500
        })))
    tasa = conversorTasa(tasaRecibida, numOperador)
    interes = financiacion(monto, num, tasa, cantCuotas)
    cuota = cuotas(interes, cantCuotas)

    const impCalculados = new Banco(monto, tasaRecibida, cantCuotas, interes, cuota)
    return impCalculados
}

//---------------Trayendo template del HTML
let resultado = []
const resultadoLS = JSON.parse(localStorage.getItem('resultado'))
if (resultadoLS) {
    resultado = resultadoLS
}

let form = document.getElementById("datos")

// const load = document.querySelector('#louder')

//-------------Evento aplicado al boton calcular

form.addEventListener("submit", (e) => {
    e.preventDefault()
    monto = Number(document.querySelector('#monto').value)
    if (monto < 1000) {
        (Swal.fire({
            title: 'Inválido',
            text: 'Ingrese un número mayor o igual a 10000',
            icon: 'warning',
            showConfirmButton: false,
            timer: 2000
        }))
        return
    }
    tasaRecibida = document.querySelector('#tasaRecibida').value
    selectCuota = () => {
        let selectorCuotas = document.getElementById("lang")
        cantCuotas = selectorCuotas.value
        return
    }
    selectCuota(cantCuotas)
    resultado.push(calculador())
    form.reset()

    //-----------------Renderizado de calculos
    const prestCalculado = document.querySelector('#cardCalculos')
    const card = document.createElement('div')
    card.classList.add('op-list')


    resultado.forEach((eleme) => {
        card.innerHTML = `
                        <p>Su prestamo es de: $ ${eleme.monto}</p>
                        <p>Con una tasa del % ${eleme.tasaRecibida} anual</p>
                        <p>Vas a devolver: $ ${eleme.interes.toFixed(2)}</p>
                        <p>En ${eleme.cantCuotas} cuotas de $ ${eleme.cuota.toFixed(2)} </p>
                        <button class="btn btn-success solicito">Solicitar</button>
                        <button id="${eleme.id}" class="btn btn-danger borro">Borrar</button>
`
        prestCalculado.append(card)
    })


    //-----------------localStorage
    const calculosJSON = JSON.stringify(resultado)
    localStorage.setItem('resultado', calculosJSON)

    //------Boton solicitar, para brindar datos de contacto-----
    const solicitar = document.querySelectorAll('.solicito')
    solicitar.forEach(buttonsolicitar => {
        return buttonsolicitar.addEventListener('click', () => {
            modalContainer.classList.add('modal-container-active')
        })
    })

   //------Boton borrar, para borrar calculos----- 
    const borrarCard = document.querySelectorAll('.borro');
    borrarCard.forEach(buttonDelete => {
        return buttonDelete.addEventListener("click", (event) => {
            event.target.parentElement.remove();
            // codigo pra eliminar del localStorage por id
            const mostrarResult = JSON.parse(localStorage.getItem('resultado'));

            const calculosRestantes = mostrarResult.filter((calcu) => calcu.id !== event.target.id)
            localStorage.setItem('resultado', JSON.stringify(calculosRestantes))
        })
    })
})


//-------------------- Renderizado del localStorage------------------
const prestCalculado = document.querySelector('#cardCalculos')
const mostrarResult = JSON.parse(localStorage.getItem('resultado'))

mostrarResult.forEach((eleme) => {
    const card = document.createElement('div')
    card.classList.add('op-list')
    card.innerHTML = `
                                <p>Su prestamo es de: $ ${eleme.monto}</p>
                                <p>Con una tasa del % ${eleme.tasaRecibida} anual</p>
                                <p>Vas a devolver: $ ${eleme.interes.toFixed(2)}</p>
                                <p>En ${eleme.cantCuotas} cuotas de $ ${eleme.cuota.toFixed(2)} </p>
                                <button class="btn btn-success solicito">Solicitar</button>
                                <button id="${eleme.id}" class="btn btn-danger borro">Borrar</button>
    `
    prestCalculado.append(card)

})

//------Boton solicitar, para brindar datos de contacto-----
const solicitar = document.querySelectorAll('.solicito')
solicitar.forEach(buttonsolicitar => {
    return buttonsolicitar.addEventListener('click', () => {
        modalContainer.classList.add('modal-container-active')
    })
})

//------Boton borrar, para borrar calculos-----
const borrarCard = document.querySelectorAll('.borro');
borrarCard.forEach(buttonDelete => buttonDelete.addEventListener("click", (event) => {
    event.target.parentElement.remove();
    // codigo pra eliminar del localStorage por id
    const mostrarResult = JSON.parse(localStorage.getItem('resultado'));

    const calculosRestantes = mostrarResult.filter((calcu) => calcu.id !== event.target.id)
    localStorage.setItem('resultado', JSON.stringify(calculosRestantes))
}))


// --------------Programa para el Conversor a traves de API------------
const monedaUno = document.querySelector('#moneda-uno')
const monedaDos = document.querySelector('#moneda-dos')
const cantidadUno = document.querySelector('#cantidad-uno')
const cantidadDos = document.querySelector('#cantidad-dos')
const cambio = document.querySelector('#cambio')
const tazael = document.querySelector('#taza')

const conversor = () => {
    const moneda1 = monedaUno.value
    const moneda2 = monedaDos.value

    fetch(`https://api.exchangerate-api.com/v4/latest/${moneda1}`)
        .then(res => res.json())
        .then(data => {
            const taza = data.rates[moneda2];

            cambio.innerText = `1 ${moneda1} = ${taza} ${moneda2}`;

            cantidadDos.value = (cantidadUno.value * taza).toFixed(2);
        })
}

monedaUno.addEventListener('change', conversor);
cantidadUno.addEventListener('input', conversor);
monedaDos.addEventListener('change', conversor);
cantidadDos.addEventListener('input', conversor);

taza.addEventListener('click', () => {
    const temp = monedaUno.value
    monedaUno.value = monedaDos.value
    monedaDos.value = temp

    conversor();
})
conversor()

//----------- Abrir modal de contacto--------
const solicitar1 = document.querySelectorAll('.solicito')
const modalContainer = document.querySelector('#modal-containers')
const cerrarModal = document.querySelector('#button-cerrar')

cerrarModal.addEventListener("click", () => {
    modalContainer.classList.remove('modal-container-active')
})


// --------- Código para enviar mail utilizando libreria email JS----
const btn3 = document.getElementById('button');

document.getElementById('form')
    .addEventListener('submit', function (event) {
        event.preventDefault();

        btn3.value = 'Enviando...';

        const serviceID = 'default_service';
        const templateID = 'template_bjxh269';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn3.value = 'Enviar';
                modalContainer.classList.remove('modal-container-active')
                    ((Swal.fire({
                        title: 'Inválido',
                        text: 'Enviado exitosamente',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2500
                    })))
            }, (err) => {
                btn3.value = 'Enviar';
                alert(JSON.stringify(err));
            });
    });