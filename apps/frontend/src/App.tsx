import type { JSX } from "react";

import { Route, Routes } from "react-router-dom";

import MainPage from "./pages/main";
import SignInPage from "./pages/signin";
import SignUpPage from "./pages/signup";
import UserPage from "./pages/user";
import { UserProvider } from "./providers/UserProvider";

function App(): JSX.Element {
	return (
		<>
			<UserProvider>
				<Routes>
					<Route path="/" element={<SignInPage />} />
					<Route path="/signup" element={<SignUpPage />} />
					<Route path="/main" element={<MainPage />} />
					<Route path="/user" element={<UserPage />} />
				</Routes>
			</UserProvider>
		</>
	);
}

export default App;
