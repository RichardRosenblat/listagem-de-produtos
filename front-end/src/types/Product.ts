import { CathegoryEnum } from "enums/cathegories";
export interface IProduct {
	id: string;
	name: string;
	description: string;
	price: number;
	in_stock: boolean;
	cathegory: keyof typeof CathegoryEnum;
	score: number;
	manufacturer: string;
	updatedAt: Date;
	createdAt: Date;
}
