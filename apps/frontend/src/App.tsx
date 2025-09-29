import type { JSX } from "react";

import { Route, Routes } from "react-router-dom";

import Main from "./pages/main";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import { UserProvider } from "./providers/UserProvider";

function App(): JSX.Element {
	return (
		<>
			<UserProvider>
				<Routes>
					<Route path="/" element={<SignIn />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/main" element={<Main />} />
				</Routes>
			</UserProvider>
		</>
	);
}

export default App;
