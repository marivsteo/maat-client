import internal from "stream";
import { SkillLevelEnum } from "../enums/skillLevelEnum";
import { SportTypeEnum } from "../enums/sportTypeEnum";
import { IUser } from "./IUser";

export interface ISportEvent {
	id?: number;
	name: string;
	eventTime: Date;
	place: string;
	numberOfParticipatingPlayers: number;
	numberOfPlayersNeeded: number;
	isPayingNeeded: boolean;
	skillLevel: SkillLevelEnum;
	sportType: SportTypeEnum;
	createdBy?: IUser;
}
