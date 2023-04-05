import { CathegoryEnum } from "enums/cathegories";

export const formatCathegory = (cathegory: keyof typeof CathegoryEnum) => {
	return CathegoryEnum[cathegory];
};
