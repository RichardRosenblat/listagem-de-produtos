import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./styles/theme";
import ProductList from "./pages/ProductsList";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<RecoilRoot>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<ProductList />
				<Toaster position="bottom-right" />
			</ThemeProvider>
		</RecoilRoot>
	</React.StrictMode>
);
