import type { Question, Quiz } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ;

interface ApiResponse<T> {
	data?: T;
	error?: string;
}

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		return { error: errorData.error || "An error occurred" };
	}
	const data = await response.json();
	return { data };
}

export const api = {
	quizzes: {
		getAll: async (): Promise<ApiResponse<{ quizzes: Quiz[] }>> => {
			try {
				const response = await fetch(`${API_URL}/users/quizzes`, {
					method: "GET",
					headers: { "Content-Type": "application/json" },
				});
				return handleResponse(response);
			} catch {
				return { error: "Failed to connect to the server" };
			}
		},

		getById: async (id: string): Promise<ApiResponse<{ quizz: Quiz }>> => {
			try {
				const response = await fetch(`${API_URL}/users/quizzes/${id}`);
				return handleResponse(response);
			} catch {
				return { error: "Failed to connect to the server" };
			}
		},

		create: async (data: { title: string }): Promise<ApiResponse<Quiz>> => {
			try {
				const response = await fetch(`${API_URL}/users/quizzes`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data),
				});
				return handleResponse(response);
			} catch {
				return { error: "Failed to connect to the server" };
			}
		},

		delete: async (id: string): Promise<ApiResponse<void>> => {
			try {
				const response = await fetch(`${API_URL}/users/quizzes/${id}`, {
					method: "DELETE",
				});
				return handleResponse(response);
			} catch {
				return { error: "Failed to connect to the server" };
			}
		},
	},

	questions: {
		create: async (data: {
			quiz_id: string;
			text: string;
			type: string;
			order: number;
			options: { text: string; is_correct: boolean }[];
		}): Promise<ApiResponse<Question>> => {
			try {
				const response = await fetch(`${API_URL}/users/questions`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data),
				});
				return handleResponse(response);
			} catch {
				return { error: "Failed to connect to the server" };
			}
		},

		delete: async (id: string): Promise<ApiResponse<void>> => {
			try {
				const response = await fetch(`${API_URL}/users/questions/${id}`, {
					method: "DELETE",
				});
				return handleResponse(response);
			} catch {
				return { error: "Failed to connect to the server" };
			}
		},
	},
};
