import { atom } from "recoil";
import { ICartItem } from "types/CartItem";

const savedCart = localStorage.getItem("cart");
export const cartState = atom<ICartItem[]>({
	key: "cart",
	default: savedCart ? JSON.parse(savedCart) : [],
});
