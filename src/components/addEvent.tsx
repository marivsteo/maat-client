import { SyntheticEvent, useState } from "react";
import { Redirect } from "react-router-dom";
import { SkillLevelEnum } from "../enums/skillLevelEnum";
import { SportTypeEnum } from "../enums/sportTypeEnum";
import { IUser } from "../interfaces/IUser";
import { url } from "../resources/constants";
import Header from "./header";

export default function AddEvent() {
	const [name, setName] = useState({
		error: false,
		value: "",
	});
	const [type, setType] = useState({
		error: false,
		value: -1,
	});
	const [eventDate, setEventDate] = useState({
		error: false,
		value: "",
	});
	const [place, setPlace] = useState({
		error: false,
		value: "",
	});
	const [noOfAttending, setNoOfAttending] = useState({
		error: false,
		value: -1,
	});
	const [noOfMissing, setNoOfMissing] = useState({
		error: false,
		value: -1,
	});
	const [isPayingNeeded, setIsPayingNeeded] = useState({
		error: false,
		value: "",
	});
	const [skillLevel, setSkillLevel] = useState({
		error: false,
		value: -1,
	});
	const [redirect, setRedirect] = useState(false);
	const [addError, setAddError] = useState(false);
	const sportTypeEnumKeys = Object.keys(SportTypeEnum).filter((k) => typeof SportTypeEnum[k as any] === "number");
	const skillLevelEnumKeys = Object.keys(SkillLevelEnum).filter((k) => typeof SkillLevelEnum[k as any] === "number");

	function onChangeSkillLevel(event: any) {
		setSkillLevel({ value: event.target.value, error: skillLevel.error });
	}
	function onChangeSportType(event: any) {
		setType({ value: event.target.value, error: type.error });
	}
	function onChangePay(event: any) {
		setIsPayingNeeded({ value: event.target.value, error: isPayingNeeded.error });
	}

	function checkValues(): boolean {
		if (name.value === "") {
			setName({ error: true, value: name.value });
			return false;
		}
		if (place.value === "") {
			setPlace({ error: true, value: place.value });
			return false;
		}
		if (noOfAttending.value === -1) {
			setNoOfAttending({ error: true, value: noOfAttending.value });
			return false;
		}
		if (noOfMissing.value === -1) {
			setNoOfMissing({ error: true, value: noOfMissing.value });
			return false;
		}
		if (eventDate.value === "") {
			setEventDate({ error: true, value: eventDate.value });
			return false;
		}
		if (skillLevel.value === -1) {
			setSkillLevel({ error: true, value: skillLevel.value });
			return false;
		}
		if (type.value === -1) {
			setType({ error: true, value: type.value });
			return false;
		}
		if (isPayingNeeded.value === "") {
			setIsPayingNeeded({ error: true, value: isPayingNeeded.value });
			return false;
		}
		return true;
	}

	function checkError(): boolean {
		if (
			name.error ||
			place.error ||
			noOfMissing.error ||
			noOfAttending.error ||
			eventDate.error ||
			skillLevel.error ||
			type.error ||
			isPayingNeeded.error ||
			name.value === "" ||
			place.value === "" ||
			noOfAttending.value === -1 ||
			noOfMissing.value === -1 ||
			eventDate.value === "" ||
			skillLevel.value === -1 ||
			type.value === -1 ||
			isPayingNeeded.value === ""
		) {
			return true;
		}
		return false;
	}

	const submit = async (e: SyntheticEvent) => {
		e.preventDefault();
		if (checkValues() === true) {
			const response = await fetch(`${url}/sportevent/add`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({
					name: name.value,
					eventTime: eventDate.value,
					place: place.value,
					numberOfParticipatingPlayers: noOfAttending.value,
					numberOfPlayersNeeded: noOfMissing.value,
					isPayingNeeded: isPayingNeeded.value === "true" ? true : false,
					skillLevel: SkillLevelEnum[skillLevel.value],
					sportType: SportTypeEnum[type.value],
				}),
			});

			if (response.status === 409 || response.status === 401) {
				setAddError(true);
			} else {
				setRedirect(true);
			}
		}
	};

	if (redirect) {
		return <Redirect to="/created_by_me" />;
	}
	return (
		<div>
			{addError === true ? (
				<div className="bg-white text-center py-4 lg:px-4">
					<div
						className="p-2 bg-red-500 items-center text-white leading-none lg:rounded-full flex lg:inline-flex"
						role="alert"
					>
						<span className="flex rounded-full bg-red-200 uppercase px-2 py-1 text-xs font-bold mr-3 text-black">
							Error
						</span>
						<span className="font-semibold mr-2 text-left flex-auto">
							Please make sure you are logged in and the event details are correct.
						</span>
					</div>
				</div>
			) : null}
			<div className="mt-10 font-inter mx-10">
				<div className="md:grid md:grid-cols-3 md:gap-6">
					<div className="md:col-span-1">
						<div className="px-4 sm:px-0">
							<h3 className="text-xl font-bold leading-6 text-gray-900">Your event information</h3>
							<p className="mt-1 text-sm text-gray-600">
								Please enter all the details about your event and don't forget to check twice.
							</p>
							<img
								className="w-full md:block lg:block sm:hidden "
								src={`/images/Open Doodles - FLoating.png`}
							></img>
						</div>
					</div>
					<div className="mt-5 md:mt-0 md:col-span-2">
						<form onSubmit={submit}>
							<div className="shadow overflow-hidden sm:rounded-md">
								<div className="px-4 py-5 bg-white sm:p-6">
									<div className="grid grid-cols-6 gap-6">
										<div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="first_name"
												className="block text-sm font-medium text-gray-700"
											>
												What is the name of your event?
											</label>
											<input
												type="text"
												name="name"
												id="name"
												placeholder="Football game"
												className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
												onChange={(e) => setName({ value: e.target.value, error: name.error })}
												onBlur={(e) => {
													if (e.target.value === "") {
														setName({ value: name.value, error: true });
													} else {
														setName({ value: name.value, error: false });
													}
												}}
											/>
											{name.error === true ? (
												<span className="text-xs text-red-600">
													You need to enter a name for your event.
												</span>
											) : null}
										</div>

										<div className="col-span-6 sm:col-span-3 lg:col-span-2">
											<label htmlFor="type" className="block text-sm font-medium text-gray-700">
												Choose a type of sport.
											</label>
											<select
												name="type"
												id="type"
												className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
												onChange={(e) => onChangeSportType(e)}
											>
												<option value={-1}></option>
												{sportTypeEnumKeys.map((key) => {
													return (
														<option key={key} value={key}>
															{key}
														</option>
													);
												})}
											</select>
											{type.value == -1 ? (
												<span className="text-xs text-red-600">
													Please choose a type of sport.
												</span>
											) : null}
										</div>

										<div className="col-span-6 sm:col-span-3">
											<label htmlFor="date" className="block text-sm font-medium text-gray-700">
												When does the event start?
											</label>
											<input
												id="date"
												name="date"
												type="datetime-local"
												min={new Date().toISOString().split(".")[0]}
												step="any"
												required
												className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
												onChange={(e) => {
													setEventDate({ value: e.target.value, error: eventDate.error });
												}}
												onBlur={(e) => {
													if (e.target.value === "") {
														setEventDate({ value: eventDate.value, error: true });
													} else {
														setEventDate({ value: eventDate.value, error: false });
													}
												}}
											/>
											{eventDate.error === true ? (
												<span className="text-xs text-red-600">
													Please enter a valid date for your event.
												</span>
											) : null}
										</div>

										<div className="col-span-6 sm:col-span-4">
											<label htmlFor="place" className="block text-sm font-medium text-gray-700">
												Where does it take place? (Court name, City)
											</label>
											<input
												type="text"
												name="place"
												id="place"
												placeholder="Gheorgheni Sports Center, Cluj"
												className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
												onChange={(e) =>
													setPlace({ value: e.target.value, error: place.error })
												}
												onBlur={(e) => {
													if (e.target.value === "") {
														setPlace({ value: place.value, error: true });
													} else {
														setPlace({ value: place.value, error: false });
													}
												}}
											/>
											{place.error === true ? (
												<span className="text-xs text-red-600">
													Please enter the location and city of the event.
												</span>
											) : null}
										</div>

										<div className="col-span-6 sm:col-span-3 lg:col-span-2">
											<label
												htmlFor="attending"
												className="block text-sm font-medium text-gray-700"
											>
												How many people are already attending?
											</label>
											<input
												type="number"
												name="attending"
												id="attending"
												min="1"
												className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
												onChange={(e) =>
													setNoOfAttending({
														value: +e.target.value,
														error: noOfAttending.error,
													})
												}
												onBlur={(e) => {
													if (e.target.value === "") {
														setNoOfAttending({ value: noOfAttending.value, error: true });
													} else {
														setNoOfAttending({ value: noOfAttending.value, error: false });
													}
												}}
											/>
											{noOfAttending.error === true ? (
												<span className="text-xs text-red-600" id="passwordHelp">
													Please choose how many people are already attending.
												</span>
											) : null}
										</div>

										<div className="col-span-6 sm:col-span-3 lg:col-span-2">
											<label
												htmlFor="missing"
												className="block text-sm font-medium text-gray-700"
											>
												How many people are you missing?
											</label>
											<input
												type="number"
												name="missing"
												id="missing"
												min="1"
												className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
												onChange={(e) =>
													setNoOfMissing({
														value: +e.target.value,
														error: noOfMissing.error,
													})
												}
												onBlur={(e) => {
													if (e.target.value === "") {
														setNoOfMissing({ value: noOfMissing.value, error: true });
													} else {
														setNoOfMissing({ value: noOfMissing.value, error: false });
													}
												}}
											/>
											{noOfAttending.error === true ? (
												<span className="text-xs text-red-600" id="passwordHelp">
													Please choose how many people are missing.
												</span>
											) : null}
										</div>

										<div className="col-span-6 sm:col-span-3 lg:col-span-2">
											<label htmlFor="state" className="block text-sm font-medium text-gray-700">
												What's the skill level your playing at?
											</label>
											<select
												name="skill"
												id="skill"
												className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
												onChange={(e) => onChangeSkillLevel(e)}
											>
												<option value={-1}></option>
												{skillLevelEnumKeys.map((key) => {
													return (
														<option key={key} value={key}>
															{key}
														</option>
													);
												})}
											</select>
											{skillLevel.value == -1 ? (
												<span className="text-xs text-red-600">
													Please choose a skill level.
												</span>
											) : null}
										</div>

										<div className="col-span-6 sm:col-span-6 lg:col-span-2">
											<label htmlFor="city" className="block text-sm font-medium text-gray-700">
												Do people need to pay to participate?
											</label>
											<div className="flex-row mt-2" onChange={(e) => onChangePay(e)}>
												<input
													type="radio"
													name="pay"
													id="pay"
													value="true"
													className="mr-2 appearance-none rounded-full relative border border-gray-300 placeholder-gray-500 text-primary focus:outline-none focus:ring-secondary-400 focus:border-secondary-500 focus:z-10 sm:text-sm"
												/>
												<label htmlFor="pay">Yes</label>
												<input
													type="radio"
													name="pay"
													id="pay"
													value="false"
													className="mr-2 ml-4 appearance-none rounded-full relative border border-gray-300 placeholder-gray-500 text-primary focus:outline-none focus:ring-secondary-400 focus:border-secondary-500 focus:z-10 sm:text-sm"
												/>
												<label htmlFor="pay">No</label>
											</div>
											{isPayingNeeded.error === true ? (
												<span className="text-xs text-red-600">Please choose an option.</span>
											) : null}
										</div>
									</div>
								</div>
								<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
									{checkError() ? (
										<button
											onClick={(e) => e.preventDefault()}
											className="opacity-50 cursor-not-allowed inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-white hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-hover duration-500"
										>
											Add the event
										</button>
									) : (
										<button
											type="submit"
											className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-white hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-hover duration-500"
										>
											Add the event
										</button>
									)}
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
