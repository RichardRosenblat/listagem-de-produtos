import { CathegoryEnum } from "enums/cathegories";

export interface IProduct {
	_id: string;
	name: string;
	description: string;
	price: number;
	in_stock: boolean;
	cathegory: CathegoryEnum;
	score: number;
	manufacturer: string;
	updatedAt: Date;
	createdAt: Date;
}
