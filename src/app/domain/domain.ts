export class AdEditorInput {
	headline1: string;
	headline2: string;
	url: string;
	description: string;
}

export class AdEditorOutput {
	adgroup: string;
	headline1: string;
	headline2: string;
	url: string;
	description: string;
}

export class AdGroup {
	volume: number;
	theme: string;
	id: number;
	name: string;
}