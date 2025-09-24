/* eslint-disable react-refresh/only-export-components */
import {
	createContext,
	useState,
	type Dispatch,
	type JSX,
	type ReactNode,
	type SetStateAction,
} from "react";

export interface Post {
	id: number;
	userName: string;
	content: string;
	createdAt: Date;
}

interface PostListContext {
	postList: Post[];
	setPostList: Dispatch<SetStateAction<Post[]>>;
}

interface PostListContentProps {
	children: ReactNode;
}

export const PostListContext = createContext({} as PostListContext);

export function PostListProvider({
	...props
}: PostListContentProps): JSX.Element {
	const { children } = props;
	const [postList, setPostList] = useState<Post[]>([]);

	return (
		<PostListContext.Provider value={{ postList, setPostList }}>
			{children}
		</PostListContext.Provider>
	);
}
