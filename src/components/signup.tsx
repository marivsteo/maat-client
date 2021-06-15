import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/solid";
import Header from "./header";
import { Link, NavLink, Redirect } from "react-router-dom";
import { SyntheticEvent, useState } from "react";
import { GenderEnum } from "../enums/genderEnum";
import { url } from "../resources/constants";
import { IUser } from "../interfaces/IUser";

export default function Signup() {
	const [email, setEmail] = useState({
		error: false,
		value: "",
	});
	const [confirmEmail, setConfirmEmail] = useState({
		error: false,
		value: "",
	});
	const [username, setUsername] = useState({
		error: false,
		value: "",
	});
	const [password, setPassword] = useState({
		error: false,
		value: "",
	});
	const [dateOfBirth, setDateOfBirth] = useState({
		error: false,
		value: "",
	});
	const [gender, setGender] = useState({
		error: false,
		value: -1,
	});
	const [redirect, setRedirect] = useState(false);
	const [signupError, setSignupError] = useState(false);

	function onChangeGender(event: any) {
		setGender({ value: event.target.value, error: gender.error });
	}

	function checkValues(): boolean {
		if (email.value === "") {
			setEmail({ error: true, value: email.value });
			return false;
		}
		if (confirmEmail.value !== email.value) {
			setConfirmEmail({ error: true, value: confirmEmail.value });
			return false;
		}
		if (password.value === "") {
			setPassword({ error: true, value: password.value });
			return false;
		}
		if (username.value === "") {
			setUsername({ error: true, value: username.value });
			return false;
		}
		if (dateOfBirth.value === "") {
			setDateOfBirth({ error: true, value: dateOfBirth.value });
			return false;
		}
		if (gender.value === -1) {
			setGender({ error: true, value: gender.value });
			return false;
		}
		return true;
	}

	function checkError(): boolean {
		if (
			email.error ||
			confirmEmail.error ||
			password.error ||
			username.error ||
			dateOfBirth.error ||
			gender.error ||
			email.value === "" ||
			confirmEmail.value !== email.value ||
			password.value === "" ||
			username.value === "" ||
			dateOfBirth.value === "" ||
			gender.value === -1
		) {
			return true;
		}
		return false;
	}

	const submit = async (e: SyntheticEvent) => {
		e.preventDefault();
		if (checkValues() === true) {
			const response = await fetch(`${url}/auth/register`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username: username.value,
					email: email.value,
					password: password.value,
					dateofbirth: dateOfBirth.value,
					gender: gender.value,
				}),
			});

			if (response.status === 409) {
				setSignupError(true);
			} else {
				setRedirect(true);
			}
		}
	};

	if (redirect) {
		return <Redirect to="/login" />;
	}

	return (
		<div className="min-h-screen mb-20">
			{signupError === true ? (
				<div className="bg-white text-center py-4 lg:px-4">
					<div
						className="p-2 bg-red-500 items-center text-white leading-none lg:rounded-full flex lg:inline-flex"
						role="alert"
					>
						<span className="flex rounded-full bg-red-200 uppercase px-2 py-1 text-xs font-bold mr-3 text-black">
							Error
						</span>
						<span className="font-semibold mr-2 text-left flex-auto">
							An user with this email already exists.
						</span>
					</div>
				</div>
			) : null}
			<div className="font-inter mt-10 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-8">
					<div>
						<svg
							className="mx-auto h-12 w-auto"
							width="54"
							height="54"
							viewBox="0 0 54 54"
							xmlns="http://www.w3.org/2000/svg"
						>
							<circle cx="27" cy="27" r="20" fill="#fa255e" />{" "}
						</svg>
						<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
							Sign up for free to start moving
						</h2>
						<p className="mt-2 text-center text-sm text-gray-600">
							Or{" "}
							<NavLink to="/login" className="font-medium text-secondary-500 hover:text-secondary-400">
								log in with your existing account
							</NavLink>
						</p>
					</div>
					<form className="mt-8 space-y-6" onSubmit={submit}>
						<input type="hidden" name="remember" defaultValue="true" />
						<div className="rounded-md">
							<div className="mb-4">
								<label htmlFor="email-address">What's your email?</label>
								<input
									id="email-address"
									name="email"
									type="email"
									autoComplete="email"
									required
									className="mt-2 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-secondary-400 focus:border-secondary-500 focus:z-10 sm:text-sm"
									placeholder="Enter your email."
									onChange={(e) => setEmail({ value: e.target.value, error: email.error })}
									onBlur={(e) => {
										if (e.target.value === "") {
											setEmail({ value: email.value, error: true });
										} else {
											setEmail({ value: email.value, error: false });
										}
									}}
								/>
								{email.error === true ? (
									<span className="text-xs text-red-600" id="passwordHelp">
										You need to enter your email.
									</span>
								) : null}
							</div>
							<div className="mb-4">
								<label htmlFor="email-address">Confirm your email</label>
								<input
									id="email-address"
									name="email"
									type="email"
									autoComplete="email"
									required
									className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-secondary-400 focus:border-secondary-500 focus:z-10 sm:text-sm"
									placeholder="Enter your email again."
									onChange={(e) =>
										setConfirmEmail({ value: e.target.value, error: confirmEmail.error })
									}
									onBlur={(e) => {
										if (e.target.value !== email.value) {
											setConfirmEmail({ value: confirmEmail.value, error: true });
										} else {
											setConfirmEmail({ value: confirmEmail.value, error: false });
										}
									}}
								/>
								{confirmEmail.error === true && confirmEmail !== email ? (
									<span className="text-xs text-red-600" id="passwordHelp">
										The email addresses don't match.
									</span>
								) : null}
							</div>
							<div className="mb-4">
								<label htmlFor="password">Create a password</label>
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									className="mt-2 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-secondary-400 focus:border-secondary-500 focus:z-10 sm:text-sm"
									placeholder="Create a password."
									onChange={(e) => setPassword({ value: e.target.value, error: password.error })}
									onBlur={(e) => {
										if (e.target.value === "") {
											setPassword({ value: password.value, error: true });
										} else {
											setPassword({ value: password.value, error: false });
										}
									}}
								/>
								{password.error === true ? (
									<span className="text-xs text-red-600" id="passwordHelp">
										You need to enter a password.
									</span>
								) : null}
							</div>
							<div className="mb-4">
								<label htmlFor="profile-name" className="mb-4">
									What should other users call you?
								</label>
								<input
									id="profile-name"
									name="profileName"
									type="text"
									required
									className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-secondary-400 focus:border-secondary-500 focus:z-10 sm:text-sm"
									placeholder="Enter a username."
									onChange={(e) => setUsername({ value: e.target.value, error: username.error })}
									onBlur={(e) => {
										if (e.target.value === "") {
											setUsername({ value: username.value, error: true });
										} else {
											setUsername({ value: username.value, error: false });
										}
									}}
								/>
								{username.error === true ? (
									<span className="text-xs text-red-600" id="passwordHelp">
										Enter a username.
									</span>
								) : null}
							</div>
							<div className="mb-4">
								<label htmlFor="birthday">What's your birth date?</label>
								<input
									id="birthday"
									name="birthday"
									type="date"
									max={new Date().toISOString().split(".")[0]}
									required
									className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-secondary-400 focus:border-secondary-500 focus:z-10 sm:text-sm"
									onChange={(e) =>
										setDateOfBirth({ value: e.target.value, error: dateOfBirth.error })
									}
									onBlur={(e) => {
										if (e.target.value === "") {
											setDateOfBirth({ value: dateOfBirth.value, error: true });
										} else {
											setDateOfBirth({ value: dateOfBirth.value, error: false });
										}
									}}
								/>
								{dateOfBirth.error === true ? (
									<span className="text-xs text-red-600" id="passwordHelp">
										Enter a valid date of birth.
									</span>
								) : null}
							</div>
							<div className="mb-4">
								<label htmlFor="gender">What's your gender?</label>
								<div className="flex-row mt-2" onChange={(e) => onChangeGender(e)}>
									<input
										id="gender"
										name="gender"
										type="radio"
										required
										value={GenderEnum.Male}
										className="mr-2 appearance-none rounded-full relative border border-gray-300 placeholder-gray-500 text-primary focus:outline-none focus:ring-secondary-400 focus:border-secondary-500 focus:z-10 sm:text-sm"
									/>
									<label htmlFor="gender">Male</label>
									<input
										id="gender"
										name="gender"
										type="radio"
										required
										value={GenderEnum.Female}
										className="mr-2 ml-4 appearance-none rounded-full relative border border-gray-300 placeholder-gray-500 text-primary focus:outline-none focus:ring-secondary-400 focus:border-secondary-500 focus:z-10 sm:text-sm"
									/>
									<label htmlFor="gender">Female</label>
								</div>
								{gender.value === -1 ? (
									<span className="text-xs text-red-600" id="passwordHelp">
										Select your gender.
									</span>
								) : null}
							</div>
						</div>
						<div>
							<button
								type="submit"
								className="text-base shadow group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-white hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-hover duration-500"
							>
								{checkError() ? (
									<span className="absolute left-0 inset-y-0 flex items-center pl-3">
										<LockClosedIcon
											className="h-5 w-5 text-white group-hover:text-primary transition-hover duration-500"
											aria-hidden="true"
										/>
									</span>
								) : (
									<span className="absolute left-0 inset-y-0 flex items-center pl-3">
										<LockOpenIcon
											className="h-5 w-5 text-white group-hover:text-primary transition-hover duration-500"
											aria-hidden="true"
										/>
									</span>
								)}
								Create account
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
