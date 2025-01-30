import './sidebar.css'
import './navbar.css'

import Link from 'next/link'


const links = [
	{ title: "New incident", href: "", icon: "" },
	{ title: "New KB", href: "", icon: "" },
	{ title: "Incidents", href: "", icon: "" },
	{ title: "My incidents", href: "", icon: "" },
	{ title: "KB articles", href: "", icon: "" },
	{ title: "Backlog", href: "", icon: "" },
]

const Sidebar = () => {
	return (
		<nav className="sidebar close">
			<header>
				<div className="image-text">
					<span className="image">
						{/* <!--<img src="logo.png" alt="">--> */}
					</span>

					<div className="text logo-text">
						<span className="name">Sorvis<span>Later</span></span>
						<span className="adminName"> </span>
					</div>
				</div>

				<i className="bx bx-chevron-right toggle"></i>
			</header>

			<div className="menu-bar">
				<div className="menu">
					{/* <!-- Searchbox --> */}
					<li className="search-box">
						{/* <!-- PARA BUSCAR KB O INC --> */}
						<i className="bx bx-search icon"></i>
						<form action="/search" method="post">
							<input type="text" name="Search" placeholder="Search KB, INC" />
						</form>
					</li>

					<ul className="menu-links">

						{links.map((link, index) => {
							return (
								<li className='nav-link' key={index}>
									<Link href={link.href}>
										<i className={link.icon}></i>
										<span className='text nav-text'>{link.title}</span>
									</Link>
								</li>
							)
						})}

					</ul>
				</div>

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
		</nav>
	)
}

export default Sidebar;
