import { useEffect, useState } from "react";
import Event from "./event";
import Header from "./header";
import Heading from "./heading";
import Pagination from "./pagination";
import { IUser } from "../interfaces/IUser";
import { ISportEvent } from "../interfaces/ISportEvent";
import { url } from "../resources/constants";
import { NavLink } from "react-router-dom";

export default function MyEvents(props: any) {
	return (
		<div className="font-inter">
			<div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 flex items-center justify-between flex-col">
				<h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-6xl mt-10 mb-16 text-center">
					<span className="block">View the events</span>
					<span className="block text-primary">YOU are involved in.</span>
				</h2>
				<div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 mx-auto">
					<div className="inline-flex rounded-md shadow">
						<NavLink
							to="/created_by_me"
							className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-white hover:text-primary transition-hover duration-500"
						>
							Events I Created
						</NavLink>
					</div>
					<div className="ml-3 inline-flex rounded-md shadow">
						<NavLink
							to="/participating"
							className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-secondary-500 hover:bg-white hover:text-secondary-500 transition-hover duration-500"
						>
							Events I Participate In
						</NavLink>
					</div>
				</div>
				<img className="mt-10 mx-auto" src={`/images/my_events.png`} alt="" />
			</div>
		</div>
	);
}
