"use client";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";

interface InputValidationProps<T extends FieldValues> {
	name: Path<T>;
	control: Control<T>;
	label?: string;
	placeholder?: string;
	type?: string;
	error?: string;
}

const InputValidation = <T extends FieldValues>({
	name,
	control,
	label,
	placeholder,
	type = "text",
	error,
}: InputValidationProps<T>) => {
	return (
		<div className="w-full">
			{label && (
				<label
					htmlFor={name}
					className="block text-sm font-medium text-gray-900 mb-1"
				>
					{label}
				</label>
			)}
			<Controller
				control={control}
				name={name}
				render={({ field }) => (
					<input
						{...field}
						value={field.value ?? ""}
						id={name}
						type={type}
						placeholder={placeholder}
						className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-900 ${
							error ? "border-red-500" : "border-gray-300"
						}`}
					/>
				)}
			/>
			{error && <p className="mt-1 text-sm text-red-500">{error}</p>}
		</div>
	);
};

export default InputValidation;
