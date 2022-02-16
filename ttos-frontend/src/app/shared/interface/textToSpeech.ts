export interface TextToSpeech {
	createdAt: string;
	fileName: string;
	id: string;
	speechURL: any;
	updatedAt: string;
	title: string;
}

export enum INTERNET_STATUS {
	ONLINE = "online",
	OFFLINE = "offline"
}