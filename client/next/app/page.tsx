"use client";

import "./page.css";
import "./globals.css";

import { useState } from "react";
import { loginForm } from "@/lib/forms";
import { useRouter } from "next/navigation";
import { fetchLogin } from "@/lib/fetch";

export default function Home() {
	const [formLogin, setFormLogin] = useState(loginForm);
	const [error, setError] = useState("")
	const router = useRouter();


	// handle submit action
	const handleSubmit = async () => {
		// Ternary function handdler
		const response = await fetchLogin(formLogin)
		response == 404 ? setError("User Not Found")
			: response == 500 ? setError("Server Error")
				: router.push('/backlog')
	};

	// TSX returns
	return (
		<div className="formWrapper">
			<div className="form">
				<p className="subtitle">
					Log in now, or<span> later!</span>
				</p>
				<p className="title">
					Sorvis<span>Later</span>
				</p>
				{/* <!-- Username textbox --> */}
				<div className="input-container ic1">
					<input
						id="username"
						name="username"
						className="input"
						type="text"
						placeholder=" "
						onChange={(e) => {
							setFormLogin({ ...formLogin, username: e.target.value });
						}}
					/>
					<div className="cut"></div>
					<label className="placeholder">Username</label>
				</div>
				{/* <!-- Password textbox --> */}
				<div className="input-container ic2">
					<input
						id="password"
						name="password"
						className="input"
						type="password"
						placeholder=" "
						onChange={(e) => {
							setFormLogin({ ...formLogin, password: e.target.value });
						}}
					/>
					<div className="cut"></div>
					<label className="placeholder">Password</label>
				</div>
				{/* <!-- login button --> */}
				<button className="loginBtn" id="btnLogin" onClick={handleSubmit}>
					login
				</button>
				
				{/* <!-- error text --> */}
				{error != "" ? <p className="errortext">{error}</p> : <></>}
			</div>
		</div>
	);
}
