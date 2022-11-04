import { useEffect, useState } from "react";
import { Grid, Container, Typography, Stack, Button } from "@mui/material";
import { Item } from "../../../../features/items/itemSlice";
import { styled } from "@mui/material/styles";
import ProductCard from "./ProductCard";
type Props = {
  products: Item[] | [];
};

const StyledButton = styled(Button)(() => ({
  textTransform: "lowercase",
}));

export default function Producst({ products }: Props) {
  return (
    <Stack spacing={2}>
      <Stack>
        <Typography>Products</Typography>
      </Stack>
      <Stack spacing={2} direction="row">
        <StyledButton variant="text">mug</StyledButton>
        <StyledButton variant="contained">shirt</StyledButton>
      </Stack>
      <Stack sx={{ background: "#fff" }} p={5} direction="row">
        <Grid container spacing={1} justifyContent="center">
          {products?.map((item: Item, i: number) => {
            return (
              <Grid key={i} item xs={12} sm={4} md={4}>
                <ProductCard product={item} />
              </Grid>
            );
          })}
        </Grid>
      </Stack>
    </Stack>
  );
}
