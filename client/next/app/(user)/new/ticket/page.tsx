import "./ticket.css";
import { getAllAdmins } from "@/actions/get-user";
import { getAllKnowledge } from "@/actions/get-knowledge";
import TicketForm from "@/components/Ticket/TicketForm/TicketForm";
import { ticketDefaultForm } from "@/types";

const Page = async () => {
  const knowledgeList = await getAllKnowledge();
  const adminsList = await getAllAdmins();
  return (
    <>
      <div className="formWrapper">
        <TicketForm
          admins={adminsList}
          knowledgels={knowledgeList}
          props={ticketDefaultForm}
          method="POST"
        />
      </div>
    </>
  );
};

export default Page;
