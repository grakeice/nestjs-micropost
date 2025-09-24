import { useContext, useState, type JSX } from "react";

import { useNavigate } from "react-router-dom";
import { css } from "styled-system/css";
import { styled } from "styled-system/jsx";

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
		<SSignInFrame>
			<SSignInRow>
				<SSignInLabel>
					<label htmlFor="id" className={css({ w: "full" })}>
						ID
					</label>
				</SSignInLabel>
				<SSignInInput>
					<input
						type="text"
						name=""
						id="id"
						value={userId}
						onChange={(e) => setUserId(e.target.value)}
						className={css({
							bg: "white",
							w: "1/2",
							border: "black solid 1px",
						})}
					/>
				</SSignInInput>
			</SSignInRow>
			<SSignInRow>
				<SSignInLabel>
					<label
						htmlFor="password"
						id="id"
						className={css({ w: "full" })}
					>
						Password
					</label>
				</SSignInLabel>
				<SSignInInput>
					<input
						type="text"
						name=""
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className={css({
							bg: "white",
							w: "1/2",
							border: "black solid 1px",
						})}
					/>
				</SSignInInput>
			</SSignInRow>
			<SSignInRow>
				<SLoginButton type="button" onClick={handleSignInClick}>
					Login
				</SLoginButton>
			</SSignInRow>
		</SSignInFrame>
	);
}

const SSignInFrame = styled("div", {
	base: {
		bgColor: "#f8f8f8",
		display: "flex",
		flexDir: "column",
		m: "80px",
		pt: "8px",
		pb: "8px",
		borderRadius: "8px",
		boxShadow: "0 8px 8px #aaa",
	},
});

const SSignInRow = styled("div", {
	base: {
		display: "flex",
		flexDir: "row",
		justifyContent: "center",
		mt: "4px",
		mb: "4px",
	},
});

const SSignInLabel = styled("span", {
	base: {
		display: "inline-block",
		w: "1/3",
		verticalAlign: "top",
		ml: "4px",
		textAlign: "right",
	},
});

const SSignInInput = styled("span", {
	base: {
		display: "inline-block",
		w: "2/3",
		verticalAlign: "top",
		ml: "4px",
	},
});

const SLoginButton = styled("button", {
	base: {
		bgColor: "#444",
		color: "#f0f0f0",
		p: "4px 16px",
		borderRadius: "8px",
	},
});
