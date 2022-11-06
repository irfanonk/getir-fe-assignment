import {
  Typography,
  Box,
  Button,
  styled,
  CardActions,
  CardContent,
  Card,
} from "@mui/material";
import Price from "../Price";
import { Item } from "../../../../features/items/itemSlice";

type Props = {
  item: Item;
  onAddToBasket: (item: Item) => void;
};

const ImageBoxStyle = styled("div")(({ theme }) => ({
  border: "1px solid #F3F0FE",
  borderRadius: "24px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 32,
  [theme.breakpoints.up("md")]: {
    width: 124,
    height: 124,
    padding: "16px 0 16px 0",
  },
}));
const RootBoxStyle = styled("div")(({ theme }) => ({
  background: "none",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  maxHeight: 227,
}));

export default function ItemCard({ item, onAddToBasket }: Props) {
  return (
    <RootBoxStyle>
      <ImageBoxStyle>
        <Box
          component="img"
          width={92}
          height={92}
          src={`https://picsum.photos/id/10/200/300`}
          alt={item?.name}
        />
      </ImageBoxStyle>

      <CardContent sx={{ textAlign: "left" }}>
        <Price color="#1EA4CE" price={item?.price} />
        <Typography
          sx={{ fontSize: 14, fontWeight: "bold" }}
          color="text.primary"
        >
          {item?.name}
        </Typography>
      </CardContent>
      <Button
        onClick={() => onAddToBasket(item)}
        sx={{ width: "100%", background: "#1EA4CE" }}
      >
        Add
      </Button>
    </RootBoxStyle>
  );
}
