import { Box, Container, Typography } from "@mui/material";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import TopBar from "components/TopBar";
import { getProductList } from "services/getProductList";
import { IProduct } from "types/Product";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { theme } from "styles/theme";
import Products from "components/Products";

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
		<Container sx={{ width: "100%" }}>
			<TopBar />
			{isError ? (
				<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
					<Typography variant="h3">
						<b style={{ color: theme.palette.error.light }}> Erro </b>ao carregar a lista de produtos
					</Typography>
				</Box>
			) : (
				<Products productsList={data ?? []} isLoading={isLoading} />
			)}
		</Container>
	);
};

export default Provider;
