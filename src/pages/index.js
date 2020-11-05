import  "../pages/index.css"; 
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';


const defaultConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
}
const addCardForm = document.querySelector('.modal__form_type_add-image');
const addFormValidator = new FormValidator(defaultConfig, addCardForm);


//edit profile
const editProfileModal = document.querySelector('.modal_type_edit-profile')
const editProfileForm = editProfileModal.querySelector('.modal__form')
const editFormValidator = new FormValidator(defaultConfig, editProfileForm);
const editButton = document.querySelector('.profile__edit-button'); 
const inputName = document.querySelector('.modal__input_name'); 
const inputDesc = document.querySelector('.modal__input_desc'); 
const profileName = document.querySelector('.profile__text_name'); 
const profileDesc = document.querySelector('.profile__text_desc'); 

//add image 
const addImageButton = document.querySelector('.profile__add-button');
const addImageModal = document.querySelector('.modal_type_add-image');

//enlarged image 
const imageModal = document.querySelector('.modal_type_image'); 
const enlargedImage =  imageModal.querySelector('.modal__large-image');
//imageModalEnlarge.src = this._data.link;

//list of originl images
const list = document.querySelector('.elements__list');

//original images 
const initialCards = [
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
},
{
    name: "Vanois National Park",
    link: "https://code.s3.yandex.net/web-code/vanois.jpg",
},
{
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
},
{
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
},
{
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
},
{
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
}
];
//validation

editFormValidator.enableValidation();
addFormValidator.enableValidation();


//instance of card
const cardAdded = (data) =>{

  
  const cardInstance = new Card({data, handleCardClick: ({name, link}) => {
    imagePopup.open(link, name)}}, '.card-template')
    const cardElement = cardInstance.createCard();
    //insert into the images list
    defaultList.addItem(cardElement);
}

//popup of image
const imagePopup = new PopupWithImage(imageModal);
imagePopup.setEventListeners();
//add form
/*const newCardPopup = new PopupWithForm({
  popupSelector:addImageModal,
  popupSubmition: (data) => 
    api.addCard(data)
    .then(res => {
      const cardInstance = new Card({data, handleCardClick: ({name, link}) => {
        imagePopup.open(link, name)}}, '.card-template')
        const cardElement = cardInstance.createCard();
        //insert into the images list
        defaultList.addItem(cardElement)
    })
})*/

//close form 
/*const closeForm = new PopupWithForm({
  popupSelector: document.querySelector('.modal__close-btn')
});*/
const profileInfo = new UserInfo(profileName, profileDesc);

const profileForm = new PopupWithForm(
  {popupSelector: editProfileModal, 
    popupSubmition: () => profileInfo.setUserInfo(inputName.value, inputDesc.value)})

//card list

/*const defaultList = new Section({
  items: initialCards,
  renderer: (data) => cardAdded(data)},'.elements__list');
// card list handler renders elements items
defaultList.renderItems();*/

//open add image form 




//open edit info form
editButton.addEventListener('click', () => {
  const user = profileInfo.getUserInfo();
  profileName.value = user.title; 
  profileDesc.value = user.desc; 
  profileForm.open();
})

//edit info  handler
profileForm.setEventListeners();

//api instance
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-5",
  headers: {
    authorization: "8e18e1ba-d6e7-4a4b-a525-0db2d13feedb",
    "Content-Type": "application/json"
  }
}); 

api.getCardList().then((res)=>{console.log(res)})
.then(function(res) {
  const defaultList = new Section({
    items: res,
    renderer: (data) => cardAdded(data)},'.elements__list');
    defaultList.renderItems(); 
  // card list handler renders elements items
  const newCardPopup = new PopupWithForm({
    popupSelector:addImageModal,
    popupSubmition: (data) => 
      api.addCard(data)
      .then(res => {
        const cardInstance = new Card({data, 
          handleCardClick: ({name, link}) => {
          imagePopup.open(link, name)}, 
          handleDeleteClick: (cardId) => {
            api.removeCard(cardId)
          }}, '.card-template')
          const cardElement = cardInstance.createCard();
          //insert into the images list
          defaultList.addItem(cardElement)
      })
  })
  addImageButton.addEventListener("click", () => {
    newCardPopup.open();
  });
  //add image handler
  newCardPopup.setEventListeners();
})

api.getUserInfo().then(res => {
  console.log(res);
  profileInfo.setUserInfo({profileName: res.title, profileDesc: res.desc})
})

export { profileName, profileDesc, imageModal, enlargedImage }