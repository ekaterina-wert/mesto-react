import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    // Реализация очистки полей формы при открытии
    React.useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onAddPlace({ name, link });
    }

    return ( 
        <PopupWithForm 
            name='add-card' 
            title='Новое место' 
            onClose ={props.onClose} 
            submit='Создать' 
            isOpen={props.isOpen} 
            onSubmit={handleSubmit}
        >
            <input 
                type="text" 
                className="popup__text popup__text_type_place" 
                id="place-input" 
                name="name" 
                placeholder="Название"
                value={name} 
                onChange={handleChangeName}
                minLength="2" 
                maxLength="30" 
                required 
            />
            <span className="popup__input-error place-input-error">Вы пропустили это поле.</span> 
            <input 
                type="url" 
                className="popup__text popup__text_type_place-url" 
                id="url-input" 
                name="link" 
                placeholder="Ссылка на картинку"
                value={link} 
                onChange={handleChangeLink}
                required 
            />
            <span className="popup__input-error url-input-error">Введите адрес сайта.</span> 
        </PopupWithForm>
    )
};

export default AddPlacePopup;