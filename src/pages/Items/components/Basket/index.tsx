import {
  Grid,
  CircularProgress,
  Typography,
  Stack,
  Button,
  Box,
  styled,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import {
  addToBasket,
  removeFromBasket,
  selectItems,
} from "../../../../features/items/itemSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { NumberBoxStyle } from "../Commons/NumberBox";
import Price from "../Price";
import { Item } from "../../../../features/items/itemSlice";
const BASKET = [
  {
    id: 1,
    name: "Incredible Ocean Shirt",
    price: 10.99,
  },
  {
    id: 2,
    name: "Rustic Beach Mug",
    price: 20.99,
  },
  {
    id: 3,
    name: "Handmade Fog Shirt",
    price: 9.99,
  },
];
const RootBoxStyle = styled(Box)(() => ({
  border: "5px solid #1EA4CE",
  padding: "25px",
  background: "#ffff",
  minWidth: 296,
}));
const ItemCountBoxStyle = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  rowGap: 2,
}));
const TotalSectionBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: 5,
}));
const TotalPriceBox = styled(Box)(() => ({
  border: "3px solid #1EA4CE",
  padding: "20px 18px 20px 18px",
}));
export default function Basket() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);
  const basket = items.basket;
  console.log("basket", basket);

  const onAddToBasket = (item: Item) => {
    console.log("item", item);
    dispatch(addToBasket(item));
  };
  const onRemoveFromBasket = (item: Item) => {
    console.log("item", item);
    dispatch(removeFromBasket(item));
  };

  return (
    <RootBoxStyle>
      <List sx={{ width: "100%" }}>
        {basket.items.map((item) => {
          return (
            <>
              <ListItem
                secondaryAction={
                  <ItemCountBoxStyle>
                    <IconButton
                      onClick={() => onRemoveFromBasket(item)}
                      aria-label="substrack"
                    >
                      <Box
                        component="img"
                        src="/assets/icons/negative-sign.png"
                        alt="substrack"
                      />
                    </IconButton>
                    <NumberBoxStyle
                      sx={{
                        background: "#1EA4CE",
                        padding: "10px 12px 10px 12px",
                      }}
                    >
                      {item.quantity}
                    </NumberBoxStyle>
                    <IconButton
                      onClick={() => onAddToBasket(item)}
                      aria-label="add"
                    >
                      <Box
                        component="img"
                        src="/assets/icons/positive-sign.png"
                        alt="add"
                      />
                    </IconButton>
                  </ItemCountBoxStyle>
                }
                key={item.name}
                alignItems="flex-start"
              >
                <ListItemText
                  primary={item.name}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        <Price price={item.price} color="#1EA4CE" />
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              <Divider component="li" />
            </>
          );
        })}
      </List>
      <TotalSectionBox>
        <TotalPriceBox>
          <Price price={basket.totolPrice} color="#1EA4CE" />
        </TotalPriceBox>
      </TotalSectionBox>
    </RootBoxStyle>
  );
}
