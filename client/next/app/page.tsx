"use client"
import './login.css'

import { useState } from "react";
import { loginForm } from "@/lib/forms";
import { fetchLogin } from '@/lib/fetch';
import { useRouter } from 'next/navigation';



const Login = () => {

	const [form, setForm] = useState(loginForm)
	const [error, setError] = useState("")
	const router = useRouter();
	const handdleSubmit = async () => {

		// Ternary function handdler
		const response = await fetchLogin(form)
		response == 404 ? setError("User Not Found")
		: response == 500 ? setError("Server Error")
		: router.push('/dashboard')
	}


	return (
		<div className="formWrapper">
			<form className="form" action="/" method="post">

				<p className="subtitle">Log in now, or<span> later!</span></p>
				<p className="title">Sorvis<span>Later</span></p>

				{/* <!-- Username textbox --> */}
				<div className="input-container ic1">
					<input
						id="username"
						name="username"
						className="input"
						type="text"
						placeholder=" "
						value={form.username}
						onChange={(e) => {
							setForm({ ...form, username: e.target.value })
						}} />
					<div className="cut"></div>
					<label htmlFor="username" className="placeholder">Username</label>
				</div>

				{/* <!-- Password textbox --> */}
				<div className="input-container ic2">
					<input
						id="password"
						name="password"
						className="input"
						type="password"
						placeholder=" "
						value={form.password}
						onChange={(e) => {
							setForm({ ...form, password: e.target.value })
						}}
					/>
					<div className="cut"></div>
					<label htmlFor="password" className="placeholder">Password</label>
				</div>

				{/* <!-- login button --> */}
				<button type="button" className="loginBtn" onClick={handdleSubmit}>login</button>

				{/* <!-- error text --> */}
				{error != "" ? <p className="errortext">{error}</p> : <></>}

			</form>
		</div>
	)
}


export default Login;