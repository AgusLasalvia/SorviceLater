"use client";
import Link from "next/link";
import { Knowledge, User, Ticket } from "@/lib/interfaces";
import { fetchAllKnowledge, fetchAllAdmins } from "@/lib/fetch"
import { useEffect, useState } from "react";


interface TicketFormProps {
	props: Ticket;

}

const TicketForm = ({
	props,
}: TicketFormProps) => {
	const [admins, setAdmins] = useState<User[]>([])
	const [knowledges, setKnowledge] = useState<Knowledge[]>([])


	useEffect(() => {
		const getData = async () => {
			setKnowledge(await fetchAllKnowledge() || [])
			setAdmins(await fetchAllAdmins() || [])
		}

		getData();
	}, [])
	const [ticket, setTicket] = useState(props);

	const handleSubmit = () => {

	};

	const state_content = [
		{ value: "new", label: "New" },
		{ value: "resolved", label: "Resolved" },
		{ value: "pendingVendor", label: "Pending (Awaiting vendor)" },
		{ value: "pendingAdmin", label: "Pending (Admin action)" },
		{ value: "pendingTechnical", label: "Pending (Teschnical)" },
		{ value: "pendingOther", label: "Pending (Other)" },
	];
	return (
		<div className="content">
			<nav className="navbar">
				<div className="navbar__container">
					<Link href="./backlog" className="navbar__title">
						Sorvis<span>Later</span>
					</Link>

					<ul className="navbar__menu">
						<li className="navbar__btn">
							<input
								id="btnTicketSave"
								className="button"
								value="Save"
								type="button"
								onClick={handleSubmit}
							></input>
						</li>
					</ul>
				</div>
			</nav>

			<div id="save" className="form">
				<div className="topGrid">
					<div className="gridcontent" id="div1">
						<p className="inputLabel">Incident number</p>
						<input
							id="incNum"
							name="incNum"
							className="input"
							type="text"
							placeholder="5"
							readOnly
						/>
					</div>

					<div className="gridcontent" id="div2">
						<p className="inputLabel">Requested by</p>
						<input
							id="reqBy"
							name="reqBy"
							className="input"
							type="text"
							placeholder={props.request_by}
							onChange={(e) => {
								setTicket({ ...ticket, request_by: e.target.value });
							}}
						/>
					</div>

					<div className="gridcontent" id="div3">
						<p className="inputLabel">Requested for</p>
						<input
							id="reqFor"
							name="reqFor"
							className="input"
							type="text"
							placeholder={props?.request_for}
							onChange={(e) => {
								setTicket({ ...ticket, request_for: e.target.value });
							}}
						/>
					</div>

					<div className="gridcontent" id="div4">
						<p className="inputLabel">Sorvis offering</p>
						<input
							id="srvcOf"
							name="srvcOf"
							className="input"
							type="text"
							placeholder={props?.service_offering}
							onChange={(e) => {
								setTicket({ ...ticket, service_offering: e.target.value });
							}}
						/>
					</div>

					<div className="gridcontent" id="div5">
						<p className="inputLabel">Configuration item</p>
						<input
							id="confItem"
							name="confItem"
							className="input"
							type="text"
							placeholder={ticket.item}
							onChange={(e) => {
								setTicket({ ...ticket, item: e.target.value });
							}}
						/>
					</div>

					<div className="gridcontent" id="div6">
						<p className="inputLabel">Contact type</p>
						{/* <!-- <it id="contactType" name="contactType" className="input" type="text" placeholder=" " /> --> */}
						<select
							id="contactType"
							name="contactType"
							className="select"
							onChange={(e) => {
								setTicket({ ...ticket, contact_type: e.target.value });
							}}
						>
							<option value="Discord">Discord</option>
							<option value="ingame">In-game chat</option>
							<option value="other">Other</option>
						</select>
					</div>

					<div className="gridcontent" id="div7">
						<p className="inputLabel">State</p>
						{/* <!-- <input id="state" name="State" className="input" type="text" placeholder=" " /> --> */}
						<select id="state" name="State" className="select">
							<option value="new">New</option>
							{state_content.map((state) => (
								<option value={state.value} key={state.value}>
									{state.label}
								</option>
							))}
						</select>
					</div>

					<div className="gridcontent" id="div8">
						<p className="inputLabel">Assigned to</p>
						{/* <!-- <input id="assigned" name="Assigned" className="input" type="text" placeholder=" " /> --> */}
						<select id="assigned" name="Assigned" className="select">

							{admins.map((admin) => (
								<option value={admin.id} key={admin.username}>
									{admin.username}
								</option>
							)
							)
							}
						</select>
					</div>

					<div className="gridcontent" id="div9">
						<p className="inputLabel">Category</p>
						<input
							id="category"
							name="Category"
							className="input"
							type="text"
							placeholder=" "
						/>
					</div>

					<div className="gridcontent" id="div10">
						<p className="inputLabel">Symptom</p>
						<input
							id="symptom"
							name="Symptom"
							className="input"
							type="text"
							placeholder=" "
						/>
					</div>

					<div className="gridcontent" id="div11">
						<p className="inputLabel">Impact</p>
						{/* <!-- <input id="impact" name="Impact" className="input" type="text" placeholder=" " /> --> */}
						<select id="impact" name="Impact" className="select">
							<option value="high">1 - High</option>
							<option value="medium">2 - Medium</option>
							<option value="low">3 - Low</option>
						</select>
					</div>

					<div className="gridcontent" id="div12">
						<p className="inputLabel">Urgency</p>
						{/* <!-- <input id="urgency" name="Urgency" className="input" type="text" placeholder=" " /> --> */}
						<select id="urgency" name="Urgency" className="select">
							<option value="high">1 - High</option>
							<option value="medium">2 - Medium</option>
							<option value="low">3 - Low</option>
						</select>
					</div>

					<div className="gridcontent" id="div13">
						<p className="inputLabel">Priority</p>

						{/* <!-- PRIORITY DETERMINADA POR LA RELACION ENTRE EL IMAPCTO Y LA URGENCIA --> */}
					</div>
				</div>
				<div className="bottomGrid" id="">
					{/* <!-- ESTO ESTÁ ALINEADO PARA LA MIERDA PORQUE NO SE LA divA DE ALINEARLO BIEN CON LO DE ARRIBA --> */}
					<p id="shortDescP" className="inputLabel">
						Short description
					</p>
					<input
						id="shortDescI"
						name="Description"
						className="input"
						type="text"
						placeholder=" "
					/>

					<p id="knowledgeP" className="inputLabel">
						Knowledge base
					</p>
					{/* <!-- <input id="knowledgeI" name=" " className="input" type="text" placeholder=" " /> --> */}
					<select id="knowledgeI" name="Kb" className="select">
						{knowledges.map((kb: any) => (
							<option value={kb.id} key={kb.id}>
								{kb.title}
							</option>
						))}
					</select>

					<p id="worknotesP" className="inputLabel">
						Worknotes
					</p>
					<textarea
						id="worknotes"
						name="worknotes"
						className="input"
						typeof="text"
						placeholder=" "
					></textarea>
					{/* <!-- CAMBIAR ESTO POR UN TEXT BOX --> */}

					<p id="addcommentsP" className="inputLabel">
						Additional comments
					</p>
					<textarea
						id="addcomments"
						name="addcomments"
						className="input"
						typeof="text"
						placeholder=" "
					></textarea>
				</div>
			</div>
		</div>
	);
};

export default TicketForm;
