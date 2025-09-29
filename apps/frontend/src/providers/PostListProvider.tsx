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
	userId: number;
	userName: string;
	content: string;
	createdAt: Date;
}

interface PostListContext {
	postList: Post[];
	setPostList: Dispatch<SetStateAction<Post[]>>;
	postListLength: number;
	setPostListLength: Dispatch<SetStateAction<number>>;
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
	const [postListLength, setPostListLength] = useState(0);

	return (
		<PostListContext.Provider
			value={{ postList, setPostList, postListLength, setPostListLength }}
		>
			{children}
		</PostListContext.Provider>
	);
}
