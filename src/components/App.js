import { ESC } from '../utils/constants.js';
import React from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import { api } from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {
    //стейт-переменные для открытия и закрытия попапов
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);

    //стейт-переменные для обновления данных карточки и пользователя
    const [cards, setCards] = React.useState([]);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState({});

    //получение данных пользователя с сервера
    React.useEffect(() => {
        api.getUserData()
            .then((userData) => {
                setCurrentUser(userData);
            })
            .catch((err) => {
                console.log('Ошибка при загрузке юзердата', err)
            });
    }, []);

    //получение данных карточек с сервера
    React.useEffect(() => {
        api.getInitialCards()
            .then((initialCards) => {
                setCards(initialCards);
            })
            .catch((err) => {
                console.log('Ошибка при загрузке массива карточек', err)
            });
    }, [])

    function handleCardLike(card) {
        // Проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((cards) => cards.map((c) =>
                    c._id === card._id ? newCard : c
                ))
            })
    }

    function handleCardDelete(card) {
        api.deleteMyCard(card._id)
            .then(() => {
                setCards((cards) =>
                    cards.filter((c) =>
                        c._id !== card._id
                    )
                )
                closeAllPopups();
            })
            .catch((err) => {
                console.log('Ошибка при удалении карточки', err)
            });     
    }

    //функции открытия попапов
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
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

    // попап для подтверждения удаления карточки
    // function handleDeleteCard() {
    //     setIsConfirmationPopupOpen(true);
    //     document.addEventListener("keydown", handleEscClose);
    // }

    // Функции обновления данных пользователя (информация о себе и аватар)
    function handleUpdateUser(userInputs) {
        api.editUserData(userInputs)
            .then((userData) => {
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch((err) => {
                console.log('Ошибка при обновлении юзердата', err)
            });
    }

    function handleUpdateAvatar(userInput) {
        api.editUserAvatar(userInput)
            .then(() => {
                setCurrentUser({...currentUser, avatar: userInput });
            })
            .catch((err) => {
                console.log('Ошибка при обновлении аватара', err)
            });
        closeAllPopups();
    }

    // Функция добавления новой карточки
    function handleAddPlaceSubmit(newCard) {
        api.addNewCard(newCard)
            .then((res) => {
                setCards([res, ...cards])
            })
            .catch((err) => {
                console.log('Ошибка при загрузке новой карточки', err)
            });
        closeAllPopups();
    }

    // Функции закрытия попапов
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
        document.removeEventListener("keydown", handleEscClose);
    }

    return ( 
    <CurrentUserContext.Provider value={currentUser}>
        <Header/>
        <Main 
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            //кнопка для подтверждения удаления карточки
            //onDelete={handleDeleteCard} 
        /> 
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />  
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />  
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />  
        <PopupWithForm 
            name='confirm'
            title='Вы уверены?'
            onClose={closeAllPopups}
            submit='Да'
            isOpen={isConfirmationPopupOpen}
        /> 
        <ImagePopup card={selectedCard} onClose={closeAllPopups} /> 
        <Footer />
    </CurrentUserContext.Provider> 
    )
};

export default App;