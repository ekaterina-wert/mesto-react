import React from 'react';
import Card from './Card.jsx';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

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