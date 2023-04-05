import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useCart } from "hooks/useCart";

export default function CartDrawer() {
	const { cart, isCartDrawerOpen, closeCartDrawer } = useCart();

	const handleKeydown = (event: React.KeyboardEvent) => {
		if (event.key === "Tab" || event.key === "Shift") {
			return;
		}
		closeCartDrawer();
	};

	const CartList = () => (
		<Box sx={{ width: 250 }} role="presentation" onClick={() => closeCartDrawer()} onKeyDown={handleKeydown}>
			<List>
				{cart.map(({ product, quantity }) => (
					<ListItem key={product.id} disablePadding>
						<ListItemText primary={product.name} secondary={`$${product.price}`} />
					</ListItem>
				))}
			</List>
		</Box>
	);

	return (
		<div>
			<Drawer anchor="right" open={isCartDrawerOpen} onClose={closeCartDrawer}>
				<CartList />
			</Drawer>
		</div>
	);
}
