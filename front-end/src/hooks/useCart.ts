import { cartState } from "atoms/cart";
import { useRecoilState } from "recoil";
import { IProduct } from "types/Product";

export const useCart = () => {
	const [cart, setCart] = useRecoilState(cartState);

	const addToCart = (product: IProduct) => {
		const itemInCart = cart.find((item) => item.product.id === product.id);
		if (itemInCart) {
			const newCart = cart.map((item) =>
				item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
			);
			setCart(newCart);
			localStorage.setItem("cart", JSON.stringify(newCart));
		} else {
			const newCart = [...cart, { product, quantity: 1 }];
			setCart(newCart);
			localStorage.setItem("cart", JSON.stringify(newCart));
		}
	};
	const removeFromCart = (product: IProduct) => {
		const itemInCart = cart.find((item) => item.product.id === product.id);
		if (itemInCart) {
			if (itemInCart.quantity > 1) {
				const newCart = cart.map((item) =>
					item.product.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
				);
				setCart(newCart);
				localStorage.setItem("cart", JSON.stringify(newCart));
			} else {
				const newCart = cart.filter((item) => item.product.id !== product.id);
				setCart(newCart);
				localStorage.setItem("cart", JSON.stringify(newCart));
			}
		}
	};
	const clearCart = () => {
		setCart([]);
		localStorage.removeItem("cart");
	};
	const getTotal = () => {
		return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
	};

	return { cart, addToCart, removeFromCart, clearCart, getTotal };
};
