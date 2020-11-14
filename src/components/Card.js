import Api from "./Api";

export default class Card{
    constructor({data, handleCardClick, handleDeleteClick, likeHandler}, userId, cardTemplateSelector){
        this._name = data.name;
        this._link = data.link;
        this._cardTemplateSelector = cardTemplateSelector;
        this._handleCardClick = handleCardClick;
        this._userId = userId;
        this._likes = data.likes;
        this._likeHandler = likeHandler;
        this._id = data._id;
        this._handleDeleteClick = handleDeleteClick;
    }

    id(){
        return this._id;
    }

    _cardDeleter (e){
        //e.target.closest('.elements__item').remove();
        //once clicked "delete" dont go over the entire function for the clicked card
        this._cardElement.remove();
        this._cardElement = null;
        e.stopPropagation();

    }
    _likedCardRenderer (e){
        if (this._likes.some((like) => like._id === this._userId)) {
            this._cardElement.querySelector(".elements__heart").classList.add("elements__heart_active");
          }
        /*const likes = [];
        const countLikes = (function(){
            const counter = 0;
            //if a user likes the image, count one more
            
            return function () {return counter++}
        })()*/
        //display hte count of likes below the heart
        /*function displaycount(){
            document.getElementById("carrier") = count ();
        }*/
    }
    showLikes(count){
        this._cardElement.querySelector(".elements__heart-count").textContent = count;
    }
    _addEventListeners(){
        //const clickLike = this._cardElement.querySelector('.elements__heart');
        //const deleteCardButton = this._cardElement.querySelector('.elements__delete');
        //clickLike.addEventListener("click", this._likedCardRenderer);
        //delete image
        /*deleteCardButton.addEventListener('click', (e) => {
            this._cardDeleter(e)
        });*/
        this._cardElement.querySelector('.elements__delete').addEventListener("click", () => this._handleDeleteClick(this.id()));

        //Enlarging image
        this._cardImage.addEventListener('click', (e) =>{
            if(e.target === this._cardImage){
            this._handleCardClick({ name: this._name, link: this._link })}
        });
        this._cardElement.querySelector(".elements__heart").addEventListener("click", (evt) => {
            evt.target.classList.toggle("elements__heart_active");
            const id = this.id()
            this._likeHandler(id);
          })
    }
    createCard() {
        this._cardTemplate = document.querySelector(this._cardTemplateSelector).content.querySelector('.elements__item');
        this._cardElement = this._cardTemplate.cloneNode(true);
        this._cardTitle = this._cardElement.querySelector('.elements__title')
        this._cardImage = this._cardElement.querySelector('.elements__image')
        this._cardTitle.textContent = this._name;
        this._cardImage.style.backgroundImage = `url(${this._link})`;
        this._likedCardRenderer();
        this._addEventListeners();
        this.showLikes(this._likes.length);
        return this._cardElement;
    }
}