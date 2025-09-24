import { useState, type JSX } from "react";

import { useNavigate } from "react-router-dom";
import { Stack } from "styled-system/jsx";

import { signInApi } from "@/api/auth";

export function SignIn(): JSX.Element {
	const navigate = useNavigate();

	const [userId, setUserId] = useState("");
	const [password, setPassword] = useState("");

	const handleSignInClick = async () => {
		console.log("SignIn Button Clicked");
		const res = await signInApi(userId, password);
		if (res.token) {
			navigate("/main");
		}
	};

	return (
		<Stack>
			<div>
				<label htmlFor="id">ID</label>
				<input
					type="text"
					name=""
					id="id"
					value={userId}
					onChange={(e) => setUserId(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="password" id="id">
					Password
				</label>
				<input
					type="text"
					name=""
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<div>
				<button type="button" onClick={handleSignInClick}>
					Login
				</button>
			</div>
		</Stack>
	);
}
