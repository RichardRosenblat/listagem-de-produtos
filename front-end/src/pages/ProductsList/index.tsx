import { Box, Container, Typography } from "@mui/material";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import TopBar from "components/TopBar";
import { getProductList } from "services/getProductList";
import { IProduct } from "types/Product";
import Products from "components/Products";
import ProductDetails from "components/ProductDetails";
import CartDrawer from "components/CartDrawer";

const queryClient = new QueryClient();

const Provider = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<ProductList />
		</QueryClientProvider>
	);
};

const ProductList = () => {
	const { isLoading, isError, data } = useQuery<IProduct[]>(["productsList"], getProductList, {});

	return (
		<Container component={"span"} sx={{ width: "100%" }}>
			<TopBar />
			<CartDrawer />
			{isError ? (
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-around",
						height: "90vh",
					}}
				>
					<Typography variant="h3" fontWeight="bold" sx={{ width: "100vh" }}>
						Erro ao carregar a lista de produtos. <br /> Tente novamente mais tarde.
					</Typography>
				</Box>
			) : (
				<Products productsList={data ?? []} isLoading={isLoading} />
			)}
			<ProductDetails />
		</Container>
	);
};

export default Provider;
