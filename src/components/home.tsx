import Header from "./header";
import { Link, NavLink } from "react-router-dom";
import { IUser } from "../interfaces/IUser";
import { useState } from "react";

export default function Home(props: { username: string }) {
	return (
		<div className="relative bg-white overflow-hidden font-inter z-10">
			<div className="max-w-7xl mx-auto">
				<div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
					<svg
						className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
						fill="currentColor"
						viewBox="0 0 100 100"
						preserveAspectRatio="none"
						aria-hidden="true"
					>
						<polygon points="50,0 100,0 50,100 0,100" />
					</svg>

					<main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
						<div className="sm:text-center lg:text-left">
							<h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
								<span className="block xl:inline body">Find your perfect </span>
								<span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary xl:inline">
									sports partner + events
								</span>
							</h1>
							<p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
								If working out just sounds more fun with someone else, you're in luck! And you don't
								even have to convince your friends to join you, we'll help you find a partner.
							</p>

							<p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
								Need another player four your football match? Or need someone to play tennis with,
								instead of your cousin who doesn't know how to play? Browse our selection of events and
								start playing!
							</p>
							<div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
								{props.username === undefined || props.username === "" ? (
									<div className="rounded-md shadow">
										<NavLink
											to="/signup"
											className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-white hover:text-primary md:py-4 md:text-lg md:px-10 transition-hover duration-500"
										>
											Get started
										</NavLink>
									</div>
								) : (
									<div className="rounded-md shadow">
										<NavLink
											to="/events"
											className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-white hover:text-primary md:py-4 md:text-lg md:px-10 transition-hover duration-500"
										>
											Check out events
										</NavLink>
									</div>
								)}

								<div className="mt-3 sm:mt-0 sm:ml-3">
									<NavLink
										to="/about"
										className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-gray-200 hover:bg-gray-100 md:py-4 md:text-lg md:px-10 transition duration-500"
									>
										Learn more
									</NavLink>
								</div>
							</div>
						</div>
					</main>
				</div>
			</div>
			<div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:mt-28">
				<img
					className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
					src={`/images/composition-1.svg`}
					alt=""
				/>
			</div>
		</div>
	);
}
