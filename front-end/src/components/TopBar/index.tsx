import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import StoreIcon from "@mui/icons-material/Store";
import { useCart } from "hooks/useCart";
import { Button, IconButton } from "@material-ui/core";
import CartIcon from "./components/CartIcon";

export default function TopBar() {
	const { openCartDrawer } = useCart();

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position="static"
				style={{ position: "fixed", top: "0", left: "0", zIndex: "1" }}
				sx={{ width: "100%" }}
			>
				<Toolbar sx={{ display: "flex" }}>
					<StoreIcon fontSize="large" sx={{ marginRight: "10px" }} />
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
					>
						Listagem de produtos
					</Typography>

					<Box sx={{ display: { xs: "block", sm: "none" } }}>
						<IconButton aria-label="Abrir carrinho" onClick={openCartDrawer}>
							<CartIcon />
						</IconButton>
					</Box>
					<Box sx={{ display: { xs: "none", sm: "block" } }}>
						<Box sx={{ display: "flex", alignItems: "center" }}>
							<Button size="large" aria-label="Abrir carrinho" onClick={openCartDrawer}>
								<Typography sx={{ mr: 0.5, display: { xs: "none", sm: "inherit" } }}>
									Abrir carrinho
								</Typography>{" "}
								<CartIcon />
							</Button>
						</Box>
					</Box>
				</Toolbar>
			</AppBar>

			<Toolbar />
		</Box>
	);
}
