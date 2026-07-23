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

// Image preview modal elements
const previewModal = document.querySelector("#preview-modal");
const previewImage = previewModal ? previewModal.querySelector(".modal__preview-image") : null;
const previewCaption = previewModal ? previewModal.querySelector(".modal__preview-caption") : null;

// Avatar edit modal elements
const avatarEditButton = document.querySelector("#profile-avatar-edit-button");
const avatarEditModal = document.querySelector("#avatar-edit-modal");
const avatarUrlInput = document.querySelector("#avatar-url-input");
const avatarEditForm = avatarEditModal ? avatarEditModal.querySelector(".modal__form") : null;
const profileImage = document.querySelector(".profile__image");

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
  
  // Like button listener for each individual card
  const likeButton = cardElement.querySelector(".card__like");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like_active");
  });
  
  // Delete button listener for each individual card
  const deleteButton = cardElement.querySelector(".card__delete");
  deleteButton.addEventListener("click", (e) => {
    e.stopPropagation();
    cardElement.remove();
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

// Avatar edit form handler
function handleAvatarEditSubmit(e) {
  e.preventDefault();
  const newAvatarUrl = avatarUrlInput.value;
  if (newAvatarUrl) {
    profileImage.src = newAvatarUrl;
    profileImage.alt = "Avatar";
  }
  avatarEditForm.reset();
  closePopup(avatarEditModal);
}

// Event Listeners
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

// NEW: Add card modal event listener to open it
if (addCardButton) {
  addCardButton.addEventListener("click", () => {
    openPopup(addCardModal);
  });
}

// Avatar edit modal event listeners
if (avatarEditButton) {
  avatarEditButton.addEventListener("click", () => {
    openPopup(avatarEditModal);
  });
}

// Close popup when clicking on overlay (modal root element)
const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("mousedown", (e) => {
    if (e.target === modal) {
      closePopup(modal);
    }
  });
});


if (profileEditForm) profileEditForm.addEventListener("submit", handleProfileEditSubmit);
if (addCardForm) addCardForm.addEventListener("submit", handleAddCardSubmit);
if (avatarEditForm) avatarEditForm.addEventListener("submit", handleAvatarEditSubmit);

// Universal close button handler for all modals
const closeButtons = document.querySelectorAll(".modal__close");
closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closePopup(modal));
});

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

// Image preview: click on card image to open preview modal
cardListEl.addEventListener("click", function (e) {
  const cardImage = e.target.closest(".card__image");
  if (!cardImage) return;
  
  const cardEl = cardImage.closest(".card");
  const cardText = cardEl ? cardEl.querySelector(".card__text") : null;
  
  if (previewImage && previewCaption) {
    previewImage.src = cardImage.src;
    previewImage.alt = cardImage.alt;
    previewCaption.textContent = cardText ? cardText.textContent : "";
    openPopup(previewModal);
  }
});
