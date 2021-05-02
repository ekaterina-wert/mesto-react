import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function Card(props) {
    
    const currentUser = React.useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.owner._id === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = isOwn? 'place__trash-button' : 'place__trash-button place__trash-button_hidden'; 

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.likes.some(like => like._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = isLiked? 'place__like-button place__like-button_active' : 'place__like-button'; 

    // Передаем id карточки в App через Main
    function handleClick() {
        props.onCardClick(props);
    }

    // Передаем id карточки в App через Main
   function handleLikeClick() {
        props.onCardLike(props);
    }

    // Передаем id карточки в App через Main
    function handleDeleteClick() {
        props.onCardDelete(props);
    }
    
    return (
        <li className="place">
            <button className="place__image-button" type="button" title="Посмотреть целиком" onClick={handleClick}><img className="place__image" src={props.link} alt={props.name} /></button>
            <button className={cardDeleteButtonClassName} type="button" aria-label="Удалить место" onClick={handleDeleteClick}></button>
            <div className="place__title-container">
                <h2 className="place__title">{props.name}</h2>
                <div className="place__like-container">
                    <button className={cardLikeButtonClassName} type="button" aria-label="Поставить лайк" onClick={handleLikeClick}></button>
                    <h3 className="place__like-counter">{props.likes.length}</h3>
                </div>
            </div>
        </li>
    )
}

export default Card;