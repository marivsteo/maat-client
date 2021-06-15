import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home";
import Error from "./components/error";
import About from "./components/about";
import Header from "./components/header";
import Login from "./components/login";
import Signup from "./components/signup";
import Events from "./components/events";
import Profile from "./components/profile";
import AddEvent from "./components/addEvent";
import { IUser } from "./interfaces/IUser";
import { url } from "./resources/constants";
import MyEvents from "./components/myEvents";
import EventsCreatedByMe from "./components/eventsCreatedByMe";
import ParticipatingEvents from "./components/participatingEvents";
import EventPage from "./components/eventPage";
import Footer from "./components/footer";

function App() {
	const [username, setUsername] = useState("");

	useEffect(() => {
		(async () => {
			const response = await fetch(`${url}/auth/user`, {
				headers: { "Content-Type": "application/json" },
				credentials: "include",
			});

			const content = await response.json();
			setUsername(content.username);
		})();
	}, []);

	return (
		<Router>
			<div>
				<Header username={username} setUsername={setUsername} />
				<div className="min-h-screen flex-grow">
					<Switch>
						<Route path="/" exact>
							<Home username={username} />
						</Route>
						<Route path="/about" exact>
							<About />
						</Route>
						<Route path="/signup" exact>
							<Signup />
						</Route>
						<Route path="/login" exact>
							<Login setUsername={setUsername} />
						</Route>
						<Route path="/events" exact>
							<Events username={username} />
						</Route>
						<Route path="/profile" exact>
							<Profile />
						</Route>
						<Route path="/add_event" exact>
							<AddEvent />
						</Route>
						<Route path="/my_events" exact>
							<MyEvents />
						</Route>
						<Route path="/created_by_me" exact>
							<EventsCreatedByMe />
						</Route>
						<Route path="/participating" exact>
							<ParticipatingEvents />
						</Route>
						<Route path="/event/:id">
							<EventPage />
						</Route>
						<Route component={Error} />
					</Switch>
				</div>
				{/* <Footer /> */}
			</div>
		</Router>
	);
}

export default App;
