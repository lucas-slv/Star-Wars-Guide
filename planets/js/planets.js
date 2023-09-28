let contentPageUrl = 'https://swapi.dev/api/planets/'

window.onload = async () => {
    try {
        await loadPlanets(contentPageUrl)
    } catch (error) {
        console.log(error, 'Erro ao carregar dados da API')
        alert('Erro ao carregar dados da API, tente recarregar a página')
    }
}

async function loadPlanets() {
    const cards = document.querySelectorAll('.swiper-slide.card');
    const allPromises = [];

    try {
        while (contentPageUrl) {
            const response = await fetch(contentPageUrl);
            const responseJson = await response.json();

            responseJson.results.forEach(planet => {
                allPromises.push(planet.name);
            });

            contentPageUrl = responseJson.next;
        }

        const resolvedPromises = await Promise.all(allPromises);

        cards.forEach((card, index) => {
            const planetNameElement = card.querySelector('.planet-name');
            const planetName = resolvedPromises[index] === 'unknown' ? 'Desconhecido' : resolvedPromises[index]
            planetNameElement.textContent = planetName;
        });

    } catch (error) {
        console.log('Erro ao obter dados da API:', error);
        alert('Erro ao obter dados da API')
    }
}

document.querySelectorAll('.swiper-slide.card').forEach((card, index) => {
    card.addEventListener('click', async () => {
        const modal = document.getElementById('modal')
        modal.classList.add('active')

        const loadModal = document.getElementById('loading')
        loadModal.style.visibility = 'visible'

        const modalContent = document.getElementById('modal-content');
        modalContent.innerHTML = ''

        try {
            
            const response = await fetch(`https://swapi.dev/api/planets/${index + 1}`);
            const responseJson = await response.json();

            const imageUrl = card.getAttribute('data-image-url');
    
            const planetImage = document.createElement('div');
            planetImage.className = 'planet-image';
    
            planetImage.style.backgroundImage = `url(${imageUrl})`;
            
            const planetName = document.createElement('span');
            planetName.className = 'planets-details';
            planetName.innerText = `Nome: ${convertName(responseJson.name)}`;

            const planetDiameter = document.createElement('span');
            planetDiameter.className = 'planets-details';
            planetDiameter.innerText = `Diâmetro: ${convertDiameter(responseJson.diameter)}`;

            const planetClimate = document.createElement('span');
            planetClimate.className = 'planets-details';
            planetClimate.innerText = `Clima: ${convertPlanetClimates(responseJson.climate)}`;

            const planetTerrain = document.createElement('span');
            planetTerrain.className = 'planets-details';
            planetTerrain.innerText = `Terreno: ${convertPlanetsTerrains(responseJson.terrain)}`;

            const planetPopulation = document.createElement('span');
            planetPopulation.className = 'planets-details';
            planetPopulation.innerText = `População: ${convertPopulation(responseJson.population)}`;

            modalContent.appendChild(planetImage);
            modalContent.appendChild(planetName);
            modalContent.appendChild(planetDiameter);
            modalContent.appendChild(planetClimate);
            modalContent.appendChild(planetTerrain);
            modalContent.appendChild(planetPopulation);
            
            loadModal.style.visibility = 'hidden'
        } catch (error) {
            console.log('Erro ao carregar infomações de planetas no modal', error)
            alert('Erro ao carregar informações no modal')
        }
    })
})

function closeModal(){
    const modal = document.getElementById('modal');
    modal.classList.remove("active")
}

window.addEventListener('click', (event) => {
    const modal = document.getElementById('modal')
    const xModalMobile = document.getElementById("x-modal-mobile")
    if(event.target === modal || event.target === xModalMobile){
        closeModal();
    }
})

function convertPlanetClimates(climates){
    const climas = {
      arid: "seco",
      temperate: "moderado",
      tropical: "tropical",
      frozen: "gelado",
      murky: "sombrio",
      windy: "ventoso",
      hot: "quente",
      frigid: "congelado",
      humid: "úmido",
      moist: "chuvoso",
      polluted: "poluído",
      superheated: "superaquecido",
      subartic: "subártico",
      rocky: "rochoso",
      "artificial temperate": "moderado artificial",
      unknown: "desconhecido",
    }
    const climatesArray = climates.split(', ');
    const convertedClimatesArray = climatesArray.map(climates => climas[climates] || climates);
    const convertedClimatesString = convertedClimatesArray.join(', ');
    return convertedClimatesString;
}

function convertPlanetsTerrains(terrain){
    const terrenos = {
        desert: 'deserto',
        deserts: 'desertos',
        grasslands: 'campos',
        mountains: 'montanhas',
        mountain: 'montanhoso',
        jungle: 'selvagem',
        rainforests: 'florestas tropicais',
        tundra: 'tundras',
        'ice caves': 'cavernas de gelo',
        'mountain ranges': 'cordilheiras',
        swamp: 'pantanal',
        jungles: 'selvas',
        'gas giant': 'gigante gasoso',
        forest: 'florestas',
        lakes: 'lagos',
        'grassy hills': 'colinas relvadas',
        swamps: 'pântanos',
        cityscape: 'paisagem urbana',
        ocean: 'oceânico',
        oceans: 'oceanos',
        rock: 'rochoso',
        barren: 'árido',
        scrublands: 'matagais',
        savanna: 'savana',
        canyons: 'cânions',
        sinkholes: 'buracos',
        volcanoes: 'vulcões',
        'lava rivers': 'rios de lava',
        caves: 'cavernas',
        rivers: 'rios',
        'airless asteroid': 'asteroide sem ar',
        glaciers: 'geleiras',
        'ice canyons': 'cânions de gelo',
        'fungus forests': 'florestas de fungos',
        fields: 'terrenos',
        'rock arches': 'arcos rochosos',
        grass: 'gramados',
        plains: 'planícies',
        urban: 'urbano',
        hills: 'colinas',
        bogs: 'brejos',
        savannas: 'savanas',
        'rocky islands': 'ilhas rochosas',
        seas: 'mares',
        reefs: 'recifes',
        islands: 'ilhas',
        'rocky deserts': 'desertos rochosos',
        valleys: 'vales',
        ash: 'cinzas',
        'toxic cloudsea': 'mar de nuvens tóxicas',
        plateaus: 'planaltos',
        verdant: 'verdejante',
        'acid pools': 'piscinas ácidas',
        'rocky canyons': 'cânions rochosos',
        rocky: 'rochoso',
        vines: 'vinhedos',
        cities: 'cidades',
        savannahs: 'savanas',
        cliffs: 'penhascos',
        forests: 'florestas',
        unknown: 'desconheido'
    }

    const TerrainsArray = terrain.split(', ');
    const convertedTerrainString = TerrainsArray.map(terrain => terrenos[terrain] || terrain);
    const convertedTerraingArray = convertedTerrainString.join(', ');
    return convertedTerraingArray;
}

function convertDiameter(diameter){
    return diameter === '0' ? '0' : diameter === 'unknown' ? 'desconhecido' : `${diameter} Km`
}

function convertPopulation(population){
    return population === 'unknown' ? 'desconheido' : population
}

function convertName(name){
    return name === 'unknown' ? 'Desconhecido' : name
}
