let contentPageUrl = 'https://swapi.dev/api/starships/'

window.onload = async () => {
    try {
        await loadStarshipsDetails(contentPageUrl)
    } catch (error) {
        console.log('erro ao carregar dados da API', error)
    }
}

async function loadStarshipsDetails(){
   const cards = document.querySelectorAll('.swiper-slide.card')
   const allPromises = []
   
   try {
       while(contentPageUrl){
        const response = await fetch(contentPageUrl)
        const responseJson = await response.json()

        responseJson.results.forEach(starship => {
            allPromises.push(starship.name)
        });

        contentPageUrl = responseJson.next
    }

    const resolvedAllPromises = await Promise.all(allPromises);

    cards.forEach((card, index) => {
        const starshipNameElement = card.querySelector('.starships-name')
        const starshipName = resolvedAllPromises[index] === 'unknown' ? 'Desconheido' : resolvedAllPromises[index]
        starshipNameElement.textContent = starshipName
    })
   } catch (error) {
        console.log('Erro ao obter dados da API', error)
   }
}

document.querySelectorAll('.swiper-slide.card').forEach((card) => {
    card.addEventListener('click', async () => {
        const modal = document.getElementById('modal')
        modal.classList.add('active')

        const loadModalDetails = document.getElementById('loading')
        loadModalDetails.style.visibility = 'visible'

        const modalContent = document.getElementById('modal-content')
        modalContent.innerHTML = ''

        try {
            const starshipId = card.getAttribute('data-starship-id')

            const response = await fetch(`https://swapi.dev/api/starships/${starshipId}`)
            const responseJson = await response.json()

            const imageStarshipUrl = card.getAttribute('data-image-url')

            const starshipImage = document.createElement('div')
            starshipImage.style.backgroundImage = `url(${imageStarshipUrl})`
            starshipImage.className = 'starship-image'

            const starshipName = document.createElement('span')
            starshipName.className = 'starships-details'
            starshipName.innerText = `Nome: ${responseJson.name}`

            const starshipModel = document.createElement('span')
            starshipModel.className = 'starships-details'
            starshipModel.innerText = `Modelo: ${convertModel(responseJson.model)}`

            const starshipFacturer = document.createElement('span')
            starshipFacturer.className = 'starships-details'
            starshipFacturer.innerText = `Fabricante: ${convertedStarhipsFacturer(responseJson.manufacturer)}`

            const starshipPassengers = document.createElement('span')
            starshipPassengers.className = 'starships-details'
            starshipPassengers.innerText = `Passageiros: ${convertPassengers(responseJson.passengers)}`

            const starshipClass = document.createElement('span')
            starshipClass.className = 'starships-details'
            starshipClass.innerText = `Classe: ${convertedStarshipClass(responseJson.starship_class)}`

            modalContent.appendChild(starshipImage)
            modalContent.appendChild(starshipName)
            modalContent.appendChild(starshipModel)
            modalContent.appendChild(starshipFacturer)
            modalContent.appendChild(starshipPassengers)
            modalContent.appendChild(starshipClass)

            loadModalDetails.style.visibility = 'hidden'
        } catch (error) {
            console.log('Erro ao carregar informações da API no modal')
        }
    })
})

function closeModal(){
    const modal = document.getElementById('modal')
    modal.classList.remove('active')
}

window.addEventListener('click', (event) => {
    const modal = document.getElementById('modal')
    const xModalMobile = document.getElementById("x-modal-mobile")
    if(event.target === modal || event.target === xModalMobile){
        closeModal()
    }
})

function convertedStarshipClass(classes){
    const classNames = {
        'Star Destroyer': 'destruidor estelar',
        'star destroyer': 'destruidor estelar',
        'landing craft': 'embarcação de desembarque',
        'Deep Space Mobile Battlestation': 'estação de batalha móvel do espaço profundo',
        'Light freighter': 'cargueiro leve',
        'assault starfighter': 'caça estelar de assalto',
        Starfighter: 'caça estelar',
        starfighter: 'caça estelar',
        'Star dreadnought': 'estrela navio de guerra',
        'Medium transport': 'transporte médio',
        'Patrol craft': 'embarcação de patrulha',
        'Armed government transport': 'transporte governamental armado',
        'Escort ship': 'navio de escolta',
        'Star Cruiser': 'cruzado estelar',
        'Space cruiser': 'cruzador espacial',
        'Droid control ship': 'nave de controle andróide',
        acht: 'iate',
        'Space Transport': 'transporte espacial',
        'Diplomatic barge': 'barcaça diplomática',
        freighter: 'cargueiro',
        'assault ship': 'navio de assalto',
        'capital ship': 'navio capital',
        transport: 'transporte',
        cruiser: 'cruzador',
        unknown: 'desconhecido'
    }

    const classArray = classes.split(', ')
    const convertedClassArray = classArray.map(classes => classNames[classes] || classes)
    const convertedStringClass = convertedClassArray.join(', ')
    return convertedStringClass
}

function convertedStarhipsFacturer(facturer){

    const facturerNames = {
      "Corellian Engineering Corporation":
        "Corporação de Engenharia Corelliana",
      "Kuat Drive Yards": "Estaleiros Kuat Drive",
      "Sienar Fleet Systems": "Sistemas de Frota Sienar",
      "Cyngus Spaceworks": "Oficinas Espaciais Cyngus7",
      "Imperial Department of Military Research":
        "Departamento de Pesquisa Militar",
      "Koensayr Manufacturing": "Fabricação Koensayr",
      "Incom Corporation": "Corporação Incom",
      "Fondor Shipyards": "Estaleiros de Fondor",
      "Gallofree Yards": "Estaleiros Gallofree",
      "Kuat Systems Engineering": "Engenharia de Sistemas Kuat",
      "Mon Calamari shipyards": "Estaleiros Mon Calamari",
      "Alliance Underground Engineering": "Engenharia Subterrânea da Aliança",
      "Hoersch-Kessel Drive": "Propulsão Hoersch-Kessel",
      "Theed Palace Space Vessel Engineering Corps":
        "Corpo de Engenharia de Naves Espaciais do Palácio de Theed",
      "Nubia Star Drives": "Propulsão Estelar Nubia",
      "Republic Sienar Systems": "Sistemas Republic Sienar",
      "Botajef Shipyards": "Estaleiros Botajef",
      "Rothana Heavy Engineering": "Engenharia Pesada Rothana",
      "Huppla Pasa Tisc Shipwrights Collective":
        "Coletivo de Construtores de Naves Huppla Pasa Tisc",
      "Rendili StarDrive": "Propulsão Estelar Rendili",
      "Free Dac Volunteers Engineering corps":
        "Corpo de Engenharia dos Voluntários Livres de Dac",
      "Cygnus Spaceworks": "Oficinas Espaciais Cygnus",
      "Allanteen Six shipyards": "Estaleiros Allanteen Six",
      "Theed Palace Space Vessel Engineering Corps/Nubia Star Drives":
        "Corpo de Engenheiros de Naves Espaciais do Palácio de Theed/Propulsão Estelar Nubia",
      Incorporated: "Incorporada",
      "Subpro Corporation": "Corporação Subpro",
      "Gwori Revolutionary Industries": "Indústrias Revolucionárias Gwori",
      "Feethan Ottraw Scalable Assemblies":
        "Montagens Escaláveis Feethan Ottraw",
        unknown: 'Desconhecido'
    }

    const facturerArray = facturer.split(', ')
    const convertedFacturerArray = facturerArray.map(facturer => facturerNames[facturer] || facturer)
    const convertedFacturerString = convertedFacturerArray.join(', ')
    return convertedFacturerString;
}

function convertPassengers (passengers){
    return passengers === 'unknown' ? 'desconhecido' : passengers
}

function convertModel(model){
    return model === 'unknown' ? 'desconhecido' : model
}

