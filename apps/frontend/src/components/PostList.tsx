import { useContext, useEffect, type JSX } from "react";

import { usePostList } from "@/hooks/usePostList";
import { PostListContext } from "@/providers/PostListProvider";
import { UserContext } from "@/providers/UserProvider";

import { Post } from "./Post";

export function PostList(): JSX.Element {
	const { postList, setPostList } = useContext(PostListContext);
	const { userInfo } = useContext(UserContext);

	const getPostList = usePostList(userInfo, setPostList);

	useEffect(() => {
		getPostList();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<p>PostList</p>
			{postList.map((post) => (
				<Post key={post.id} post={post} />
			))}
		</div>
	);
}
