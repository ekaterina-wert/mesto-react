import React from 'react';
import PopupWithForm from './PopupWithForm.jsx';
//mport {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function EditAvatarPopup(props) {
    //const currentUser = React.useContext(CurrentUserContext);

    const [avatar, setAvatar] = React.useState('');
    const userAvatarRef = React.useRef();

    React.useEffect(() => {
        userAvatarRef.current.value = '';
        }, [props.isOpen]
    );
    
    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        props.onUpdateAvatar(userAvatarRef.current.defaultValue);
    }

    function handleChangeAvatar(e) {
        setAvatar(e.target.value);

    }
    
    function handleClose() {
        props.onClose();
    }

     return (
        <PopupWithForm name='edit-image' title='Обновить аватар' onClose={handleClose} submit='Сохранить' isOpen={props.isOpen} onSubmit={handleSubmit} >
            <input type="url" ref={userAvatarRef} className="popup__text popup__text_type_avatar-url" id="url-avatar-input" name="avatar-link" placeholder="Ссылка на новый аватар" defaultValue={avatar} onChange={handleChangeAvatar} required />
            <span className="popup__input-error url-avatar-input-error">Введите адрес сайта.</span>
       </PopupWithForm>
     )
};


export default EditAvatarPopup;