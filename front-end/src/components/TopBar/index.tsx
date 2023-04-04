import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Tooltip, Zoom } from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";

export default function TopBar() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" style={{ position: "fixed", top: "0", left: "0" }}>
				<Toolbar>
					<StoreIcon fontSize="large" sx={{ marginRight: "10px" }} />
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
					>
						Listagem de produtos
					</Typography>
					<Tooltip enterNextDelay={200} title={"Abrir carrinho"} TransitionComponent={Zoom}>
						<IconButton size="large" edge="end" color="inherit" aria-label="Abrir carrinho" sx={{ mr: 2 }}>
							<ShoppingCartIcon />
						</IconButton>
					</Tooltip>
				</Toolbar>
			</AppBar>
			<Toolbar />
		</Box>
	);
}
