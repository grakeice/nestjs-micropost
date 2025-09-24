import { useCallback, type Dispatch, type SetStateAction } from "react";

import { getList } from "@/api/post";
import type { Post } from "@/providers/PostListProvider";
import type { UserInfo } from "@/providers/UserProvider";

export function usePostList(
	userInfo: UserInfo,
	setPostList: Dispatch<SetStateAction<Post[]>>,
) {
	return useCallback(async () => {
		const posts = await getList(userInfo.token);
		console.log(posts);

		const postList: Post[] = [];

		if (posts) {
			for (const post of posts) {
				postList.push({
					id: Number(post.id),
					userName: post.user_name,
					content: post.content,
					createdAt: new Date(post.created_at),
				});
			}
			setPostList(postList);
		}
	}, [setPostList, userInfo.token]);
}
