import {
	createContext,
	useState,
	type Dispatch,
	type JSX,
	type ReactNode,
	type SetStateAction,
} from "react";

interface UserInfo {
	id: number;
	token: string;
}

interface IUserContext {
	userInfo: UserInfo;
	setUserInfo: Dispatch<SetStateAction<UserInfo>>;
}

interface UserProviderProps {
	children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext({} as IUserContext);

export function UserProvider({ ...props }: UserProviderProps): JSX.Element {
	const { children } = props;
	const [userInfo, setUserInfo] = useState<UserInfo>({ id: 0, token: "" });
	return (
		<UserContext.Provider value={{ userInfo, setUserInfo }}>
			{children}
		</UserContext.Provider>
	);
}
