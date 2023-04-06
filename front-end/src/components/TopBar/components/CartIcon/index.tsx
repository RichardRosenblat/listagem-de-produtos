import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@material-ui/core";
import { useCart } from "hooks/useCart";

const CartIcon = () => {
	const { cart } = useCart();
	return (
		<Badge badgeContent={cart.length} color="secondary" overlap="rectangular">
			<ShoppingCartIcon />
		</Badge>
	);
};

export default CartIcon;
