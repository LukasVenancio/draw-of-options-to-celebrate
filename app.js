"use strict";

let isShowingContainer = "initial-buttons";

const options = [
  "Hopi Hari",
  "Outback",
  "Restaurante do Tamboré",
  "Restaurante de comida japonesa",
  "Boliche",
  "Churrascaria",
  "Parque Aquático",
  "Lamen",
  "Taverna Medieval",
  "Passeio de Balão",
  "Holambra",
  "Campos do Jordão",
];

const initialButtonsContainer = document.getElementById("initial-buttons");
const displayOptionsContainer = document.getElementById("display-options");
const drawOptionsContainer = document.getElementById("draw-container");

const showOptionsButton = document.getElementById("show-options-button");

const registredOptionsList = document.getElementById("registred-options-list");

const addOptionButton = document.getElementById("add-new-option-button");
const goBackButtonFromOptions = document.getElementById(
  "go-back-button-from-options"
);

const drawOptionsButton = document.getElementById("draw-options-button");
const countDownNumber = document.getElementById("countdown-number");
const resultContainer = document.getElementById("result-container");
const result = document.getElementById("result");
const drawAgainButton = document.getElementById("draw-again-button");
const goBackButtonFromDraw = document.getElementById(
  "go-back-button-from-draw"
);

const changeContainer = (containerToShow, containerToHidden) => {
  containerToHidden.removeAttribute("class");
  containerToHidden.setAttribute("class", "hidden");

  containerToShow.removeAttribute("class");
  containerToShow.setAttribute("class", containerToShow.id);
  isShowingContainer = containerToShow.id;
};

const getOneOptionElement = (option) => {
  const elementOption = document.createElement("li");
  elementOption.textContent = option;
  return elementOption;
};

const getOptions = () => {
  options.sort();
  const listElementOptions = options.map((value) => {
    const element = getOneOptionElement(value);
    return element;
  });

  registredOptionsList.replaceChildren(...listElementOptions);
};

const addOption = () => {
  const addOptionInput = document.getElementById("add-new-option-input");
  options.push(addOptionInput.value);
  addOptionInput.value = "";
  getOptions();
};

const draw = () => {
  const random = Math.floor(Math.random() * (options.length - 1 - 0 + 1)) + 0;
  result.textContent = options[random];
};

const countDownNumbers = () => {
  let count = 10;

  const delay = setInterval(() => {
    if (count >= 0) countDownNumber.textContent = "..." + count;
    else {
      clearInterval(delay);
      changeContainer(resultContainer, countDownNumber);
      draw();
    }

    count--;
  }, 700);
};

showOptionsButton.addEventListener("click", () =>
  changeContainer(displayOptionsContainer, initialButtonsContainer)
);
goBackButtonFromOptions.addEventListener("click", () =>
  changeContainer(initialButtonsContainer, displayOptionsContainer)
);
goBackButtonFromDraw.addEventListener("click", () => {
  changeContainer(initialButtonsContainer, drawOptionsContainer)
  changeContainer(countDownNumber, resultContainer);
}
);
drawOptionsButton.addEventListener("click", () => {
  changeContainer(drawOptionsContainer, initialButtonsContainer);
  countDownNumbers();
});
drawAgainButton.addEventListener("click", () => {
  changeContainer(countDownNumber, resultContainer);
  countDownNumbers();
});

addOptionButton.addEventListener("click", addOption);

getOptions();
