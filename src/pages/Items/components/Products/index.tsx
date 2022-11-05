import { useEffect, useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import {
  getItems,
  Item,
  selectItems,
} from "../../../../features/items/itemSlice";
import { styled } from "@mui/material/styles";
import ProductCard from "./ProductCard";
import { useTheme } from "@mui/material/styles";
import Pagination from "../Pagination";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import PageLoading from "../../../../components/PageLoading";

type Props = {
  value: Item[] | [];
  status: "idle" | "loading" | "failed";
};

const StyledButton = styled(Button)(() => ({
  textTransform: "lowercase",
}));

export default function Products() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);

  useEffect(() => {
    const params = {
      limit: 16,
      page: 1,
    };
    dispatch(getItems(params));
  }, []);

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
        <Grid
          container
          minHeight={"100vh"}
          alignItems="center"
          spacing={4}
          justifyContent="center"
        >
          {items.status === "loading" ? (
            <CircularProgress />
          ) : (
            items.value?.map((item: Item, i: number) => {
              return (
                <Grid key={i} item xs={12} sm={6} md={3}>
                  <ProductCard product={item} />
                </Grid>
              );
            })
          )}
        </Grid>
      </Stack>
      <Stack>
        <Pagination />
      </Stack>
    </Stack>
  );
}
