import { useContext, useEffect, useState, type JSX } from "react";

import { Flex } from "@radix-ui/themes";
import clsx from "clsx";

import { usePostList } from "@/hooks/usePostList";
import { PostListContext } from "@/providers/PostListProvider";
import { UserContext } from "@/providers/UserProvider";

import { Post } from "./Post";
// import { Button } from "./ui/button";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationPrevious,
	PaginationLink,
	PaginationNext,
} from "./ui/pagination";

export function PostList(): JSX.Element {
	const { postList, setPostList, postListLength, setPostListLength } =
		useContext(PostListContext);
	const { userInfo } = useContext(UserContext);

	const [page, setPage] = useState(1);

	const getPostList = usePostList(userInfo, setPostList, setPostListLength);

	useEffect(() => {
		getPostList(page);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	const handlePrevButtonClick = () => {
		if (page > 1) setPage(page - 1);
		else setPage(1);
	};

	const handleNextButtonClick = () => {
		if (Math.ceil(postListLength / 10) > page) setPage(page + 1);
		else setPage(page);
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
				{/* <Button variant={"secondary"} onClick={handlePrevButtonClick}>
					Prev
				</Button>
				<Button variant={"secondary"} onClick={handleNextButtonClick}>
					Next
				</Button> */}
				<Pagination className={"select-none"}>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								onClick={handlePrevButtonClick}
							/>
						</PaginationItem>
						{[...Array(Math.ceil(postListLength / 10)).keys()].map(
							(i) => {
								const pageNum = i + 1;
								return (
									<PaginationItem>
										<PaginationLink
											className={clsx(
												pageNum === page && "bg-accent",
											)}
											onClick={() => setPage(pageNum)}
										>
											{pageNum}
										</PaginationLink>
									</PaginationItem>
								);
							},
						)}
						<PaginationItem>
							<PaginationNext onClick={handleNextButtonClick} />
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</Flex>
		</Flex>
	);
}
