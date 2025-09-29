/* eslint-disable react-refresh/only-export-components */
import {
	createContext,
	useState,
	type Dispatch,
	type JSX,
	type ReactNode,
	type SetStateAction,
} from "react";

export interface UserInfo {
	id: number;
	token: string;
}

interface UserContext {
	userInfo: UserInfo;
	setUserInfo: Dispatch<SetStateAction<UserInfo>>;
}

interface UserProviderProps {
	children: ReactNode;
}

export const UserContext = createContext({} as UserContext);

export function UserProvider({ ...props }: UserProviderProps): JSX.Element {
	const { children } = props;
	const getUserInfoFromCookie = (): UserInfo => {
		const cookies = Object.fromEntries(
			document.cookie.split("; ").map((c) => c.split("=")),
		);
		const id = cookies.user_id ? Number(cookies.user_id) : 0;
		const token = cookies.token || "";
		return { id, token };
	};
	const [userInfo, setUserInfo] = useState<UserInfo>(getUserInfoFromCookie());
	return (
		<UserContext.Provider value={{ userInfo, setUserInfo }}>
			{children}
		</UserContext.Provider>
	);
}
