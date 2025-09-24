import type { JSX } from "react";

import { Route, Routes } from "react-router-dom";

import Main from "./pages/main";
import SignIn from "./pages/signin";

function App(): JSX.Element {
	return (
		<>
			<Routes>
				<Route path="/" element={<SignIn />} />
				<Route path="/main" element={<Main />} />
			</Routes>
		</>
	);
}

export default App;
