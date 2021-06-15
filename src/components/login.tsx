import Header from "./header";
import { Link, NavLink, Redirect } from "react-router-dom";
import { SyntheticEvent, useState } from "react";
import { url } from "../resources/constants";
import { IUser } from "../interfaces/IUser";

export default function Login(props: { setUsername: (username: string) => void }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [loginError, setLoginError] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const [user, setUser] = useState<IUser>({ username: "", email: "", dateOfBirth: "", gender: -1 });

	function checkValues(): boolean {
		if (email === "") {
			setEmailError(true);
			return false;
		}
		if (password === "") {
			setPasswordError(true);
			return false;
		}
		setEmailError(false);
		setPasswordError(false);
		return true;
	}

	const submit = async (e: SyntheticEvent) => {
		e.preventDefault();
		if (checkValues() === true) {
			const response = await fetch(`${url}/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({
					email,
					password,
				}),
			});

			if (response.status === 400) {
				setLoginError(true);
				props.setUsername("");
			} else if (response.status === 200) {
				const content = await response.json();
				props.setUsername(content.username);

				setRedirect(true);
			}
		}
	};

	if (redirect) {
		return <Redirect to="/" />;
	}

	return (
		<div className="min-h-screen mb-20">
			{loginError === true ? (
				<div className="bg-white text-center py-4 lg:px-4">
					<div
						className="p-2 bg-red-500 items-center text-white leading-none lg:rounded-full flex lg:inline-flex"
						role="alert"
					>
						<span className="flex rounded-full bg-red-200 uppercase px-2 py-1 text-xs font-bold mr-3 text-black">
							Error
						</span>
						<span className="font-semibold mr-2 text-left flex-auto">Incorrect email or password</span>
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
							To continue, log in to Ma'at.
						</h2>
						<p className="mt-2 text-center text-sm text-gray-600">
							Don't have an account?{" "}
							<NavLink to="/signup" className="font-medium text-secondary-500 hover:text-secondary-400">
								Sign up for Ma'at.
							</NavLink>
						</p>
					</div>
					<form className="mt-8 space-y-6" onSubmit={submit}>
						<input type="hidden" name="remember" defaultValue="true" />
						<div className="rounded-md">
							<div className="mb-4">
								<label htmlFor="email-address">Email address</label>
								<input
									id="email-address"
									name="email"
									type="email"
									autoComplete="email"
									required
									className="mt-2 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-secondary-400 focus:border-secondary-500 focus:z-10 sm:text-sm"
									placeholder="Email address"
									onChange={(e) => setEmail(e.target.value)}
									onBlur={(e) => {
										if (e.target.value === "") {
											setEmailError(true);
										} else {
											setEmailError(false);
										}
									}}
								/>
								{emailError === true ? (
									<span className="text-xs text-red-600" id="passwordHelp">
										Please enter your email address.
									</span>
								) : null}
							</div>
							<div className="mb-4">
								<label htmlFor="password">Password</label>
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									className="mt-2 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-secondary-400 focus:border-secondary-500 focus:z-10 sm:text-sm"
									placeholder="Password"
									onChange={(e) => setPassword(e.target.value)}
									onBlur={(e) => {
										if (e.target.value === "") {
											setPasswordError(true);
										} else {
											setPasswordError(false);
										}
									}}
								/>
								{passwordError === true ? (
									<span className="text-xs text-red-600" id="passwordHelp">
										Please enter your password.
									</span>
								) : null}
							</div>
						</div>
						<div>
							<button
								type="submit"
								className="text-base shadow group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-white hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-hover duration-500"
							>
								Log in
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
