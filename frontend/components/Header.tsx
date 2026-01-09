interface HeaderProps {
	handleCreateQuiz: () => void;
}

const Header = ({ handleCreateQuiz }: HeaderProps) => {
	return (
		<header className="bg-white border-b">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center text-center">
				<h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
					QuiApplication
				</h1>
				<p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
					Create and manage your quizzes easily. Test your knowledge or
					challenge others.
				</p>
				<div className="mt-8">
					<button
						type="button"
						onClick={handleCreateQuiz}
						className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
					>
						+ Create New Quiz
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
