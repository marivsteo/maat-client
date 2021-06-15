import { GenderEnum } from "../enums/genderEnum";

export interface IUser {
	username: string;
	email: string;
	dateOfBirth: string;
	gender: GenderEnum;
}
