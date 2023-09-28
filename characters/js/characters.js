// URL/EndPoint da API que contém os personagens(characters)
let contentPageUrl = "https://swapi.dev/api/people/"

window.onload = async () => {

  try {
    await loadCharacters(contentPageUrl)
  } catch (error) {
    console.log(error)
    alert("Erro ao carregar cards")
  }

  const nextButton = document.getElementById("next-btn")
  const backButton = document.getElementById("back-btn")
  const loadMessage = document.getElementById("loading-message")

  nextButton.addEventListener("click", async () => {

    if (!nextButton.disabled) {
      loadMessage.style.visibility = "visible"
      try {
        await loadCharacters(nextButton.getAttribute("data-url"))
        loadMessage.style.visibility = "hidden"
      } catch (error) {
        console.log(error)
        alert("Erro ao carregar a próxima página")
      }
    }
  })

  backButton.addEventListener("click", async () => {

    if (!backButton.disabled) {
      loadMessage.style.visibility = "visible"
      try {
        await loadCharacters(backButton.getAttribute("data-url"))
        loadMessage.style.visibility = "hidden"
      } catch (error) {
        console.log(error)
        alert("Erro ao carregar a página anterior")
      }
    }
  })
}

const nextButton = document.getElementById("next-btn")
const backButton = document.getElementById("back-btn")

async function loadCharacters(url) {
  const mainContent = document.getElementById("main-content")
  const loadMessage = document.getElementById("loading-message")
  loadMessage.style.visibility = "visible"

  mainContent.innerHTML = ""

  try {
    const response = await fetch(url)
    const responseJson = await response.json()

    responseJson.results.forEach((character) => {
      const card = document.createElement("div")
      card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g,"")}.jpg')`

      card.className = "cards"

      const characterNameBg = document.createElement("div")
      characterNameBg.className = "character-name-bg"

      const characterName = document.createElement("span")
      characterName.className = "character-name"
      characterName.innerText = `${character.name}`

      characterNameBg.appendChild(characterName)
      card.appendChild(characterNameBg)

      loadMessage.style.visibility = "hidden"

      card.onclick = () => {
        const modal = document.getElementById("modal")
        modal.classList.add("active")

        const modalContent = document.getElementById("modal-content")
        modalContent.innerHTML = ""

        const characterImage = document.createElement("div")
        characterImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g,"")}.jpg')`

        characterImage.className = "character-image"

        const name = document.createElement("span")
        name.className = "character-details"
        name.innerText = `Nome: ${character.name}`

        const height = document.createElement("span")
        height.className = "character-details"
        height.innerText = `Altura: ${convertHeight(character.height)}`

        const mass = document.createElement("span")
        mass.className = "character-details"
        mass.innerText = `Peso: ${convertMass(character.mass)}`

        const eyeColor = document.createElement("span")
        eyeColor.className = "character-details"
        eyeColor.innerText = `Cor dos olhos: ${convertEyeColor(character.eye_color)}`

        const birthYear = document.createElement("span")
        birthYear.className = "character-details"
        birthYear.innerText = `Nascimento: ${convertBirthYear(character.birth_year)}`

        modalContent.appendChild(characterImage);
        modalContent.appendChild(name);
        modalContent.appendChild(height);
        modalContent.appendChild(mass);
        modalContent.appendChild(eyeColor);
        modalContent.appendChild(birthYear);
      }

      mainContent.appendChild(card);
    })

    nextButton.disabled = !responseJson.next;
    nextButton.setAttribute("data-url", responseJson.next);
    nextButton.style.visibility = responseJson.next ? "visible": "hidden";
    console.log(nextButton);

    backButton.disabled = !responseJson.previous;
    backButton.setAttribute("data-url", responseJson.previous);
    backButton.style.visibility = responseJson.previous ? "visible" : "hidden";
    console.log(backButton);

    contentPageUrl = url

  } catch (error) {
    console.log(error)
    alert("Erro ao carregar os personagens")
  }
}

function hideModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("active");
}

window.addEventListener("click", (event) => {

  const modal = document.getElementById("modal");
  const xModalMobile = document.getElementById("x-modal-mobile");

  if (event.target === modal || event.target === xModalMobile) {
    hideModal();
  }
})

async function loadNextPage() {

  if (!contentPageUrl) return

  try {
    const response = await fetch(contentPageUrl);
    const responseJson = await response.json();

    await loadCharacters(responseJson.next);
  } catch (error) {
    console.log(error);
    alert("Erro ao carregar a próxima página");
  }
}

async function loadPreviousPage() {

  if (!contentPageUrl) return
  try {
    const response = await fetch(contentPageUrl)
    const responseJson = await response.json()

    await loadCharacters(responseJson.previous)
  } catch (error) {
    console.log(error)
    alert("Erro ao carregar a página anterior")
  }
}

function convertEyeColor(eyeColor) {
  const cores = {
    blue: "azul",
    brown: "castanho",
    green: "verde",
    yellow: "amarelo",
    black: "preto",
    pink: "rosa",
    red: "vermelho",
    orange: "laranja",
    hazel: "avelã",
    unknown: "desconhecida",
  }

  return cores[eyeColor]
}

function convertHeight(height) {
  if (height === "unknown") {
    return "Desconhecida"
  }
  return (height / 100).toFixed(2)
}

function convertMass(mass) {
  if (mass === "unknown") {
    return "Desconhecido"
  }
  return `${mass} kg`
}

function convertBirthYear(birthYear) {
  if (birthYear === "unknown") {
    return "Desconhecido"
  }
  return birthYear
}
