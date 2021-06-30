import { useEffect, useState } from "react";
import Event from "./event";
import Header from "./header";
import Heading from "./heading";
import Pagination from "./pagination";
import { IUser } from "../interfaces/IUser";
import { ISportEvent } from "../interfaces/ISportEvent";
import { url } from "../resources/constants";
import { NavLink } from "react-router-dom";

export default function ParticipatingEvents(props: any) {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		(async () => {
			const response = await fetch(`${url}/sportevent/participating`, {
				headers: { "Content-Type": "application/json" },
				credentials: "include",
			});

			const content = await response.json();
			setEvents(content);
		})();
	}, []);
	return (
		<div>
			<div className="lg:flex lg:items-center lg:justify-between font-inter mt-10 mx-10">
				<div className="flex-1 min-w-0">
					<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
						Events you are involved in
					</h2>
				</div>
			</div>
			{events.length === 0 ? (<div className="mx-10"><img className="mt-10 mx-auto" src={`/images/Open Doodles - Petting.png`} alt="" /><p className="mt-10 max-w-2xl text-xl text-gray-500 lg:mx-auto">You don't participate in any event. Check available events in the <NavLink to="/events" className="text-primary">Events</NavLink> page, participate in them and check back here.</p></div>) : (null)}
			<div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-1 mx-auto">
				{events.map((event: ISportEvent) => {
					return <Event key={event.name} sportEvent={event}></Event>;
				})}
			</div>
			{/* <Pagination></Pagination> */}
		</div>
	);
}
