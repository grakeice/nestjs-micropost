import { StrictMode } from "react";

import { Theme } from "@radix-ui/themes";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Theme>
			<BrowserRouter>
				<App />
				<Toaster position={"top-center"} richColors />
			</BrowserRouter>
		</Theme>
	</StrictMode>,
);
