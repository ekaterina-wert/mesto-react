import React from 'react';
//import { api } from '../utils/Api.js';
import Card from './Card.jsx';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Main(props) {

    //стейт-переменные для данных с сервера
    const currentUser = React.useContext(CurrentUserContext);
    //const [userDescription, setUserDescription] = React.useState('data is coming...');
    //const [userAvatar, setUserAvatar] = React.useState('https://ih1.redbubble.net/image.457284374.2804/flat,128x128,075,t-pad,128x128,f8f8f8.u1.jpg');

//     const [cards, setCards] = React.useState([]);


//     //получение данных с сервера
//     React.useEffect(() => {
//         api.getInitialCards()
//             .then((initialCards) => {
               
//                 //выгрузка данных карточек
//                 const data = initialCards.map((item) => ({
//                     id: item._id,
//                     name: item.name,
//                     link: item.link,
//                     likes: item.likes,
//                     owner: item.owner
//                 }));
//                 setCards(data);
//             })
//             .catch((err) => {
//                 console.log('Ошибка при загрузке юзердата и массива карточек', err)
//             });
//     }, [])

//     function handleCardLike(card) {
//         // Снова проверяем, есть ли уже лайк на этой карточке
//         const isLiked = card.likes.some(i => i._id === currentUser._id);
    
//         // Отправляем запрос в API и получаем обновлённые данные карточки
//         api.likeCard(card.id)
//             .then((newCard) => {
//                 setCards((state) => 
//                     state.map((c) => 
//                         c._id === card.id ? newCard : c
//                     )
//                 );
//             });
//     } 

//     function handleCardDelete(card) {
//         api.deleteMyCard(card.id)
//         .then((res) => {
//     console.log(res)
// })
//     }

    return (
        <main>
            <section className="profile">
                <div className="profile__container">
                    <button className="profile__edit-image" type="button" id="edit-image" aria-label="Изменить аватар" onClick={props.onEditAvatar}><img className="profile__image" src={currentUser.avatar} alt="Это Вы!" /></button>
                    <div className="profile__name-container">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="profile__edit-button" type="button" id="edit-button" aria-label="Изменить информацио о себе" onClick={props.onEditProfile} />
                    </div>
                    <p className="profile__job">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" type="button" aria-label="Добавить новое место" onClick={props.onAddPlace}></button>
            </section>

            <section className="places">
                <ul className="places__container">
                    {props.cards.map((card) => (
                        < Card key={card._id} {...card} onCardClick={props.onCardClick} onCardDelete={props.onCardDelete} onCardLike={props.onCardLike} />
                        )
                    )}
                </ul>
            </section>
        </main>
    )
};

export default Main;