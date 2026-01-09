"use client";

interface ConfirmModalProps {
	isOpen: boolean;
	title: string;
	message: string;
	confirmLabel?: string;
	cancelLabel?: string;
	onConfirm: () => void;
	onCancel: () => void;
	isLoading?: boolean;
}

const ConfirmModal = ({
	isOpen,
	title,
	message,
	confirmLabel = "Delete",
	cancelLabel = "Cancel",
	onConfirm,
	onCancel,
	isLoading = false,
}: ConfirmModalProps) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
			<div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
				<div className="p-6">
					<div className="flex items-center gap-4 mb-4">
						<div className="shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
							<svg
								className="w-5 h-5 text-red-600"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
								/>
							</svg>
						</div>
						<div>
							<h3 className="text-lg font-semibold text-gray-900">{title}</h3>
							<p className="text-sm text-gray-500 mt-1">{message}</p>
						</div>
					</div>

					<div className="flex gap-3 justify-end">
						<button
							type="button"
							onClick={onCancel}
							disabled={isLoading}
							className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
						>
							{cancelLabel}
						</button>
						<button
							type="button"
							onClick={onConfirm}
							disabled={isLoading}
							className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
						>
							{isLoading && (
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
							{confirmLabel}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConfirmModal;
