import { Ticket } from "@/types";
import Link from "next/link";

interface TicketCardProps {
  tickets: Ticket[];
}

const TicketCard = async ({ tickets }: TicketCardProps) => {
  return (
    <>
      {tickets.map((item: Ticket) => {
        <div className="result">
          <p className="kbID">{item.id}</p>
          <p className="kbID" id="reqfor">
            request: {item?.reqFor}
          </p>
          <p className="kbID" id="assignedto">
            assigned: {item?.assigned}
          </p>
          <p className="kbTitle">{item?.srvcOf}</p>
          <Link href={`/open/ticket?id=${item?.id}`} className="button">
            Open
          </Link>
        </div>;
      })}
    </>
  );
};
export default TicketCard;
