

//edit profile
const editProfileModal = document.querySelector('.modal_type_edit-profile')

const editButton = document.querySelector('.profile__edit-button'); 
const editCloseButton = document.querySelector('.modal__close-btn_type_edit-profile'); 
const editForm = editProfileModal.querySelector('.modal__form'); 
const inputName = document.querySelector('.modal__input_name'); 
const inputDesc = document.querySelector('.modal__input_desc'); 
 
const profileName = document.querySelector('.profile__text_name'); 
const profileDesc = document.querySelector('.profile__text_desc'); 

//add image 
const addImageButton = document.querySelector('.profile__add-button');

const addImageModal = document.querySelector('.modal_type_add-image');

const addImageForm = addImageModal.querySelector('.modal__form');
const closeAddImage = addImageModal.querySelector('.modal__close-btn_type_add-image');
const addImageTitle = addImageModal.querySelector('.modal__input_image-name');
const addImageUrl = addImageModal.querySelector('.modal__input_url');

//image enlarged
const imageModal = document.querySelector('.modal_type_image');
const closeImageModal = imageModal.querySelector('.modal__close-btn_type_image');
const modalImg = document.getElementById("img-large");
const imageModalEnlarge = imageModal.querySelector('.modal__large-image');
const imageModalCaption = imageModal.querySelector('.modal__caption');


//new images template
const cardTemplate = document.querySelector('.card-template').content.querySelector('.elements__item');

//opened window
const modalOpen = document.querySelector('.modal_is-open');

//like button
//list of originl images
const list = document.querySelector('.elements__list');

//original images 
const initialCards = [
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
},
{
    name: "Vanois National Park",
    link: "https://code.s3.yandex.net/web-code/vanois.jpg"
},
{
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
},
{
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
},
{
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
},
{
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
}
];

//opening and closing windows
//
//temp variable for indicating if a certain modal is opened
let currentOpenedModal = null;

//close or open a modal
function toggleModalWindow(evt) {
  const isModalOpened = evt.classList.contains('modal_is-open');
  //open or close modal
   evt.classList.toggle('modal_is-open');
  //the current state of the modal is opened or closed
  currentOpenedModal = evt;
  //take off the listeners if the window is opened
  if (isModalOpened) {
    //listener of closing window when clicked outside of it
    evt.removeEventListener('click', (evt) => {
      if (evt.target.classList.contains('modal__close-btn') ||
      evt.target.classList.contains('modal')) {
        toggleModalWindow(currentOpenedModal);
      }
    });
    //listener of closing window by pressing esc
    document.removeEventListener('keydown', (evt) => {
        const hasOpenModal = Boolean(
          document.querySelectorAll(".modal_is-open").length
        );
        const openedModal = document.querySelector(".modal_is-open");
        // const isModalOpened = event.classList.contains('modal_is-open');
      
        if (evt.code === "Escape" && hasOpenModal) {
          openedModal.classList.remove('modal_is-open');
       
        }
    })
  }
  //add listeners when window is closed
  else {
    
    //listener of closing window when clicked outside of it
    evt.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('modal__close-btn') ||
      evt.target.classList.contains('modal')) {
        toggleModalWindow(currentOpenedModal);
      }
    });
    //listener of closing window by pressing esc
    document.addEventListener('keydown', (evt) => {
      console.log('window is closed');

      const hasOpenModal = Boolean(
        document.querySelectorAll(".modal_is-open").length
      );
      const openedModal = document.querySelector(".modal_is-open");
    
      if (evt.code === "Escape" && hasOpenModal) {
        openedModal.classList.remove('modal_is-open');
     
      }
    })
  }
}

//open add image modal by clicking the button
addImageButton.addEventListener('click', () => {
  toggleModalWindow(addImageModal);
});

//open edit profile by clicking on the button
editButton.addEventListener('click', () => {
  toggleModalWindow(editProfileModal);
});


//handling forms and images
//
//handle edit profile form
const formSubmitHandler = (e) => {
    e.preventDefault(); 
    profileName.textContent = inputName.value; 
    profileDesc.textContent = inputDesc.value; 
    toggleModalWindow(editProfileModal);
} 
//submit edit profile form
editForm.addEventListener('submit', formSubmitHandler);


//go through images list and create the cards from the list
function renderImage(data) {
  list.prepend(createCard(data));
}
initialCards.forEach((data) => {
  renderImage(data)
})

//create a new card
function createCard(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.elements__image');
  const cardTitle = cardElement.querySelector('.elements__title');
  const clickLike = cardElement.querySelector('.elements__heart');
  const deleteCardButton = cardElement.querySelector('.elements__delete');

  // receive image name and image url for the card
  cardTitle.textContent = data.name;
  cardImage.style.backgroundImage = `url(${data.link})`;
  //like button

  clickLike.addEventListener("click", function(e){
    e.target.classList.toggle("elements__heart-active");
  });
    //delete image

  deleteCardButton.addEventListener('click', (e) => {
    cardElement.remove();
    //once clicked "delete" dont go over the entire function for the clicked card
    e.stopPropagation();
    });
  //Enlarging image
  cardImage.addEventListener('click', () => {
    //enlarging the chosen url
    imageModalEnlarge.setAttribute('src', data.link);
    //caption of the chosen link name
    imageModalCaption.textContent = data.name;
    imageModalEnlarge.setAttribute('alt', data.name)
    //enlarging the image once clicked on
    toggleModalWindow(imageModal);
  })

  return cardElement;
}

//new image handler 

const addImageHandler = (e) => {
  e.preventDefault();
  const cardElement = createCard({
    name: addImageTitle.value, link: addImageUrl.value
  });
  //insert into the images list
  list.prepend(cardElement);
  //close the modal window once clicked "submit"
  toggleModalWindow(addImageModal);
};
//add new image once pressed 'submit'
addImageForm.addEventListener('submit', addImageHandler);



