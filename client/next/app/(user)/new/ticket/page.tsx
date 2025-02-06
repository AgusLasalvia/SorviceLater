"use client"

import "./ticket.css";
import TicketForm from "@/components/Ticket/TicketForm/TicketForm";
import { TicketBaseForm } from "@/lib/forms"


const Page = () => {


	return (



		<div className="formWrapper">
			<TicketForm

				props={TicketBaseForm} />
		</div>

	);
};

export default Page;
