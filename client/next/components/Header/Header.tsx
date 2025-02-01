type HeaderProps = {
    username: string
    toggleSidebar: () => void
}


const Header = ({ username, toggleSidebar }: HeaderProps) => {
    return (
        <header>
            <div className="image-text">
                <span className="image">
                    {/* <!--<img src="logo.png" alt="">--> */}
                </span>

                <div className="text logo-text">
                    <span className="name">Sorvis<span>Later</span></span>
                    <span className="adminName" id="adminName"> {username}</span>
                </div>
            </div>

            <i className="bx bx-chevron-right toggle" onClick={toggleSidebar}></i>

        </header>
    )
}

export default Header;