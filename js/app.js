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
    }

    if (from.value !== '') {
        url += '&from=' + encodeURIComponent(from.value);
    }

    if (to.value !== '') {
        url += '&to=' + encodeURIComponent(to.value);
    }
    
    console.log("URL: ", url);
    resultados.innerHTML = '';

    fetch(url)
    .then(response => response.json())
    .then(data => {
        //Datos obtenidos de la API
        console.log("Data: ", data);
        if (!data.articles || data.articles.length === 0) {
        resultados.innerHTML = "<p>No se encontraron noticias.</p>";
        return;
        }
        if (data.status !== "ok") {
        resultados.innerHTML = '<div class="col-12"><div class="alert alert-warning">No se encontraron noticias.</div></div>';        return;
        }

        data.articles.forEach(element => {
            const col = document.createElement("div");
            col.classList.add("col-md-6", "mb-4");
            const card = document.createElement("div");
            card.classList.add("card", "h-100");
            const img = document.createElement("img");
            img.classList.add("card-img-top");
            img.src = element.urlToImage || "https://via.placeholder.com/300x200?text=Imagen+No+Disponible";
            card.appendChild(img);
            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");
            const title = document.createElement("h5");
            title.classList.add("card-title");
            title.textContent = element.title || "Título no disponible";
            const description  = document.createElement("p");
            description .classList.add("card-text");
            description .textContent = element.description || "Descripción no disponible";
            const info = document.createElement("p");
            info.classList.add("card-text");
            const source = element.source && element.source.name ? element.source.name : "Fuente no disponible";
            const publishedAt = element.publishedAt ? new Date(element.publishedAt).toLocaleDateString() : "Fecha no disponible";
            info.textContent = `Fuente: ${source} | Publicado el: ${publishedAt}`;
            const link = document.createElement("a");
            link.href = element.url;
            link.target = "_blank";
            link.classList.add("btn", "btn-primary");
            link.innerText = "Leer más";
            cardBody.appendChild(title);
            cardBody.appendChild(description );
            cardBody.appendChild(info);
            cardBody.appendChild(link);
            card.appendChild(cardBody);
            col.appendChild(card);
            resultados.appendChild(col);
        });
    })
    .catch(error => {
        console.error("Error al obtener las noticias: ", error);
        alert("Ocurrió un error al obtener las noticias. Por favor intenta nuevamente.");
    });

})