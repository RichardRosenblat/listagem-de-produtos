import axios from "axios";
import { IProduct } from "types/Product";

export const getProductList = async () => {
	const response = await axios.get<IProduct[]>(
		(process.env.REACT_APP_API_URL || "http://localhost:3000") + "/v1/products"
	);
	const data = response.data;
	return data;
};
