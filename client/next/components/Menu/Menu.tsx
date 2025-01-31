import Link from 'next/link'
type MenuProps = {
    query: string
}


const links = [
    { href: "/new/ticket", icon: "bx bx-edit icon", text: "New incident" },
    { href: "/new/knowledge", icon: "bx bx-book-add icon", text: "New KB" },
    { href: "/lists/allTickets", icon: "bx bx-cabinet icon", text: "Incidents" },
    { href: "/lists/myTickets", icon: "bx bx-user-pin icon", text: "My incidents" },
    { href: "/lists/knowledge", icon: "bx bx-book-bookmark icon", text: "KB articles" },
    { href: "/backlog", icon: "bx bx-bar-chart icon", text: "Backlog" },
]

const Menu = ({ query }: MenuProps) => {
    return (
        <div className="menu">
            {/* <!-- Searchbox --> */}
            <li className="search-box">
                {/* <!-- PARA BUSCAR KB O INC --> */}
                <i className="bx bx-search icon"></i>
                <input type="text" name="Search" placeholder="Search KB, INC" />
            </li>

            <ul className="menu-links">
                {
                    // Auto create all links (<a> tags)
                    links.map((link, index) => {
                        return (
                            <li key={index} className="nav-link">
                                <Link href={{
                                    pathname: link.href,
                                    query: { username: query }
                                }} >
                                    <i className={link.icon}></i>
                                    <span className="text nav-text">{link.text}</span>
                                </Link >
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Menu;


