import {
	CalendarIcon,
	UserGroupIcon,
	LocationMarkerIcon,
	UsersIcon,
	CurrencyEuroIcon,
	LightningBoltIcon,
	GlobeIcon,
	PencilIcon,
} from "@heroicons/react/solid";
import { ISportEvent } from "../interfaces/ISportEvent";
import { SkillLevelEnum } from "../enums/skillLevelEnum";
import { SportTypeEnum } from "../enums/sportTypeEnum";
import getImageByKey from "../utils/getImageByKey";

export default function Event(props: { sportEvent: ISportEvent }) {
	return (
		<div className="mx-3 my-3 cursor-pointer hover:scale-105 transform transition-hover duration-300 font-inter">
			<div className="max-w-sm rounded overflow-hidden shadow-lg">
				<img
					className="w-full h-1/4"
					src={getImageByKey(SportTypeEnum[props.sportEvent.sportType])}
					alt="Sport event"
				/>
				<div className="px-6 py-4">
					<div className="font-bold text-xl mb-2">{props.sportEvent.name}</div>
					<div className="mt-2 flex items-center text-sm text-gray-500">
						<CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
						{new Intl.DateTimeFormat("en-GB", {
							year: "numeric",
							month: "long",
							day: "2-digit",
						}).format(new Date(props.sportEvent.eventTime))}
					</div>
					<div className="mt-2 flex items-center text-sm text-gray-500">
						<LocationMarkerIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
						{props.sportEvent.place}
					</div>
					{props.sportEvent.numberOfPlayersNeeded <= 2 ? (
						<div className="mt-2 flex items-center text-sm text-gray-500">
							<UsersIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
							{props.sportEvent.numberOfPlayersNeeded} more participant(s) needed
						</div>
					) : (
						<div className="mt-2 flex items-center text-sm text-gray-500">
							<UserGroupIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
							{props.sportEvent.numberOfPlayersNeeded} more participants needed
						</div>
					)}

					{props.sportEvent.isPayingNeeded ? (
						<div className="mt-2 flex items-center text-sm text-gray-500">
							<CurrencyEuroIcon
								className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
								aria-hidden="true"
							/>
							Entrance contribution neccessary
						</div>
					) : null}

					<div className="mt-2 flex items-center text-sm text-gray-500">
						<LightningBoltIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
						Skill level: {SkillLevelEnum[props.sportEvent.skillLevel]}
					</div>
				</div>
				<div className="px-6 pt-4 pb-2">
					<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
						#{SportTypeEnum[props.sportEvent.sportType].toLowerCase()}
					</span>
					<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
						#{SkillLevelEnum[props.sportEvent.skillLevel].toLowerCase()}
					</span>
				</div>
			</div>
		</div>
	);
}
