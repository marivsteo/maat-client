import {
	CalendarIcon,
	CurrencyEuroIcon,
	LightningBoltIcon,
	LocationMarkerIcon,
	UserGroupIcon,
	UsersIcon,
	GlobeIcon,
} from "@heroicons/react/outline";
import { error } from "console";
import { SyntheticEvent, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { SkillLevelEnum } from "../enums/skillLevelEnum";
import { SportTypeEnum } from "../enums/sportTypeEnum";
import { ISportEvent } from "../interfaces/ISportEvent";
import { url } from "../resources/constants";
import getImageByKey from "../utils/getImageByKey";

interface IEventRouteParams {
	id: string;
}

export default function EventPage() {
	const { id } = useParams<IEventRouteParams>();
	const [event, setEvent] = useState<ISportEvent>();
	const [participateError, setParticipateError] = useState({
		error: false,
		errorMessage: "",
	});
	const [redirect, setRedirect] = useState(false);

	useEffect(() => {
		(async () => {
			const response = await fetch(`${url}/sportevent/get_by_id/${id}`, {
				headers: { "Content-Type": "application/json" },
				credentials: "include",
			});

			const content = await response.json();
			setEvent(content);
		})();
	}, []);

	const participate = async () => {
		let eventId = event?.id;
		const response = await fetch(`${url}/sportevent/participate/${eventId}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		});

		if (response.status === 401) {
			setParticipateError({
				error: true,
				errorMessage:
					"You have to log in to participate to an event. If you don't have an account, please sign up",
			});
		} else if (response.status === 200) {
			setRedirect(true);
		} else if (response.status === 409) {
			setParticipateError({
				error: true,
				errorMessage:
					"Something went wrong with your request. Maybe you are already participating in this event.",
			});
		}
	};

	if (redirect) {
		return <Redirect to="/participating" />;
	}

	return (
		<div>
			{participateError.error === true ? (
				<div className="bg-white text-center py-4 lg:px-4">
					<div
						className="p-2 bg-red-500 items-center text-white leading-none lg:rounded-full flex lg:inline-flex"
						role="alert"
					>
						<span className="flex rounded-full bg-red-200 uppercase px-2 py-1 text-xs font-bold mr-3 text-black">
							Error
						</span>
						<span className="font-semibold mr-2 text-left flex-auto">
							Something went wrong. This might be the reason: {participateError.errorMessage}
						</span>
					</div>
				</div>
			) : null}
			<div className="font-inter mt-10">
				<div className="flex flex-col lg:flex-row">
					<div className="w-full lg:w-1/2">
						{event != undefined ? (
							<img
								className="w-full"
								src={getImageByKey(SportTypeEnum[event.sportType])}
								alt="Sport event"
							/>
						) : null}
					</div>
					<div className="flex flex-col">
						<div className="mx-10 lg:mt-0 mt-10 mb-20">
							<h2 className="text-4xl font-bold leading-7 text-gray-900 sm:text-4xl md:text-4xl sm:truncate mb-10">
								{event?.name}
							</h2>
							<div className="flex mt-2 items-center mb-4">
								<CalendarIcon
									className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
								<p className="font-semibold leading-7 text-gray-900 sm:truncate">
									{event != undefined
										? new Intl.DateTimeFormat("en-GB", {
												year: "numeric",
												month: "long",
												day: "2-digit",
										  }).format(new Date(event?.eventTime))
										: "Date not available at the moment."}
								</p>
							</div>
							<div className="flex mt-2 items-center mb-4">
								<LocationMarkerIcon
									className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
								<h2 className="font-semibold leading-7 text-gray-900 sm:truncate">{event?.place}</h2>
							</div>
							<div className="flex mt-2 items-center mb-4">
								<UserGroupIcon
									className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
								<h2 className="font-semibold leading-7 text-gray-900 sm:truncate">
									{event?.numberOfParticipatingPlayers} participating
								</h2>
							</div>
							<div className="flex mt-2 items-center mb-4">
								<UsersIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
								<h2 className="leading-7 text-gray-900 sm:truncate font-semibold">
									{event?.numberOfPlayersNeeded} more needed
								</h2>
							</div>
							<div className="flex mt-2 items-center mb-4">
								<CurrencyEuroIcon
									className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
								<h2 className="font-semibold leading-7 text-gray-900 sm:truncate">
									{event?.isPayingNeeded ? "Entrance fee necessary" : "Everything is free"}
								</h2>
							</div>
							<div className="flex mt-2 items-center mb-4">
								<LightningBoltIcon
									className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
								<h2 className="font-semibold leading-7 text-gray-900 sm:truncate">
									{event != undefined
										? SkillLevelEnum[event?.skillLevel]
										: "Skill level not available"}
								</h2>
							</div>
							<div className="flex mt-2 items-center mb-4">
								<GlobeIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
								<h2 className="font-semibold leading-7 text-gray-900 sm:truncate">
									{event != undefined ? SportTypeEnum[event?.sportType] : "Sport type not available"}
								</h2>
							</div>
							<button
								onClick={() => participate()}
								className="mt-16 text-base shadow group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-white hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-hover duration-500"
							>
								I want to participate
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
