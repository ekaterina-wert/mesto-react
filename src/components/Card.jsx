function Card(props) {

    function handleClick() {
        props.onCardClick(props);
    }

    return (
        <li className="place">
            <button className="place__image-button" type="button" title="Посмотреть целиком" onClick={handleClick}><img className="place__image" src={props.link} alt={props.name} /></button>
            <button className="place__trash-button" type="button" aria-label="Удалить место" onClick={props.onDeleteCard}></button>
            <div className="place__title-container">
                <h2 className="place__title">{props.name}</h2>
                <div className="place__like-container">
                    <button className="place__like-button" type="button" aria-label="Поставить лайк"></button>
                    <h3 className="place__like-counter">{props.likes.length}</h3>
                </div>
            </div>
        </li>
    )
}

export default Card;