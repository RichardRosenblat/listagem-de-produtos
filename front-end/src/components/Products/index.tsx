import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { ProductImagesEnum } from "enums/productImages";
import { IProduct } from "types/Product";
import { theme } from "styles/theme";
import { Grid, Skeleton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useProductDetails } from "hooks/useProductDetails";
import { useCart } from "hooks/useCart";
import { toast } from "react-hot-toast";

interface props {
	productsList: IProduct[];
	isLoading: boolean;
}

const useStyles = makeStyles({
	grayscale: {
		filter: "grayscale(100%)",
	},
});

const Products = ({ productsList, isLoading }: props) => {
	const { open: openProductDetails } = useProductDetails();
	const { addToCart } = useCart();
	const classes = useStyles();
	const HandleAddToCartClick = (product: IProduct) => {
		addToCart(product);
		toast.success("Produto adicionado ao carrinho!");
	};

	return (
		<Grid container spacing={2} sx={{ marginTop: 2 }}>
			{!isLoading
				? productsList.map((product, index) => {
						return (
							<Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={index}>
								<Box>
									<Card sx={{ maxWidth: 345 }}>
										<CardMedia
											className={product.in_stock ? "" : classes.grayscale}
											sx={{ height: 140 }}
											image={ProductImagesEnum[product.cathegory]}
											title={product.name}
										/>
										<CardContent>
											<Typography
												gutterBottom
												variant="h5"
												sx={{
													color: product.in_stock
														? theme.palette.text.primary
														: theme.palette.text.disabled,
													textDecoration: product.in_stock ? "none" : "line-through",
												}}
											>
												{product.name}
											</Typography>
											<Typography
												variant="body2"
												sx={{
													color: product.in_stock
														? theme.palette.text.secondary
														: theme.palette.text.disabled,
												}}
											>
												{shortenDescription(product.description)}
											</Typography>
										</CardContent>
										<CardActions>
											<Button
												color="secondary"
												aria-label="Mais Informação"
												size="small"
												onClick={() => openProductDetails(product)}
												variant="outlined"
											>
												Mais Informação
											</Button>
											<Button
												sx={{
													textDecoration: product.in_stock ? "none" : "line-through",
												}}
												aria-label="Adicionar ao Carrinho"
												color="secondary"
												variant="outlined"
												disabled={!product.in_stock}
												size="small"
												onClick={() => HandleAddToCartClick(product)}
											>
												Adicionar ao Carrinho
											</Button>
										</CardActions>
									</Card>
								</Box>
							</Grid>
						);
				  })
				: arrayFromSize(6).map((item) => {
						return (
							<Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={item}>
								<Card>
									<Skeleton variant="rectangular" width={300} height={140} />

									<CardContent>
										<Typography gutterBottom variant="h5">
											<Skeleton />
										</Typography>
										<Typography variant="body2">
											<Skeleton variant="text" width={240} height={75} />
										</Typography>
										<CardActions>
											<Skeleton>
												<Button size="small">Mais Informação</Button>
											</Skeleton>
											<Skeleton>
												<Button size="small">Adicionar ao Carrinho</Button>
											</Skeleton>
										</CardActions>
									</CardContent>
								</Card>
							</Grid>
						);
				  })}
		</Grid>
	);
};

export default Products;

function arrayFromSize(size: number) {
	const array = [];
	for (let i = 0; i < size; i++) {
		array.push(i);
	}
	return array;
}
function shortenDescription(description: string) {
	if (description.length > 100) {
		return description.substring(0, 100) + "...";
	}
	return description;
}
