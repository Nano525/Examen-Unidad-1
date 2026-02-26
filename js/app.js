const btnBuscar = document.getElementById("btnBuscar");
const q = document.getElementById("q");
const from = document.getElementById("from");
const to = document.getElementById("to");
const resultados = document.getElementById("resultados");
const apiKey = '01a7e285f7a8418bb77f22b4be056b76';

btnBuscar.addEventListener("click", ()=> {
    if (q.value.trim() === '') {
        alert("Porfavor ingresa un termino de busqueda");
        return;
    }
    console.log("q: ", q.value);
    console.log("from: ", from.value);
    console.log("to: ", to.value);

    let url = 'https://newsapi.org/v2/everything?q=' + encodeURIComponent(q.value) + '&sortBy=popularity' + '&apiKey=' + apiKey;


    if (from.value && to.value && from.value > to.value) {
        alert("La fecha de inicio no puede ser mayor que la fecha final");
        return;
    }if (from.value !== '') {
        url += '&from=' + encodeURIComponent(from.value);
    }if (to.value !== '') {
        url += '&to=' + encodeURIComponent(to.value);
    }
    
    console.log("URL: ", url);

    fetch(url)
    .then(response => response.json())
    .then(data => {
        //Datos obtenidos de la API
        console.log("Data: ", data);
    })
    .catch(error => {
        console.error("Error al obtener las noticias: ", error);
        alert("Ocurrió un error al obtener las noticias. Por favor intenta nuevamente.");
    });

})