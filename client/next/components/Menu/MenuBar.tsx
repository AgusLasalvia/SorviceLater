import Menu from './Menu'

type MenuBarProps = {
    query: string
}

const MenuBar = ({ query }: MenuBarProps) => {
    return (
        <>
            <div className="menu-bar">
                <Menu query={query} />
                <div className="bottom-content">
                    <li className="">
                        <a href="/">
                            {/* <!-- bx icon --> */}
                            <i className="bx bx-log-out icon"></i>
                            <span className="text nav-text">Logout</span>
                        </a>
                    </li>
                </div>
            </div>
        </>
    )
}


export default MenuBar;