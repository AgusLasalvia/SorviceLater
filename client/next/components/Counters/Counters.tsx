"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchTicketStateCounters } from "@/lib/fetch";

const Counters = () => {

	const [counters, setCounters] = useState({ new: 0, pending: 0, resolved: 0 })

	const getCounters = async () => {

		setCounters(await fetchTicketStateCounters())
	}

	useEffect(() => {
		getCounters()
	}, [])

	return (
		<div className="backlogGrid">
			<div className="resolved">
				<Link href="#" className="rBtn">
					<p className="rCount" id="resolved-counter">
						{counters.resolved}
					</p>
					<p className="rLabel">Resolved</p>
				</Link>
			</div>
			<div className="inProgress">
				<Link href="#" className="ipBtn">
					<p className="ipCount" id="pending-counter">
						{counters.pending}
					</p>
					<p className="ipLabel">Pending</p>
				</Link>
			</div>
			<div className="new">
				<Link href="#" className="nBtn">
					<p className="nCount" id="new-counter">
						{counters.new}
					</p>
					<p className="nLabel">New</p>
				</Link>
			</div>
		</div>
	);
};

export default Counters;
