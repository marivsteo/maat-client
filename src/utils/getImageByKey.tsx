import Football from "../images/football.jpg";
import Tennis from "../images/carles-rabada-IMNKkZfzsSI-unsplash.jpg";
import Running from "../images/annie-spratt-Lrrm6QckuVY-unsplash.jpg";
import TableTennis from "../images/muhammadtaha-ibrahim-ma-aji-1hr9xOxdypM-unsplash.jpg";
import Rugby from "../images/quino-al-kaNE9Xv1KHE-unsplash.jpg";
import Gym from "../images/bruce-mars-tj27cwu86Wk-unsplash.jpg";
import Basketball from "../images/daniel-mccullough-o86AuYXPDB8-unsplash.jpg";
import Squash from "../images/sven-mieke-T8FtYThew0w-unsplash.jpg";
import Volleyball from "../images/wan-san-yip-KbgCIJ0watM-unsplash.jpg";
import Cycling from "../images/hannes-glockl-5-3-Rjd0d_U-unsplash.jpg";

const images: { [key: string]: any } = {
	Football,
	Tennis,
	Running,
	TableTennis,
	Rugby,
	Gym,
	Basketball,
	Squash,
	Volleyball,
	Cycling,
};

export default function getImageByKey(key: string) {
	return images[key];
}
