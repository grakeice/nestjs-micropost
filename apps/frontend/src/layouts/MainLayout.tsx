import { Contents } from "@/components/Contents";
import { Header } from "@/components/Header";
import { SideBar } from "@/components/SideBar";

export function Layout() {
	return (
		<>
			<div className="w-full h-8 shadow-md">
				<Header />
			</div>
			<div className="w-full h-[calc(100vh-32px)] flex flex-row">
				<div className="border-r border-gray-900 w-1/3 h-full">
					<SideBar />
				</div>
				<div className="w-full h-full">
					<Contents />
				</div>
			</div>
		</>
	);
}
