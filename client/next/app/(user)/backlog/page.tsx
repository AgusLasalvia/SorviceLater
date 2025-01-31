import Counters from "@/components/Counters/Counters";
import "./backlog.css";

export default function Backlog() {
	return (
		<>
			<div className="content">
				<div className="backlog">
					<p className="bLogTitle">Backlog</p>
					<Counters />
				</div>
			</div>
		</>
	);
}
