/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import {
	IdentificationIcon,
	CalendarIcon,
	CheckIcon,
	ChevronDownIcon,
	CurrencyDollarIcon,
	PlusIcon,
	GlobeIcon,
	PencilIcon,
} from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";
import { Link, NavLink } from "react-router-dom";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export default function Heading(props: { username: string }) {
	return (
		<div className="lg:flex lg:items-center lg:justify-between font-inter mt-10 mx-10">
			<div className="flex-1 min-w-0">
				<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
					Available events
					{props.username !== undefined && props.username !== "" ? " for " + props.username : ""}
				</h2>
				<div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
					<div className="mt-2 flex items-center text-sm text-gray-500">
						<IdentificationIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
						{props.username !== undefined && props.username !== "" ? "Tailored for you" : "Great events"}
					</div>
					<div className="mt-2 flex items-center text-sm text-gray-500">
						<GlobeIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
						Worldwide
					</div>
					<div className="mt-2 flex items-center text-sm text-gray-500">
						<CurrencyDollarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
						Free (except field entrance fees)
					</div>
					<div className="mt-2 flex items-center text-sm text-gray-500">
						<CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
						Available today,{" "}
						{new Intl.DateTimeFormat("en-GB", {
							year: "numeric",
							month: "long",
							day: "2-digit",
						}).format(new Date())}
					</div>
				</div>
			</div>
			<div className="mt-5 flex lg:mt-0 lg:ml-4">
				<span className="hidden sm:block">
					<button
						type="button"
						title="Coming soon..."
						className="opacity-50 cursor-not-allowed inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
					>
						<PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
						Edit filters
					</button>
				</span>

				{props.username !== undefined && props.username !== "" ? (
					<span className="sm:ml-3">
						<NavLink
							to="/add_event"
							type="button"
							className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow text-sm font-medium text-white bg-primary hover:bg-white hover:text-primary transition-hover duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							<PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
							Add event
						</NavLink>
					</span>
				) : null}

				{/* Dropdown */}
				<Menu as="span" className="ml-3 relative sm:hidden">
					{({ open }) => (
						<>
							<Menu.Button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
								More
								<ChevronDownIcon className="-mr-1 ml-2 h-5 w-5 text-gray-500" aria-hidden="true" />
							</Menu.Button>

							<Transition
								show={open}
								as={Fragment}
								enter="transition ease-out duration-200"
								enterFrom="transform opacity-0 scale-95"
								enterTo="transform opacity-100 scale-100"
								leave="transition ease-in duration-75"
								leaveFrom="transform opacity-100 scale-100"
								leaveTo="transform opacity-0 scale-95"
							>
								<Menu.Items
									static
									className="origin-top-right absolute right-0 mt-2 -mr-1 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
								>
									<Menu.Item>
										{({ active }) => (
											<a
												href="#"
												className={classNames(
													active ? "bg-gray-100" : "",
													"block px-4 py-2 text-sm text-gray-700"
												)}
											>
												Edit
											</a>
										)}
									</Menu.Item>
								</Menu.Items>
							</Transition>
						</>
					)}
				</Menu>
			</div>
		</div>
	);
}
