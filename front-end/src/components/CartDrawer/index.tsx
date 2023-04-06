import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import { useCart } from "hooks/useCart";
import { Button } from "@material-ui/core";
import { formatPrice } from "util/formatPrice";
import { IProduct } from "types/Product";
import { toast } from "react-hot-toast";

export default function CartDrawer() {
	const { cart, isCartDrawerOpen, closeCartDrawer, clearCart, addToCart, removeFromCart, getTotal } = useCart();

	const handleKeydown = (event: React.KeyboardEvent) => {
		if (event.key === "Tab" || event.key === "Shift") {
			return;
		}
		closeCartDrawer();
	};

	const handleClick = (callback: (event: React.MouseEvent) => void = () => {}) => {
		return (event: React.MouseEvent) => {
			event.stopPropagation();
			callback(event);
		};
	};

	const handleRemoveProductClick = (product: IProduct) =>
		handleClick(() => {
			toast.success("Produto removido do carrinho", { position: "bottom-left" });
			removeFromCart(product);
		});
	const handleAddProductClick = (product: IProduct) =>
		handleClick(() => {
			toast.success("Produto adicionado ao carrinho", { position: "bottom-left" });
			addToCart(product);
		});
	const handleClearCartClick = () =>
		handleClick(() => {
			toast.success("Carrinho limpo", { position: "bottom-left" });
			clearCart();
		});

	const CartList = () => (
		<Box sx={{ width: 300 }} role="presentation" onClick={() => closeCartDrawer()} onKeyDown={handleKeydown}>
			<List onClick={handleClick()}>
				{cart.map(({ product, quantity }) => (
					<ListItem key={product.id}>
						<ListItemText primary={product.name} secondary={formatPrice(product.price)} />
						<IconButton aria-label="remover" onClick={handleRemoveProductClick(product)}>
							<RemoveIcon />
						</IconButton>
						<Typography component="span" sx={{ ml: 1, mr: 1 }}>
							{quantity}
						</Typography>
						<IconButton aria-label="adicionar" onClick={handleAddProductClick(product)}>
							<AddIcon />
						</IconButton>
					</ListItem>
				))}
				<ListItem>
					<ListItemText primary="Total" />
					<Typography component="span" variant="subtitle1">
						{formatPrice(getTotal())}
					</Typography>
				</ListItem>
			</List>
			<Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
				<Button
					startIcon={<DeleteIcon />}
					color={"secondary"}
					aria-label="clear cart"
					onClick={handleClearCartClick()}
				>
					Limpar carrinho
				</Button>
			</Box>
		</Box>
	);

	return (
		<Drawer anchor="right" open={isCartDrawerOpen} onClose={closeCartDrawer}>
			<Box sx={{ width: 300 }}>
				<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
					<IconButton onClick={closeCartDrawer}>
						<CloseIcon />
					</IconButton>
				</Box>
				<CartList />
			</Box>
		</Drawer>
	);
}
