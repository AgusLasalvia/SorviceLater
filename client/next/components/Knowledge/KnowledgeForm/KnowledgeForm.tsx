"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { KnowledgeBaseForm } from "@/lib/forms";
import { fetchCountKnowledge, fetchKnowledge } from '@/lib/fetch'


const KnowledgeForm = () => {

	const [knowledgeForm, setKnowledgeForm] = useState(KnowledgeBaseForm);
	const [error, setError] = useState('')

	const router = useRouter();



	useEffect(() => {
		const getNewId = async () => {
			const id = await fetchCountKnowledge()
	
			setKnowledgeForm({ ...knowledgeForm, id: id + 1 })
		}
		getNewId()
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
							value={knowledgeForm.title}
							onChange={(e) => {
								setKnowledgeForm({ ...knowledgeForm, title: e.target.value })
							}}
						/>

						<p id="knowledgeP" className="inputLabel">
							Description
						</p>
						<textarea
							id="kbKnowledgeI"
							name="knowledge"
							className="input"
							typeof="text"
							value={knowledgeForm.description}
							onChange={(e) => {
								setKnowledgeForm({ ...knowledgeForm, description: e.target.value })
							}}
						></textarea>
					</div>
				</div>
			</div>
		</>
	);
};

export default KnowledgeForm;
