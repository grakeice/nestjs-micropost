import {
	useCallback,
	useState,
	type Dispatch,
	type SetStateAction,
} from "react";

import type { Post } from "@/providers/PostListProvider";
import type { UserInfo } from "@/providers/UserProvider";
import { getList } from "@/services/post";

export function usePostList(
	userInfo: UserInfo,
	setPostList: Dispatch<SetStateAction<Post[]>>,
	setPostListLength: Dispatch<SetStateAction<number>>,
) {
	const [searchText, setSearchText] = useState("");

	return {
		getPostList: useCallback(
			async (page: number = 1) => {
				const data = await getList(
					userInfo.token,
					(page - 1) * 10,
					searchText,
				);

				const posts = data.posts;

				const postList: Post[] = [];

				// console.log(data.length);

				if (posts) {
					for (const post of posts) {
						postList.push({
							id: Number(post.id),
							userId: Number(post.user_id),
							userName: post.user_name,
							content: post.content,
							createdAt: new Date(post.created_at),
						});
					}
					setPostList(postList);
					setPostListLength(data.length);
				}
			},
			[searchText, setPostList, setPostListLength, userInfo.token],
		),
		setSearchText,
	};
}
