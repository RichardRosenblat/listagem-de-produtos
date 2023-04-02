import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { ProductImagesEnum } from "enums/productImages";
import { IProduct } from "types/Product";
import { Grid } from "@mui/material";

interface props {
	productsList: IProduct[];
	isLoading: boolean;
}

const Products = ({ isLoading, productsList }: props) => {
	const productTypes: (keyof typeof ProductImagesEnum)[] = [
		"ELECTRONICS",
		"CLOTHES",
		"FOODS",
		"BOOKS",
		"OTHER",
		"ELECTRONICS",
		"CLOTHES",
		"FOODS",
		"BOOKS",
		"OTHER",
	];

	return (
		<Grid container spacing={2} sx={{ marginTop: 2 }}>
			{productTypes.map((type, index) => {
				return (
					<Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={index}>
						<Box>
							<Card sx={{ maxWidth: 345 }}>
								<CardMedia sx={{ height: 140 }} image={ProductImagesEnum[type]} title="green iguana" />
								<CardContent>
									<Typography gutterBottom variant="h5" component="div">
										{type}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										Lizards are a widespread group of squamate reptiles, with over 6,000 species,
										ranging across all continents except Antarctica
									</Typography>
								</CardContent>
								<CardActions>
									<Button size="small">Share</Button>
									<Button size="small">Learn More</Button>
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
