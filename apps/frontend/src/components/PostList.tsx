import {
	useContext,
	useEffect,
	useState,
	type ChangeEvent,
	type KeyboardEvent,
	type JSX,
} from "react";

import { Flex, Separator } from "@radix-ui/themes";
import clsx from "clsx";
import { RefreshCcw, Search } from "lucide-react";
import { useDebounce } from "react-use";
import { toast } from "sonner";

import { usePostList } from "@/hooks/usePostList";
import { PostListContext } from "@/providers/PostListProvider";
import { UserContext } from "@/providers/UserProvider";

import { Post } from "./Post";
import { Button } from "./ui/button";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "./ui/input-group";
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
	const [searchText, setSearchText] = useState("");
	const [isComposing, setIsComposing] = useState(false);

	const { getPostList, setSearchText: setQuery } = usePostList(
		userInfo,
		setPostList,
		setPostListLength,
	);

	useEffect(() => {
		getPostList(page);
	}, [getPostList, page]);

	const handlePrevButtonClick = () => {
		if (page > 1) setPage((prev) => prev - 1);
		else setPage(1);
	};

	const handleNextButtonClick = () => {
		if (Math.ceil(postListLength / 10) > page) setPage((prev) => prev + 1);
		else setPage(page);
	};

	const handleReloadButtonClick = () => {
		getPostList(page);
		toast("ポスト一覧を更新しました");
	};

	useDebounce(
		() => {
			setQuery(searchText);
		},
		1000,
		[searchText],
	);

	const handleSearchFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !isComposing) setQuery(searchText);
	};

	return (
		<Flex
			p={"4"}
			direction={"column"}
			align={"center"}
			height={"100%"}
			position={"relative"}
			gap={"4"}
		>
			<div
				className={
					"flex h-[2rem] w-full flex-0 flex-row items-center gap-2"
				}
			>
				<InputGroup>
					<InputGroupInput
						placeholder={"ポストを検索"}
						name={"search"}
						value={searchText}
						onChange={handleSearchFieldChange}
						onCompositionStart={() => setIsComposing(true)}
						onCompositionEnd={() => setIsComposing(false)}
						onKeyDown={handleKeyDown}
					/>
					<InputGroupAddon>
						<Search />
					</InputGroupAddon>
					<InputGroupAddon align={"inline-end"}>
						<InputGroupButton
							className={"cursor-pointer"}
							onClick={() => setQuery(searchText)}
						>
							検索
						</InputGroupButton>
					</InputGroupAddon>
				</InputGroup>
			</div>
			<div
				className={
					"w-full flex-1 overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100"
				}
			>
				<Flex direction={"column"} width={"100%"} gap={"3"}>
					{postList.map((post) => (
						<div key={post.id}>
							<Post post={post} getPostList={getPostList} />
							<Separator size={"4"} />
						</div>
					))}
				</Flex>
			</div>
			<Flex
				gap={"2"}
				justify={"between"}
				width={"100%"}
				height={"2rem"}
				className={"flex-0"}
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
				<Pagination className={"w-1/3 flex-1 select-none"}>
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
									<PaginationItem key={i}>
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
