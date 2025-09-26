import { useContext, useEffect, useState, type JSX } from "react";

import { Flex } from "@radix-ui/themes";

import { usePostList } from "@/hooks/usePostList";
import { PostListContext } from "@/providers/PostListProvider";
import { UserContext } from "@/providers/UserProvider";

import { Post } from "./Post";
import { Button } from "./ui/button";

export function PostList(): JSX.Element {
	const { postList, setPostList } = useContext(PostListContext);
	const { userInfo } = useContext(UserContext);

	const [page, setPage] = useState(1);

	const getPostList = usePostList(userInfo, setPostList);

	useEffect(() => {
		getPostList(page);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	const handlePrevButtonClick = () => {
		setPage((prev) => (prev > 1 ? prev - 1 : 1));
	};

	const handleNextButtonClick = () => {
		setPage((prev) => prev + 1);
	};
	return (
		<Flex py={"4"} direction={"column"} align={"center"} height={"100%"}>
			<Flex
				direction={"column"}
				width={"100%"}
				overflowY={"scroll"}
				flexGrow={"1"}
			>
				{postList.map((post) => (
					<Post key={post.id} post={post} />
				))}
			</Flex>
			<Flex gap={"2"} direction={"row"} flexGrow={"0"}>
				<Button variant={"secondary"} onClick={handlePrevButtonClick}>
					Prev
				</Button>
				<Button variant={"secondary"} onClick={handleNextButtonClick}>
					Next
				</Button>
			</Flex>
		</Flex>
	);
}
