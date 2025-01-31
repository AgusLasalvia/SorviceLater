
import Link from "next/link";

const Counters = async () => {


	return (
		<div className="backlogGrid">
			<div className="resolved">
				<Link href="#" className="rBtn">
					<p className="rCount" id="resolved-counter">
						{ }
					</p>
					<p className="rLabel">Resolved</p>
				</Link>
			</div>
			<div className="inProgress">
				<Link href="#" className="ipBtn">
					<p className="ipCount" id="pending-counter">
						{ }
					</p>
					<p className="ipLabel">Pending</p>
				</Link>
			</div>
			<div className="new">
				<Link href="#" className="nBtn">
					<p className="nCount" id="new-counter">
						{ }
					</p>
					<p className="nLabel">New</p>
				</Link>
			</div>
		</div>
	);
};

export default Counters;
