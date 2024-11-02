const requestURL = '../json/index.json';

async function fetchCarsJson(){
    try{
        const response = await fetch(requestURL);
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

function createCarCard ({brand, image, price, year, description}){
    return `
        <div class="card" style="width: 18rem;">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${brand}</h5>
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
    const carsSection = document.getElementById('carSection');
    const carsData = await fetchCarsJson();

    if (carsData && carsData.cars){
        const cardsCars = carsData.cars.map(createCarCard).join('');
        carsSection.innerHTML = cardsCars;
    }
    else
    {
        carsSection.innerHTML = `<p>No se ha podido cargar el Json de los coches</p>`;    
    }
}


displayCars();