import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

export interface productInfo {
	title: string;
	value: string;
	icon: JSX.Element;
}

interface props {
	data: productInfo[];
}

const ProductInfoList = ({ data }: props) => {
	return (
		<List style={{ paddingTop: "0px" }}>
			{data.map((item, index) => {
				return (
					<ListItem key={index} style={{ paddingTop: 0, paddingBottom: "5px" }}>
						<ListItemIcon>{item.icon}</ListItemIcon>
						<ListItemText primary={item.title} secondary={item.value} />
					</ListItem>
				);
			})}
		</List>
	);
};

export default ProductInfoList;
