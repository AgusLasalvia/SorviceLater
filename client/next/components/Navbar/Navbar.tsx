"use client"
import './navbar.css'
import './sidebar.css'
import MenuBar from '../Menu/MenuBar'
import { useState } from "react";
import Header from '../Header/Header';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function GetUsername({ isSidebarOpen, toggleSidebar }: any) {
	const query = useSearchParams();
	const param = query.get('username');
	const username = btoa(query.get('username') as string)

	return (
		< nav className={isSidebarOpen ? "sidebar" : "sidebar close"} >
			<Header username={username} toggleSidebar={toggleSidebar} />
			<MenuBar query={param as string} />

		</nav >)
}


const Navbar = () => {



	// Navbar state for sidebar
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	// toggle sidebar
	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<>
			<Suspense>
				<GetUsername isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
			</Suspense>
		</>
	)
}



export default Navbar;