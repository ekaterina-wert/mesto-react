import React from 'react';
import { api } from '../utils/Api.js';
import Card from './Card.jsx';

function Main(props) {

    //стейт-переменные для данных с сервера
    const [userName, setUserName] = React.useState('please stand by');
    const [userDescription, setUserDescription] = React.useState('data is coming...');
    const [userAvatar, setUserAvatar] = React.useState('https://ih1.redbubble.net/image.457284374.2804/flat,128x128,075,t-pad,128x128,f8f8f8.u1.jpg');

    const [cards, setCards] = React.useState([]);


    //получение данных с сервера
    React.useEffect(() => {
        api.getAllData()
            .then((argument) => {
                const [userData, cardsData] = argument;

                //выгрузка данных пользователя
                setUserName(userData.name);
                setUserDescription(userData.about);
                setUserAvatar(userData.avatar);

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

    function handleClick() {
        props.onEditProfile({name: userName, about: userDescription});
    }

    return (
        <main>
            <section className="profile">
                <div className="profile__container">
                    <button className="profile__edit-image" type="button" id="edit-image" aria-label="Изменить аватар" onClick={props.onEditAvatar}><img className="profile__image" src={userAvatar} alt="Это Вы!" /></button>
                    <div className="profile__name-container">
                        <h1 className="profile__name">{userName}</h1>
                        <button className="profile__edit-button" type="button" id="edit-button" aria-label="Изменить информацио о себе" onClick={handleClick} />
                    </div>
                    <p className="profile__job">{userDescription}</p>
                </div>
                <button className="profile__add-button" type="button" aria-label="Добавить новое место" onClick={props.onAddPlace}></button>
            </section>

            <section className="places">
                <ul className="places__container">
                    {cards.map((card) => (
                        < Card key={card.id} {...card} onCardClick={props.onCardClick} onDeleteCard={props.onDelete} />
                    ))}
                </ul>
            </section>
        </main>
    )
};

export default Main;