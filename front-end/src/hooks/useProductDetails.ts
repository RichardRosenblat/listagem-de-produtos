import { useRecoilState } from "recoil";
import { IProduct } from "types/Product";
import { selectedProductState } from "atoms/selectedProduct";

export const useProductDetails = () => {
	const [selectedProduct, setSelectedProduct] = useRecoilState(selectedProductState);

	const open = (product: IProduct) => {
		setSelectedProduct(product);
	};
	const close = () => {
		setSelectedProduct(null);
	};

	return { selectedProduct, open, close };
};
