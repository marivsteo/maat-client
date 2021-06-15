import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<footer className="footer bg-primary w-full pt-1 font-inter text-white mb-auto mt-20">
			<div className="container mx-auto px-6">
				<div className="sm:flex sm:mt-8">
					<div className="mt-8 sm:mt-0 sm:w-full sm:px-8 flex flex-col justify-evenly">
						<div className="flex flex-col">
							<Link to="/">
								<img className="mt-10 mx-auto w-44" src={`/images/footer.png`} alt="" />
							</Link>
						</div>
						<div className="flex mt-10 mx-auto flex-col md:flex-row">
							<span className="sm:my-2 md:mx-4">
								<Link to="/about" className="text-white-700 text-md hover:text-white-500">
									About
								</Link>
							</span>
							<span className="sm:my-2 md:mx-4">
								<p className="text-white-700 text-md hover:text-white-500">
									Terms and conditions (Soon)
								</p>
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className="container mx-auto px-6">
				<div className="mt-16 border-gray-300 flex flex-col items-center">
					<div className="sm:w-2/3 text-center py-6">
						<p className="text-sm text-white-700 font-bold mb-2">© 2021 by Marius Teodorescu</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
