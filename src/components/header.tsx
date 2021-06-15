import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { GenderEnum } from "../enums/genderEnum";
import { IUser } from "../interfaces/IUser";
import { url } from "../resources/constants";

let navigation = [{ name: "Events", href: "/events" }];

export default function Header(props: { username: string; setUsername: (username: string) => void }) {
	if (props.username !== "" && props.username !== undefined) {
		navigation = [
			{ name: "Events", href: "/events" },
			{ name: "My events", href: "/my_events" },
			{ name: "About", href: "/about" },
		];
	} else {
		navigation = [
			{ name: "Events", href: "/events" },
			{ name: "About", href: "/about" },
			{ name: "Sign up", href: "/signup" },
		];
	}

	const logout = async () => {
		await fetch(`${url}/auth/logout`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		});

		props.setUsername("");
	};

	return (
		<Popover className="">
			{({ open }) => (
				<>
					<div className="relative pt-6 px-4 sm:px-6 lg:px-8">
						<nav
							className="relative flex items-center justify-between sm:h-10 lg:justify-start"
							aria-label="Global"
						>
							<div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
								<div className="flex items-center justify-between w-full md:w-auto">
									<NavLink to="/">
										<div className="flex items-center flex-no-shrink text-white mr-6">
											<svg
												className="h-8 w-8 mr-2"
												width="54"
												height="54"
												viewBox="0 0 54 54"
												xmlns="http://www.w3.org/2000/svg"
											>
												<circle cx="27" cy="27" r="20" fill="#fa255e" />{" "}
											</svg>
											<span className="font-bold text-xl tracking-tight text-black">Ma'at</span>
										</div>
									</NavLink>
									<div className="-mr-2 flex items-center md:hidden">
										<Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
											<span className="sr-only">Open main menu</span>
											<MenuIcon className="h-6 w-6" aria-hidden="true" />
										</Popover.Button>
									</div>
								</div>
							</div>
							<div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
								{navigation.map((item) => (
									<NavLink
										key={item.name}
										to={item.href}
										className="font-medium text-gray-500 hover:text-gray-900"
									>
										{item.name}
									</NavLink>
								))}
								{props.username !== "" && props.username !== undefined ? (
									<NavLink
										to="/login"
										className="font-medium text-primary hover:text-secondary transition-hover duration-500"
										onClick={logout}
									>
										Log out
									</NavLink>
								) : (
									<NavLink
										to="/login"
										className="font-medium text-primary hover:text-secondary transition-hover duration-500"
									>
										Log in
									</NavLink>
								)}
							</div>
						</nav>
					</div>

					<Transition
						show={open}
						as={Fragment}
						enter="duration-150 ease-out"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="duration-100 ease-in"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<Popover.Panel
							focus
							static
							className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-50"
						>
							<div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
								<div className="px-5 pt-4 flex items-center justify-between">
									<NavLink to="/">
										<div className="flex items-center flex-shrink-0 text-white mr-6">
											<svg
												className="h-8 w-8 mr-2"
												width="54"
												height="54"
												viewBox="0 0 54 54"
												xmlns="http://www.w3.org/2000/svg"
											>
												<circle cx="27" cy="27" r="20" fill="#fa255e" />{" "}
											</svg>
											<span className="font-bold text-xl tracking-tight text-black">Ma'at</span>
										</div>
									</NavLink>
									<div className="-mr-2">
										<Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
											<span className="sr-only">Close main menu</span>
											<XIcon className="h-6 w-6" aria-hidden="true" />
										</Popover.Button>
									</div>
								</div>
								<div className="px-2 pt-2 pb-3 space-y-1">
									{navigation.map((item) => (
										<NavLink
											key={item.name}
											to={item.href}
											className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
										>
											{item.name}
										</NavLink>
									))}
								</div>
								{props.username !== "" && props.username !== undefined ? (
									<NavLink
										to="/login"
										className="block w-full px-5 py-3 text-center font-medium text-primary bg-gray-50 hover:bg-gray-100"
										onClick={logout}
									>
										Log out
									</NavLink>
								) : (
									<NavLink
										to="/login"
										className="block w-full px-5 py-3 text-center font-medium text-white bg-primary hover:bg-secondary-500 transition-hover duration-300"
									>
										Log in
									</NavLink>
								)}
							</div>
						</Popover.Panel>
					</Transition>
				</>
			)}
		</Popover>
	);
}
