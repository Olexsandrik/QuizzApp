import { useState } from "react";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="bg-red-500 w-full h-screen">
			<h1>Hello World</h1>
		</div>
	);
}

export default App;
