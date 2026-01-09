export interface Option {
	id?: string;
	text: string;
	is_correct: boolean;
}

export interface Question {
	id: string;
	text: string;
	type: "boolean" | "input" | "checkbox";
	order?: number;
	options: Option[];
}

export interface Quiz {
	id: string;
	title: string;
	created_at: string;
	questions?: Question[];
}
