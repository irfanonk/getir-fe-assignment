import {
  Typography,
  Box,
  Button,
  styled,
  CardActions,
  CardContent,
} from "@mui/material";
import Price from "../Price";
import { Item } from "../../../../features/items/itemSlice";

type Props = {
  item: Item;
  onAddToBasket: (item: Item) => void;
  index: number;
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
  height: 227,
}));

export default function ItemCard({ item, index, onAddToBasket }: Props) {
  return (
    <RootBoxStyle>
      <ImageBoxStyle>
        <Box
          component="img"
          width={92}
          height={92}
          src={`https://api.lorem.space/image/shoes?w=150&h=150&t=${index}`}
          alt={item?.name}
        />
      </ImageBoxStyle>

      <CardContent sx={{ textAlign: "left", minHeight: "70px" }}>
        <Price color="#1EA4CE" price={item?.price} />
        <Typography fontWeight={500}>{item?.name}</Typography>
      </CardContent>
      <CardActions>
        <Button
          sx={{ width: "100%" }}
          variant="contained"
          onClick={() => onAddToBasket(item)}
        >
          Add
        </Button>
      </CardActions>
    </RootBoxStyle>
  );
}
