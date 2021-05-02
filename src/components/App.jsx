import { ESC } from '../utils/constants.js';
import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Main from './Main.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import ImagePopup from './ImagePopup.jsx';
import { api } from '../utils/Api.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function App() {
    //стейт-переменные для открытия и закрытия попапов
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);
    
    //стейт-переменные для обновления данных карточки и пользователя
    const [selectedCard, setSelectedCard] = React.useState(null);
    
    const [currentUser, setCurrentUser] = React.useState({});
    //const [cards, setCards] = React.useState([]);

//получение данных с сервера
    React.useEffect(() => {
        api.getUserData()
            .then((userData) => {
                //выгрузка данных пользователя
                setCurrentUser(userData);
             })
            .catch((err) => {
                console.log('Ошибка при загрузке юзердата и массива карточек', err)
            });
    }, []);

    const [cards, setCards] = React.useState([]);


    //получение данных с сервера
    React.useEffect(() => {
        api.getInitialCards()
            .then((initialCards) => {
               
                //выгрузка данных карточек
                const data = initialCards.map((item) => ({
                    _id: item._id,
                    name: item.name,
                    link: item.link,
                    likes: item.likes,
                    owner: item.owner
                }));
                setCards(data);
            })
            .catch((err) => {
                console.log('Ошибка при загрузке юзердата и массива карточек', err)
            });
    }, [])

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
    
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, isLiked)
        .then((newCard) => {
            setCards(() => cards.map((c) => c._id === card._id ? newCard : c))
        })
    } 

    function handleCardDelete(card) {
        
        api.deleteMyCard(card._id)
        .then(() => {
            setCards(() =>
                cards.filter((c) => 
                c._id !== card._id)
            )
        })
        .catch((err) => {
            console.log('Ошибка при удалении карточки', err)
        });
        closeAllPopups();
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

    // function handleDeleteCard() {
    //     setIsConfirmationPopupOpen(true);
    //     document.addEventListener("keydown", handleEscClose);
    // }

    function handleUpdateUser(userInputs) {
        api.editUserData(userInputs)
            .then(() => {
                setCurrentUser({ ...currentUser, name: userInputs.name, about: userInputs.about });
             })
            .catch((err) => {
                console.log('Ошибка при обновлении юзердата', err)
            });
        closeAllPopups();
    }

    function handleUpdateAvatar(userInput) {
        api.editUserAvatar(userInput)
        .then(() => {
                setCurrentUser({ ...currentUser, avatar: userInput });
             })
            .catch((err) => {
                console.log('Ошибка при обновлении аватара', err)
            });
        closeAllPopups();
    }

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
        document.removeEventListener("keydown", handleEscClose);
        //Array.from(document.forms).forEach((form) => form.reset())
    }

    return (
        <>
        <CurrentUserContext.Provider value={currentUser}>
            < Header />
            <Main onEditProfile={handleEditProfileClick} 
                onAddPlace={handleAddPlaceClick} 
                onEditAvatar={handleEditAvatarClick} 
                onCardClick={handleCardClick} 
                //onDelete={handleDeleteCard} 
                cards={cards} 
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete} />
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} /> 
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/> 
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} /> 

            
            
            <PopupWithForm name='confirm' title='Вы уверены?' onClose={closeAllPopups} submit='Да' isOpen={isConfirmationPopupOpen} />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            < Footer />
            </CurrentUserContext.Provider>
        </>
    )
};

export default App;