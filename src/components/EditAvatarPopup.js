import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {
    const [avatar, setAvatar] = React.useState('');
    const userAvatarRef = React.useRef();

    // Реализация очистки полей формы при открытии
    React.useEffect(() => {
        userAvatarRef.current.value = '';
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar(userAvatarRef.current.defaultValue);
    }

    function handleChangeAvatar(e) {
        setAvatar(e.target.value);
    }

    return ( 
        <PopupWithForm name = 'edit-image' title = 'Обновить аватар' onClose = { props.onClose }
            submit = 'Сохранить' isOpen = { props.isOpen } onSubmit = { handleSubmit }>
            <input type = "url" ref = { userAvatarRef } className = "popup__text popup__text_type_avatar-url" id = "url-avatar-input" name = "avatar-link"
                placeholder = "Ссылка на новый аватар" defaultValue = { avatar } onChange = { handleChangeAvatar } required />
            <span className = "popup__input-error url-avatar-input-error">Введите адрес сайта.</span> 
        </PopupWithForm>
    )
};

export default EditAvatarPopup;