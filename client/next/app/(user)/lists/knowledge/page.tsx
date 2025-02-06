"use client"

import { KnowledgeCard } from "@/components/Knowledge/KnowledgeCard/KnowledgeCard";
import { fetchAllKnowledge } from "@/lib/fetch";
import { Knowledge } from "@/lib/interfaces";
import { useEffect, useState } from "react";
import "./kblist.css";

const Page = () => {

	const [list, setList] = useState<Knowledge[]>([]);

	useEffect(() => {

		const getAllKnowledge = async () => {
			setList(await fetchAllKnowledge())
		}
		getAllKnowledge()
	}, [])

	return (
		<div className="content">
			<p className="title">Knowledge List</p>
			<div className="resultsWrapper">
				{/* Asegúrate de retornar el componente */}
				{list.map((element: Knowledge, index) => (
					<KnowledgeCard title={element.title} id={element.id} key={index} />
				))}
			</div>
		</div>
	);
};

export default Page;
