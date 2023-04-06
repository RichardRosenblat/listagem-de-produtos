import { atom } from "recoil";

export const cartDrawerState = atom<boolean>({
	key: "cartDrawer",
	default: false,
});
