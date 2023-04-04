import { useRecoilState } from "recoil";
import { IProduct } from "types/Product";
import { selectedProductState } from "atoms/selectedProduct";

export const useSelectedProduct = () => {
	const [selectedProduct, setSelectedProduct] = useRecoilState(selectedProductState);

	const selectProduct = (product: IProduct) => {
		setSelectedProduct(product);
	};
	const deselectProduct = () => {
		setSelectedProduct(null);
	};

	return { selectedProduct, selectProduct, deselectProduct };
};
