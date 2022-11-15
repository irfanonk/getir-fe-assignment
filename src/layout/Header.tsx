import * as React from "react";

import {
  Box,
  Stack,
  AppBar,
  Toolbar,
} from "@mui/material";

import Price from "../pages/Items/components/Price";
import { useAppSelector } from "../redux/hooks";
import { selectItems } from "../features/items/itemSlice";

const HEADER_HEIGHT = 76;

export default function Header() {
  const items = useAppSelector(selectItems);
  const basket = items.basket;

  return (
    <Box sx={{ flexGrow: 1, textAlign: "center" }}>
      <AppBar
        style={{
          background: "#1EA4CE",
          height: HEADER_HEIGHT,
        }}
        position="static"
      >
        <Toolbar>
          <Box component="div" sx={{ flexGrow: 1 }}>
            <img src="/assets/icons/Logo.png" alt="logo" />
          </Box>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap={1}
            style={{
              background: "#147594",
              width: 129,
              height: HEADER_HEIGHT,
            }}
          >
            <img src="/assets/icons/basket.png" alt="basket" />
            <Price color="#fff" price={basket.totolPrice} />
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
