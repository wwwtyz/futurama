let url = "https://api.sampleapis.com/futurama/characters";

// Добавить тег с классом и внутренним текстом
function getNewTag(tagName, className, text) {
  let newTag = document.createElement(tagName);
  className ? newTag.classList.add(className) : null;
  text ? (newTag.innerText = text) : null;
  return newTag;
}

// Вложить теги parent<child<child
function appendTag(...arg) {
  for (let i = 0; i < arg.length - 1; i++) {
    arg[i].append(arg[i + 1]);
  }
}

//загрузка данныч
let characters = [];
fetch(url)
  .then((response) => response.json()) // преобразование в JS
  .then((data) => {
    //получение массива данных
    characters = data;
    cardCreate(characters); //
  });

function randomSay(arr) {
  //случайная фраза
  if (arr.length > 1) {
    let n = Math.round(Math.random() * arr.length);
    return arr[n];
  } else {
    return arr[0];
  }
}

function tellMeSmthng({ target }) {
  // смена фразы при нажатии
  if (target.tagName === "BUTTON") {
    let dataID = target.getAttribute("data-id");
    let text = document.getElementById(dataID);
    console.log(characters[dataID - 1].sayings);
    console.log(dataID);
    text.innerText = randomSay(characters[dataID - 1].sayings);
  }
}

let container = document.querySelector(".row");
container.classList.add("m-3");
container.addEventListener("click", tellMeSmthng); // прослушка на смену фразы

//создание карточек
function cardCreate(arr) {
  container.innerHTML = "";
  arr.forEach((e) => {
    let card = getNewTag("div", "card");
    card.classList.add("col-4");
    let cardBody = getNewTag("div", "card-body");

    let name = getNewTag(
      "h5",
      "card-title",
      `${e.name.first} ${e.name.middle} ${e.name.last} `
    );
    name.classList.add("text-center");
    let age = getNewTag("p", "card-text", `Age: ${e.age}`);
    let gender = getNewTag("p", "card-text", `Gender: ${e.gender}`);
    let species = getNewTag("p", "card-text", `Species: ${e.species}`);
    let homePlanet = getNewTag(
      "p",
      "card-text",
      `Home Planet: ${e.homePlanet || "Unknown"}`
    );
    let occupation = getNewTag("p", "card-text", `Occupation: ${e.occupation}`);

    let cardPerson = getNewTag("div", "row");
    cardPerson.classList.add("p-2");
    let cardBubble = getNewTag("div", "talkbubble");
    cardBubble.classList.add("tri-right");
    cardBubble.classList.add("left-top");
    let bubbleBoxText = getNewTag("div", "talktext");
    let bubbleText = getNewTag("p", "", `${randomSay(e.sayings)}`);
    bubbleText.setAttribute("id", `${e.id}`);

    let avatar = getNewTag("img", "align-self-start");
    avatar.setAttribute("src", `${e.images.main}`);
    avatar.setAttribute("alt", `${e.name.first}`);

    let sayBtn = getNewTag("button", "btn", "Tell me something");
    sayBtn.classList.add("btn-primary");
    sayBtn.classList.add("bg-aqua");
    sayBtn.setAttribute("data-id", `${e.id}`);

    appendTag(container, card, name);
    appendTag(card, cardPerson, avatar);
    appendTag(cardPerson, cardBubble, bubbleBoxText, bubbleText);
    appendTag(card, cardBody, age);
    appendTag(cardBody, gender);
    appendTag(cardBody, species);
    appendTag(cardBody, homePlanet);
    appendTag(cardBody, occupation);
    appendTag(cardBody, sayBtn);
  });
}
