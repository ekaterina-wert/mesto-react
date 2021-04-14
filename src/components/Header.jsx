import headerLogo from '../images/header__logo.svg'

function Header() {
    return (
        <div className='header'>
            <a href="#" className="header__link" target="_blank" rel="noopener">
                <img className="header__logo" src={headerLogo} alt="Логотип Место.Россия"/>
            </a>
        </div>
    )
};

export default Header;