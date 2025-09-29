import { useContext, useState, type ComponentProps, type JSX } from "react";

import clsx from "clsx";
import { Trash } from "lucide-react";

import type { Post } from "@/providers/PostListProvider";
import { UserContext } from "@/providers/UserProvider";
import { deletePost } from "@/services/post";

import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface PostProps extends ComponentProps<"div"> {
	post: Post;
	getPostList: (page?: number) => Promise<void>;
}

export function Post({ ...props }: PostProps): JSX.Element {
	const { post, getPostList, ..._props } = props;

	const { userInfo } = useContext(UserContext);

	const [isPopoverOpen, setIsPopoverOpen] = useState(false);

	const formatDate = (dateObj: Date) => {
		const dateOption = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		} satisfies Intl.DateTimeFormatOptions;

		return dateObj.toLocaleDateString("ja", dateOption);
	};

	const handleCancelDeleteButtonClick = () => setIsPopoverOpen(false);

	const handleDeleteButtonClick = async () => {
		try {
			await deletePost({ token: userInfo.token, messageId: post.id });
		} catch (e) {
			console.error(e);
		} finally {
			setIsPopoverOpen(false);
			getPostList();
		}
	};

	return (
		<div
			{..._props}
			className={"group mb-3 flex border-gray-300 pl-2 text-left"}
		>
			<div className={"flex flex-col gap-1"}>
				<div className={"flex w-full flex-row gap-2"}>
					<div className="text-sm font-semibold text-blue-900">
						{post.userName}
					</div>
					<div className="text-sm text-blue-900">
						{formatDate(post.createdAt)}
					</div>
				</div>
				<div className="text-base whitespace-pre-wrap text-gray-800">
					{post.content}
				</div>
			</div>
			<div
				className={clsx(
					isPopoverOpen ? "visible" : "invisible",
					"right-0 flex flex-1 items-start justify-end group-hover:visible",
				)}
			>
				<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
					<PopoverTrigger asChild>
						{post.userId === userInfo.id && (
							<Button
								variant={"ghost"}
								size={"icon"}
								className={clsx(
									isPopoverOpen && "text-red-500",
									"cursor-pointer hover:text-red-500",
								)}
							>
								<Trash />
							</Button>
						)}
					</PopoverTrigger>
					<PopoverContent>
						<Alert
							className={"border-none"}
							variant={"destructive"}
						>
							<AlertTitle>削除しますか？</AlertTitle>
							<AlertDescription>
								この操作は取り消せません
								<div
									className={
										"flex w-full flex-row justify-end gap-1"
									}
								>
									<Button
										variant={"destructive"}
										className={"cursor-pointer"}
										onClick={handleDeleteButtonClick}
									>
										削除
									</Button>
									<Button
										variant={"ghost"}
										className={"cursor-pointer text-black"}
										onClick={handleCancelDeleteButtonClick}
									>
										キャンセル
									</Button>
								</div>
							</AlertDescription>
						</Alert>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
}
