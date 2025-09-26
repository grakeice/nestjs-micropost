import { useCallback, type Dispatch, type SetStateAction } from "react";

import type { Post } from "@/providers/PostListProvider";
import type { UserInfo } from "@/providers/UserProvider";
import { getList } from "@/services/post";

export function usePostList(
	userInfo: UserInfo,
	setPostList: Dispatch<SetStateAction<Post[]>>,
) {
	return useCallback(
		async (page: number = 1) => {
			const posts = await getList(userInfo.token, (page - 1) * 10 + 1);
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
		},
		[setPostList, userInfo.token],
	);
}
