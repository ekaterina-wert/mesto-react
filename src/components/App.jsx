import { ESC } from '../utils/constants.js';
import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Main from './Main.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import ImagePopup from './ImagePopup.jsx';

function App() {
    //стейт-переменные для открытия и закрытия попапов
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);
    
    //стейт-переменные для обновления данных карточки и пользователя
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [userData, setUserData] = React.useState({});

    //функции открытия попапов
    function handleEditProfileClick(data) {
        setIsEditProfilePopupOpen(true);
        setUserData({ ...data });
        document.addEventListener("keydown", handleEscClose);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
        document.addEventListener("keydown", handleEscClose);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
        document.addEventListener("keydown", handleEscClose);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
        document.addEventListener("keydown", handleEscClose);
    }

    function handleDeleteCard() {
        setIsConfirmationPopupOpen(true);
        document.addEventListener("keydown", handleEscClose);
    }

    //функции закрытия попапов
    function handleEscClose(evt) {
        if (evt.key === ESC) {
            closeAllPopups();
        }
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsConfirmationPopupOpen(false);
        setSelectedCard(null);
        setUserData({});
        document.removeEventListener("keydown", handleEscClose);
    }

    return (
        <>
            < Header />
            <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onDelete={handleDeleteCard} />
            <PopupWithForm name='edit-form' title='Редактировать профиль' onClose={closeAllPopups} submit='Сохранить' isOpen={isEditProfilePopupOpen}>
                <input type="text" className="popup__text popup__text_type_name" id="name-input" name="userName" value={userData.name} minLength="2" maxLength="40" required></input>
                <span className="popup__input-error name-input-error">Вы пропустили это поле.</span>
                <input type="text" className="popup__text popup__text_type_job" id="status-input" name="userStatus" value={userData.about} minLength="2" maxLength="200" required />
                <span className="popup__input-error status-input-error">Вы пропустили это поле.</span>
            </PopupWithForm>

            <PopupWithForm name='add-card' title='Новое место' onClose={closeAllPopups} submit='Создать' isOpen={isAddPlacePopupOpen}>
                <input type="text" className="popup__text popup__text_type_place" id="place-input" name="name" placeholder="Название" value="" minLength="2" maxLength="30" required />
                <span className="popup__input-error place-input-error">Вы пропустили это поле.</span>
                <input type="url" className="popup__text popup__text_type_place-url" id="url-input" name="link" placeholder="Ссылка на картинку" value="" required />
                <span className="popup__input-error url-input-error">Введите адрес сайта.</span>
            </PopupWithForm>

            <PopupWithForm name='edit-image' title='Обновить аватар' onClose={closeAllPopups} submit='Сохранить' isOpen={isEditAvatarPopupOpen}>
                <input type="url" className="popup__text popup__text_type_avatar-url" id="url-avatar-input" name="avatar-link" placeholder="Ссылка на новый аватар" value="" required />
                <span className="popup__input-error url-avatar-input-error">Введите адрес сайта.</span>
            </PopupWithForm>

            <PopupWithForm name='confirm' title='Вы уверены?' onClose={closeAllPopups} submit='Да' isOpen={isConfirmationPopupOpen} />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            < Footer />
        </>
    )
};

export default App;