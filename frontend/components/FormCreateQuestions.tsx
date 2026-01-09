import type { QuestionFormData } from "@/lib/schema";
import type {
	Control,
	FieldArrayWithId,
	FieldErrors,
	UseFormHandleSubmit,
} from "react-hook-form";
import InputValidation from "./InputValidation";

interface FormCreateQuestionsProps {
	handleSubmit: UseFormHandleSubmit<QuestionFormData>;
	onSubmit: (data: QuestionFormData) => void;
	onClose: () => void;
	control: Control<QuestionFormData>;
	errors: FieldErrors<QuestionFormData>;
	fields: FieldArrayWithId<QuestionFormData, "options", "id">[];
	append: (value: { text: string; is_correct: boolean }) => void;
	remove: (index: number) => void;
	submitting: boolean;
}

const FormCreateQuestions = ({
	handleSubmit,
	onSubmit,
	onClose,
	control,
	errors,
	fields,
	append,
	remove,
	submitting,
}: FormCreateQuestionsProps) => {
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
			<InputValidation
				name="text"
				control={control}
				label="Question Text"
				placeholder="What is the capital of France?"
				error={errors.text?.message}
			/>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label
						htmlFor="type"
						className="block text-sm font-medium text-gray-900 mb-1"
					>
						Question Type
					</label>
					<select
						{...control.register("type")}
						id="type"
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-900"
					>
						<option value="boolean">Boolean (True/False)</option>
						<option value="input">Input (Short Answer)</option>
						<option value="checkbox">Multiple Choice</option>
					</select>
					{errors.type && (
						<p className="mt-1 text-sm text-red-500">{errors.type.message}</p>
					)}
				</div>
			</div>

			<div>
				<div className="flex items-center justify-between mb-3">
					<p className="block text-sm font-medium text-gray-900">Options</p>
					<button
						type="button"
						onClick={() => append({ text: "", is_correct: false })}
						className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
					>
						<svg
							className="w-4 h-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 4v16m8-8H4"
							/>
						</svg>
						Add Option
					</button>
				</div>
				{errors.options?.root && (
					<p className="mb-2 text-sm text-red-500">
						{errors.options.root.message}
					</p>
				)}
				<div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
					{fields.map((field, index) => (
						<div key={field.id} className="flex flex-col gap-1">
							<div className="flex items-center gap-3">
								<div className="flex items-center h-5">
									<input
										type="checkbox"
										{...control.register(`options.${index}.is_correct`)}
										id={`option-correct-${index}`}
										className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
									/>
								</div>
								<div className="flex-1">
									<input
										{...control.register(`options.${index}.text`)}
										placeholder={`Option ${index + 1}`}
										aria-label={`Option ${index + 1} text`}
										className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-900 ${
											errors.options?.[index]?.text
												? "border-red-500"
												: "border-gray-300"
										}`}
									/>
								</div>
								{fields.length > 2 && (
									<button
										type="button"
										onClick={() => remove(index)}
										className="p-2 text-gray-500 hover:text-red-500 transition-colors"
									>
										<svg
											className="w-5 h-5"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											aria-hidden="true"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
											/>
										</svg>
									</button>
								)}
							</div>
							{errors.options?.[index]?.text && (
								<p className="ml-8 text-xs text-red-500">
									{errors.options[index].text.message}
								</p>
							)}
							{errors.options?.[index]?.is_correct && (
								<p className="ml-8 text-xs text-red-500">
									{errors.options[index].is_correct.message}
								</p>
							)}
						</div>
					))}
				</div>
			</div>

			<div className="flex justify-end gap-3 pt-4 border-t">
				<button
					type="button"
					onClick={onClose}
					className="px-6 py-2 border border-gray-300 rounded-lg text-gray-900 hover:bg-gray-50 font-medium transition-colors"
				>
					Cancel
				</button>
				<button
					type="submit"
					disabled={submitting}
					className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-sm transition-colors disabled:opacity-50 flex items-center gap-2"
				>
					{submitting && (
						<svg
							className="animate-spin h-4 w-4 text-white"
							fill="none"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							/>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							/>
						</svg>
					)}
					{submitting ? "Saving..." : "Save Question"}
				</button>
			</div>
		</form>
	);
};

export default FormCreateQuestions;
