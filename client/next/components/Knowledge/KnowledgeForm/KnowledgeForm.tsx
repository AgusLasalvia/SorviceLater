"use client";

import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { KnowledgeSubmitForm } from "@/lib/forms";
import { fetchCountKnowledge, fetchKnowledge } from '@/lib/fetch'


const KnowledgeForm = () => {

	const [knowledgeForm, setKnowledgeForm] = useState(KnowledgeSubmitForm);
	const [error, setError] = useState('')

	const router = useRouter();

	useEffect(() => {
		fetchCountKnowledge().then((data) => {
			knowledgeForm.id = data.count + 1;
		});
	}, [])

	const handleSubmit = async () => {
		const response = await fetchKnowledge(knowledgeForm);
		response == 404 ? setError("User Not Found") : response == 500 ? setError("Server Error") : router.push('/backlog')
	};

	return (
		<>
			<nav className="navbar">
				<div className="navbar__container">
					<a href="/backlog" className="navbar__title">Sorvis<span>Later</span></a>

					<ul className="navbar__menu">
						{/* <li className="navbar__item">
							<a href="" onClick={handleSubmit} className="navbar__attach" id="attach">&#128206;</a>
						</li> */}
						<li className="navbar__btn">
							<button className="button" onClick={handleSubmit}>Save</button>
						</li>
					</ul>
				</div>
			</nav>

			<div className="formWrapper">


				<div id="KBarticle" className="form">
					<div className="bottomGrid" id="">
						<p id="kbArticleP" className="inputLabel">
							KB
						</p>
						<input
							id="kbArticleI"
							name="kbarticle"
							className="input"
							type="text"
							placeholder={knowledgeForm.id.toString()}
							readOnly
						/>

						<p id="titleP" className="inputLabel">
							Title
						</p>
						<input
							id="kbTitleI"
							name="title"
							className="input"
							type="text"
							placeholder={knowledgeForm.title}
						/>

						<p id="knowledgeP" className="inputLabel">
							Description
						</p>
						<textarea
							id="kbKnowledgeI"
							name="knowledge"
							className="input"
							typeof="text"
							placeholder={knowledgeForm.description}
						></textarea>
					</div>
				</div>
			</div>
		</>
	);
};

export default KnowledgeForm;
