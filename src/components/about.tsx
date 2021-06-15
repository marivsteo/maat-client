import {
	AnnotationIcon,
	GlobeAltIcon,
	LightningBoltIcon,
	ScaleIcon,
	UserGroupIcon,
	FlagIcon,
	CursorClickIcon,
} from "@heroicons/react/outline";
import { useState } from "react";
import { IUser } from "../interfaces/IUser";
import Header from "./header";

const features = [
	{
		name: "Helps you find friends",
		description:
			"Our goal is to make the world a better place. Whether you're in a new city or all your friends have moved from the place you've always lived in, we can help you find people with more or less the same interests.",
		icon: UserGroupIcon,
	},
	{
		name: "Just a few clicks",
		description:
			"Every website nowadays claims it's supposedly easy to use. We really deliver on that promise. Simply create events, check available ones and choose in which you would like to take part. We have a beautiful site, but we don't want you to lose time on it.",
		icon: CursorClickIcon,
	},
	{
		name: "Be healthier and more active",
		description:
			"It's important to be active. We won't quote fancy studies that show how exercising improves your life, but we all know the truth. We created Maat because we love sports (and we love you too, but don't tell anybody ❤)",
		icon: LightningBoltIcon,
	},
	{
		name: "Reach goals together",
		description:
			"Want to run a marathon? We hate to be the ones to break it to you, but others want the same thing. Why not motivate each other and reach your goals faster because of accountabililty? We found no reason why not.",
		icon: FlagIcon,
	},
];

export default function About() {
	return (
		<div className="font-inter">
			<div className="py-12 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="lg:text-center">
						<h2 className="text-base text-primary font-semibold tracking-wide uppercase">About Ma'at</h2>
						<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
							Be more active and social
						</p>
						<p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
							Trying to create a healthier and more social world by connecting people and helping them
							find suitable partners for their sporting activities.
						</p>
					</div>
					<div className="lg:text-left mt-10 mb-10">
						<div className="flex flex-row">
							<p className="mt-4 max-w-5xl text-xl text-gray-500 lg:mx-auto">
								We believe that humans should be active and socialize in order to stay healthy. And we
								know it's sometimes boring to exercise or run alone. And it just sucks to play football
								when there aren't an even number of players or tennis by yourself. This is why we
								created Ma'at.
							</p>
						</div>
					</div>
					<div className="lg:text-left mt-10 mb-20">
						<div className="flex flex-row">
							<p className="mt-4 max-w-5xl text-xl text-gray-500 lg:mx-auto">
								The Goddess Maʽat is the embodiment of the Ancient Egyptian Seven Principles of Ma’at
								which are Truth, Balance, Order, Harmony, Righteousness, Morality, and Justice.
							</p>
						</div>
					</div>
					<div className="mt-10">
						<dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
							{features.map((feature) => (
								<div key={feature.name} className="relative">
									<dt>
										<div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-secondary text-white bg-secondary-500">
											<feature.icon className="h-6 w-6" aria-hidden="true" />
										</div>
										<p className="ml-16 text-lg leading-6 font-medium text-gray-900">
											{feature.name}
										</p>
									</dt>
									<dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
								</div>
							))}
						</dl>
					</div>
				</div>
			</div>
		</div>
	);
}
