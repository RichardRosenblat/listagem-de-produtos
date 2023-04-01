import { createTheme } from "@mui/material";

export const themeOptions = {
	palette: {
		type: "light",
		primary: {
			main: "#77c5e4",
		},
		secondary: {
			main: "#e49677",
		},
	},
	props: {
		MuiTooltip: {
			arrow: true,
		},
	},
	shape: {
		borderRadius: 4,
	},
};

export const theme = createTheme(themeOptions);
