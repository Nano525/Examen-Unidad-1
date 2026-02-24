const btnBuscar = document.getElementById("btnBuscar");
const q = document.getElementById("q");
const from = document.getElementById("from");
const to = document.getElementById("to");
const resultados = document.getElementById("resultados");
const apiKey = '01a7e285f7a8418bb77f22b4be056b76';

btnBuscar.addEventListener("click", ()=> {
    console.log("q: ", q.value);
    console.log("from: ", from.value);
    console.log("to: ", to.value);

    if (from.value !== '' && to.value !== '') {
    }

    const url = 'https://newsapi.org/v2/everything?q=' + encodeURIComponent(q.value) + '&from=' + encodeURIComponent(from.value) + '&to=' + encodeURIComponent(to.value) + '&sortBy=popularity' + '&apiKey=' + apiKey;


})