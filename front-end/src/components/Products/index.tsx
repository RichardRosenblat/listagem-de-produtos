import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { ProductImagesEnum } from "enums/productImages";
import { IProduct } from "types/Product";
import { theme } from "../../styles/theme";
import { Grid } from "@mui/material";
import { colors } from "@material-ui/core";

interface props {
	productsList: IProduct[];
	isLoading: boolean;
}

const Products = ({ isLoading, productsList }: props) => {
	// const productTypes: (keyof typeof ProductImagesEnum)[] = [
	// 	"ELECTRONICS",
	// 	"CLOTHES",
	// 	"FOODS",
	// 	"BOOKS",
	// 	"OTHER",
	// 	"ELECTRONICS",
	// 	"CLOTHES",
	// 	"FOODS",
	// 	"BOOKS",
	// 	"OTHER",
	// ];

	const shortenDescription = (description: string) => {
		if (description.length > 100) {
			return description.substring(0, 100) + "...";
		}
		return description;
	};

	return (
		<Grid container spacing={2} sx={{ marginTop: 2 }}>
			{productsList.map((product, index) => {
				return (
					<Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={index}>
						<Box>
							<Card sx={{ maxWidth: 345 }}>
								<CardMedia
									sx={{ height: 140 }}
									image={ProductImagesEnum[product.cathegory]}
									title={product.name}
								/>
								<CardContent>
									<Typography
										gutterBottom
										variant="h5"
										component="div"
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
											textDecoration: product.in_stock ? "none" : "line-through",
										}}
									>
										{shortenDescription(product.description)}
									</Typography>
								</CardContent>
								<CardActions>
									<Button size="small">Mais Informação</Button>
									<Button
										sx={{
											textDecoration: product.in_stock ? "none" : "line-through",
											"&.Mui-disabled": {
												color: product.in_stock
													? theme.palette.primary.main
													: theme.palette.error.light,
											},
										}}
										disabled={!product.in_stock}
										size="small"
									>
										Adicionar ao Carrinho
									</Button>
								</CardActions>
							</Card>
						</Box>
					</Grid>
				);
			})}
		</Grid>
	);
};

export default Products;
