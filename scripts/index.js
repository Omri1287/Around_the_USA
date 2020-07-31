

//edit profile
const editProfileModal = document.querySelector('.modal_type_edit-profile')

const editButton = document.querySelector('.profile__edit-button'); 
const editCloseButton = document.querySelector('.modal__close-btn_type_edit-profile'); 
const modal = document.querySelector('.modal'); 
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
const addImageSubmit = addImageModal.querySelector('.modal__save');

//image enlarged
const imageModal = document.querySelector('.modal_type_image');
const closeImageModal = imageModal.querySelector('.modal__close-btn_type_image');
const imageModalFormer = document.querySelectorAll('.elements__image')
const imageModalEnlarge = imageModal.querySelector('.modal__large-image')
const imageModalCaption = imageModal.querySelector('.modal__caption')
//new images template
const cardTemplate = document.querySelector('.card-template').content.querySelector('.elements__item');


//like button
//list of originl images
const list = document.querySelector('.elements');

//original images (not sure why i need it)
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

//functions 
//open the modal
function toggleModalWindow(modal){ 
  modal.classList.toggle('modal_is-open'); 
} 

//open the edit profile modal
 editButton.addEventListener('click', () => {
  toggleModalWindow(editProfileModal);
})
//close the edit profile modal
editCloseButton.addEventListener('click', () => {
  toggleModalWindow(editProfileModal);
})

//open the add image modal
addImageButton.addEventListener('click', (createCard) => {
  toggleModalWindow(addImageModal);
})
//close the add image modal
closeAddImage.addEventListener('click', () => {
  toggleModalWindow(addImageModal);
})
//enlarge image
imageModal.addEventListener('click', () => {
  toggleModalWindow(imageModal);
})

//close enlarged image
closeImageModal.addEventListener('click', () => {
  toggleModalWindow(imageModal);
})

//handle edit profile form
function formSubmitHandler(e){

    e.preventDefault(); 
    profileName.textContent = inputName.value; 
    profileDesc.textContent = inputDesc.value; 
    toggleModalWindow(editProfileModal);
} 
//submit edit profile form
editForm.addEventListener('submit', formSubmitHandler);

//handle add image form
addImageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const imageTitleInput = addImageForm.querySelector('.modal__input_image-name');
  const imageUrlInput = addImageForm.querySelector('.modal__input_url'); 
  createCard({name: imageTitleInput.value, link: imageUrlInput.value});
  toggleModalWindow(addImageModal);
});

  //like button
/*for(let i = 0; i < clickLike.length; i++){
  console.log("hiiiii");
  clickLike[i].addEventListener("click", function(e){
    e.target.classList.toggle("elements__heart-active");
  })
};*/
//like button

/*for(let i = 0; i < clickLike.length; i++){
  clickLike[i].addEventListener("click", function(e){
    e.target.classList.toggle("elements__heart-active");
  });}*/
  //go through images
  function renderImage(data) {
    list.prepend(createCard(data));
  }
  initialCards.forEach((data) => {
    renderImage(data)
  })
//create a new card
function createCard(e) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.elements__image');
  const cardTitle = cardElement.querySelector('.elements__title');
  const clickLike = document.querySelector('.elements__heart');

  // image name and image url
  cardTitle.textContent = e.name;
  cardImage.style.backgroundImage = `url(${e.link})`;
  //delete image
  //like button

  for(let i = 0; i < clickLike.length; i++){
    clickLike[i].addEventListener("click", function(e){
      e.target.classList.toggle("elements__heart-active");
    });}
  //const deleteCardButton = cardElement.querySelector('.elements__delete');
  //enlarge the image 
  cardImage.addEventListener('click', () => {
    toggleModalWindow(imageModal);
  })

    
  return cardElement;
}



/*deleteCardButton.addEventListener('click', () => {

  });*/







  /*for(let i = 0; i < clickLike.length; i++){
    clickLike[i].addEventListener("click", function(e){
      e.target.classList.toggle("elements__heart-active");
      toggleModalWindow(clickLike)
  });}*/


/*initialCards.forEach((data) => {
  const cardItem = createCard(data.name, data.link)
  list.prepend(cardItem);
});*/





function enlargeImage (caption, link){
  imageModalEnlarge.src = link;
  imageModalEnlarge.alt = caption;
  imageModalCaption.textContent = caption;
  toggleModalWindow(imageModal);
}