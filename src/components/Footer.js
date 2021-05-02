function Footer() {
    let year = new Date();

    return (
        <div className='footer'>
            <p className="footer__copyright">&copy; {year.getFullYear()} Mesto Russia</p>
        </div>
    )
};

export default Footer;