import { atom } from "recoil";
import { IProduct } from "types/Product";

export const selectedProductState = atom<IProduct | null>({
	key: "selectedProduct",
	default: null,
});
