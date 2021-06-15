import { useEffect, useState } from "react";
import Event from "./event";
import Header from "./header";
import Heading from "./heading";
import Pagination from "./pagination";
import { IUser } from "../interfaces/IUser";
import { ISportEvent } from "../interfaces/ISportEvent";
import { url } from "../resources/constants";

export default function EventsCreatedByMe(props: any) {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		(async () => {
			const response = await fetch(`${url}/sportevent/my_events`, {
				headers: { "Content-Type": "application/json", Accept: "application/json" },
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
						Events created by you
					</h2>
				</div>
			</div>
			<div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-1 mx-auto">
				{events.map((event: ISportEvent) => {
					return <Event key={event.name} sportEvent={event}></Event>;
				})}
			</div>
		</div>
	);
}
