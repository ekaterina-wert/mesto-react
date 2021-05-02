import React from 'react';

function ImagePopup(props) {

    return (
        <div className={`popup popup_type_show-image ${props.card && 'popup_opened'}`}>
            <div className="popup__flex-container">
                <figure className="popup__image-container">
                    <img className="popup__image" src={props.card ? props.card.link : ''} alt={props.card ? props.card.name : ''} />
                    <figcaption className="popup__caption">{props.card ? props.card.name : ''}</figcaption>
                </figure>
                <button className="popup__close-button" type="button" aria-label="Свернуть изображение" onClick={props.onClose} />
            </div>
        </div>
    )
}

export default ImagePopup;