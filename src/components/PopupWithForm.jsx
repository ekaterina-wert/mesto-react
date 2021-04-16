import React from 'react';

function PopupWithForm(props) {

    return (
        <>
            <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
                <div className="popup__flex-container">
                    <div className="popup__container">
                        <h2 className="popup__title">{props.title}</h2>
                        <form action="#" className={`popup__form popup__form_type_${props.name} edit-button-form`} name={`popup__form_type_${props.name}`} noValidate>
                            <fieldset className="popup__input-container">
                                {props.children}
                            </fieldset>
                            <button className="popup__submit" type="submit">{props.submit}</button>
                        </form>
                    </div>
                    <button className="popup__close-button" type="button" aria-label="Закрыть модальное окно" onClick={props.onClose}></button>
                </div>
            </div>
        </>
    )
}

export default PopupWithForm;