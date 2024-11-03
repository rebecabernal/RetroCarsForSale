const requestURL = './json/cars.json';

async function fetchCarsJson(){
    const response = await fetch(requestURL);
    try{
        if (!response.ok) {
            throw new Error(`Error en la petición al Json ${response.status}`);
        }
        return await response.json();
    }
    catch (error){
        console.error('Error al obetener los coches de la Api : ', error);
        return null;
    }
   
}

function createCarsCard ({id, brand, image, price, year, description}){
    return `
        <div class="card" style="width: 700px;">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${id} - ${brand}</h5>
                <p class="card-text">${description}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${year}</li>
                <li class="list-group-item">${price}</li>
            </ul>
        </div>
`;
}

async function displayCars() {
    const carSection = document.getElementById('carSection');
    const carsData = await fetchCarsJson();

    if (carsData && carsData.cars){
        const carCards = carsData.cars.map(createCarsCard).join('');
        carSection.innerHTML = carCards;
    }
    else
    {
        carSection.innerHTML = `<p>No se ha podido cargar el Json de los coches</p>`;    
    }
}


displayCars();