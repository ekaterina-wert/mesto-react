import React from 'react';
import PopupWithForm from './PopupWithForm.jsx';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        currentUser.name !== undefined && setName(currentUser.name);
        currentUser.about !== undefined && setDescription(currentUser.about);
    }, [currentUser, props.isOpen]); 
    
    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({name, about: description});
    } 
    

    return (
        <PopupWithForm name='edit-form' title='Редактировать профиль' onClose={props.onClose} submit='Сохранить' isOpen={props.isOpen} onSubmit={handleSubmit}>
                <input type="text" className="popup__text popup__text_type_name" id="name-input" name="userName" value={name} minLength="2" maxLength="40" onChange={handleChangeName} required></input>
                <span className="popup__input-error name-input-error">Вы пропустили это поле.</span>
                <input type="text" className="popup__text popup__text_type_job" id="status-input" name="userStatus" value={description} minLength="2" maxLength="200" onChange={handleChangeDescription} required />
                <span className="popup__input-error status-input-error">Вы пропустили это поле.</span>
        </PopupWithForm>
    )
};

export default EditProfilePopup;