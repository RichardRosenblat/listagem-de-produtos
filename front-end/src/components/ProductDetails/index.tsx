import { Dialog } from "@material-ui/core";
import { useProductDetails } from "hooks/useProductDetails";
import { DialogTitle, Typography } from "@mui/material";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ListIcon from "@mui/icons-material/List";
import { DialogContent, DialogContentText, Avatar, makeStyles } from "@material-ui/core";
import { ProductImagesEnum } from "enums/productImages";
import ProductInfo, { productInfo } from "./components/ProductInfo";
import LabelIcon from "@mui/icons-material/Label";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StoreIcon from "@mui/icons-material/Store";
import { formatPrice } from "util/formatPrice";
import { formatBoolean } from "util/formatBoolean";
import { formatCathegory } from "util/formatCathegory";
import BuildIcon from "@mui/icons-material/Build";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { formatDate } from "util/formatDate";

const useStyles = makeStyles((theme) => ({
	avatar: {
		width: "95%",
		height: theme.spacing(30),
		margin: "auto",
		marginTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
	},
	closeButton: {
		position: "absolute",
		top: theme.spacing(1),
		right: theme.spacing(1),
		width: theme.spacing(4),
		backgroundColor: theme.palette.background.paper,
		borderRadius: "10%",
	},
}));

function ProductDetails() {
	const classes = useStyles();

	const { selectedProduct, close } = useProductDetails();

	const generateInfo = (): productInfo[] => {
		if (!selectedProduct) {
			return [];
		}

		return [
			{
				title: "Preço",
				icon: <AttachMoneyIcon />,
				value: formatPrice(selectedProduct.price),
			},
			{
				title: "Em estoque",
				icon: <StoreIcon />,
				value: formatBoolean(selectedProduct.in_stock),
			},
			{
				title: "Fabricante",
				icon: <BuildIcon />,
				value: selectedProduct.manufacturer,
			},
			{
				title: "Categoria",
				icon: <LabelIcon />,
				value: formatCathegory(selectedProduct.cathegory),
			},
			{
				title: "Ultima atualização",
				icon: <CalendarTodayIcon />,
				value: formatDate(selectedProduct.updatedAt),
			},
			{
				title: "Publicado em",
				icon: <CalendarTodayIcon />,
				value: formatDate(selectedProduct.createdAt),
			},
		];
	};

	return (
		<Dialog open={!!selectedProduct} onClose={close} maxWidth="md" fullWidth>
			{selectedProduct && (
				<>
					<DialogTitle>
						<Avatar
							src={ProductImagesEnum[selectedProduct.cathegory]}
							alt={selectedProduct?.name}
							className={classes.avatar}
							variant="square"
						/>

						<IconButton className={classes.closeButton} onClick={close} aria-label="Fechar">
							<CloseIcon />
						</IconButton>
					</DialogTitle>
					<DialogContent>
						<Typography variant="h3" marginBottom={"10px"}>
							{selectedProduct?.name}
						</Typography>
						<DialogContentText>{selectedProduct?.description}</DialogContentText>
						<DialogContentText
							color={"textPrimary"}
							style={{ display: "inline-flex", alignItems: "center", marginBottom: "5px" }}
						>
							<ListIcon style={{ marginRight: "10px" }} />
							Mais informações
						</DialogContentText>
						<DialogContentText>
							<ProductInfo data={generateInfo()} />
						</DialogContentText>
					</DialogContent>
				</>
			)}
		</Dialog>
	);
}

export default ProductDetails;
