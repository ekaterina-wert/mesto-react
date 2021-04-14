import React from 'react';
import { api } from '../utils/Api.js';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Main from './Main.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import ImagePopup from './ImagePopup.jsx';

function App() {
    //стейт-переменные для данных с сервера
    const [userInfo, setUserInfo] = React.useState('');
    const [cards, setCards] = React.useState([]);

    //стейт-переменные для открытия и закрытия попапов
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);

    //функции открытия попапов
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleDeleteCard() {
        setIsConfirmationPopupOpen(true);
    }

    //функция закрытия попапов
    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsConfirmationPopupOpen(false);
        setSelectedCard(null);
    }

    //получение данных с сервера
    React.useEffect(() => {
        api.getAllData()
            .then((argument) => {
                const [userData, cardsData] = argument;

                //выгрузка данных пользователя
                setUserInfo(userData);

                //выгрузка данных карточек
                const data = cardsData.map((item) => ({
                    id: item._id,
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

    return (
        <>
            < Header />
            <Main userData={userInfo} cards={cards} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onDelete={handleDeleteCard} />
            <PopupWithForm name='edit-form' title='Редактировать профиль' onClose={closeAllPopups} submit='Сохранить' isOpen={isEditProfilePopupOpen}>
                <input type="text" className="popup__text popup__text_type_name" id="name-input" name="userName" value={userInfo.name} minLength="2" maxLength="40" required></input>
                <span className="popup__input-error name-input-error">Вы пропустили это поле.</span>
                <input type="text" className="popup__text popup__text_type_job" id="status-input" name="userStatus" value={userInfo.about} minLength="2" maxLength="200" required />
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