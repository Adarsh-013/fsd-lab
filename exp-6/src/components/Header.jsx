function Header({ title, subtitle }) {
    return (
        <header className="site-header">
            <div className="brand-icon">☕</div>

            <div>
                <h1>{title}</h1>
                <p>{subtitle}</p>
            </div>

        </header>
    );
}

export default Header;