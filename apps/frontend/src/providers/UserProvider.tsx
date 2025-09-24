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
	const [userInfo, setUserInfo] = useState<UserInfo>({ id: 0, token: "" });
	return (
		<UserContext.Provider value={{ userInfo, setUserInfo }}>
			{children}
		</UserContext.Provider>
	);
}
