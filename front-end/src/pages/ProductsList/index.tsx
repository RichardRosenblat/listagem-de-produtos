import { Container } from "@mui/material";
import Products from "components/Products";
import TopBar from "components/TopBar";

const ProductList = () => {
	return (
		<Container sx={{ width: "100%" }}>
			<TopBar />
			<Products />
		</Container>
	);
};

export default ProductList;
