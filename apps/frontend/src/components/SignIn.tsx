import { useContext, useState, type JSX } from "react";

import { useNavigate } from "react-router-dom";

import { UserContext } from "@/providers/UserProvider";
import { signInApi } from "@/services/auth";

export function SignIn(): JSX.Element {
	const navigate = useNavigate();

	const [userId, setUserId] = useState("");
	const [password, setPassword] = useState("");

	const { setUserInfo } = useContext(UserContext);

	const handleSignInClick = async () => {
		console.log("SignIn Button Clicked");
		const ret = await signInApi(userId, password);
		if (ret.token) {
			setUserInfo({ id: ret.user_id, token: ret.token });
			navigate("/main");
		}
	};

	return (
		<div className="bg-gray-100 flex flex-col m-20 pt-2 pb-2 rounded-lg shadow-md max-w-md mx-auto">
			<div className="flex flex-row justify-center my-1">
				<span className="inline-block w-1/3 align-top ml-1 text-right">
					<label htmlFor="id" className="w-full">
						ID
					</label>
				</span>
				<span className="inline-block w-2/3 align-top ml-1">
					<input
						type="text"
						id="id"
						value={userId}
						onChange={(e) => setUserId(e.target.value)}
						className="bg-white w-1/2 border border-black px-2 py-1 rounded"
					/>
				</span>
			</div>
			<div className="flex flex-row justify-center my-1">
				<span className="inline-block w-1/3 align-top ml-1 text-right">
					<label htmlFor="password" className="w-full">
						Password
					</label>
				</span>
				<span className="inline-block w-2/3 align-top ml-1">
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="bg-white w-1/2 border border-black px-2 py-1 rounded"
					/>
				</span>
			</div>
			<div className="flex flex-row justify-center my-1">
				<button
					type="button"
					onClick={handleSignInClick}
					className="bg-gray-700 text-gray-100 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
				>
					Login
				</button>
			</div>
		</div>
	);
}
