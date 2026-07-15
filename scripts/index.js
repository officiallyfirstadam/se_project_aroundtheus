const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },  
];

console.log(initialCards);

// Elements
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");



const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// NEW: Add card modal elements
const addCardButton = document.querySelector("#add-card-button");
const addCardModal = document.querySelector("#add-card-modal");
const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#card-url-input");
const addCardForm = addCardModal ? addCardModal.querySelector(".modal__form") : null;

// Functions
function onEscKey(e) {
  if (e.key === "Escape") {
    const opened = document.querySelector(".modal_opened");
    if (opened) closePopup(opened);
  }
}

function openPopup(modal) {
  if (!modal) return;
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", onEscKey);
}

function closePopup(modal) {
  if (!modal) return;
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", onEscKey);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTextEl = cardElement.querySelector(".card__text");
  
  cardTextEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardImageEl.loading = "lazy";
  
  // ADD THIS: Delete button listener for each individual card
  const deleteButton = cardElement.querySelector(".card__delete");
  deleteButton.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent card click event
    cardElement.remove(); // Delete only THIS card
  });
  
  return cardElement;
}
// Event Handlers
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

// NEW: Add card form handler
function handleAddCardSubmit(e) {
  e.preventDefault();
  
  const newCard = {
    name: cardTitleInput.value,
    link: cardUrlInput.value
  };
  
  cardListEl.prepend(getCardElement(newCard));
  
  addCardForm.reset();
  closePopup(addCardModal);
}

// Event Listeners
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

const profileCloseButton = document.querySelector("#profile-close-button");
if (profileCloseButton) profileCloseButton.addEventListener("click", () => closePopup(profileEditModal));

// NEW: Add card modal event listener to open it
if (addCardButton) {
  addCardButton.addEventListener("click", () => {
    openPopup(addCardModal);
  });
}

const addCardCloseButton = document.querySelector("#add-card-close-button");
if (addCardCloseButton) {
  addCardCloseButton.addEventListener("click", () => closePopup(addCardModal));
}

// Close popup when clicking on overlay (modal root element)
document.addEventListener("click", (e) => {
  const modal = e.target.closest(".modal_opened");
  if (modal && e.target === modal) closePopup(modal);
});


if (profileEditForm) profileEditForm.addEventListener("submit", handleProfileEditSubmit);
if (addCardForm) addCardForm.addEventListener("submit", handleAddCardSubmit);

// Render cards efficiently using a DocumentFragment to minimize reflows
function renderCards(cards) {
  if (!cardListEl) return;
  const fragment = document.createDocumentFragment();
  cards.forEach((cardData) => {
    fragment.appendChild(getCardElement(cardData));
  });
  cardListEl.appendChild(fragment);
}

renderCards(initialCards);




cardListEl.addEventListener("click", function (e) {
  if (e.target.closest(".card__like")) {
    const likeBtn = e.target.closest(".card__like");
    likeBtn.classList.toggle("card__like_active");
  }
});


