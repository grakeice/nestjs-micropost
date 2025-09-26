import { useContext, useEffect, useState, type JSX } from "react";

import { Flex, Separator } from "@radix-ui/themes";
import clsx from "clsx";
import { RefreshCcw } from "lucide-react";

import { usePostList } from "@/hooks/usePostList";
import { PostListContext } from "@/providers/PostListProvider";
import { UserContext } from "@/providers/UserProvider";

import { Post } from "./Post";
import { Button } from "./ui/button";
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

	const handleReloadButtonClick = () => {
		getPostList(page);
	};

	return (
		<Flex p={"4"} direction={"column"} align={"center"} height={"100%"}>
			<Flex
				direction={"column"}
				width={"100%"}
				overflowY={"scroll"}
				flexGrow={"1"}
				gap={"3"}
			>
				{postList.map((post) => (
					<>
						<Post key={post.id} post={post} />
						<Separator size={"4"} />
					</>
				))}
			</Flex>
			<Flex
				gap={"2"}
				direction={"row"}
				flexGrow={"0"}
				justify={"between"}
				width={"100%"}
			>
				<div className={"w-1/3"}>
					<Button
						onClick={handleReloadButtonClick}
						variant={"ghost"}
						className={"cursor-pointer select-none"}
					>
						<RefreshCcw />
						更新
					</Button>
				</div>
				<Pagination className={"select-none w-1/3 flex-1"}>
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
				<div className={"w-1/3"}></div>
			</Flex>
		</Flex>
	);
}
