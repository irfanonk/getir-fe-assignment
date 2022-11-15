import { useState } from "react";
import { Box, Button, Grid, SwipeableDrawer, styled } from "@mui/material";
import Header from "../../layout/Header";
import Items from "./components/Items";
import useResponsive from "../../hooks/useResponsive";
import Filters from "./components/Filters";
import Basket from "./components/Basket";
import { Stack } from "@mui/system";

const RootContainerBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  padding: "80px 0 80px 0",
}));
export default function ItemsPage() {
  const isDesktop = useResponsive("up", "lg");

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isBasketOpen, setIsBasketOpen] = useState(false);

  return (
    <>
      <Header />

      <RootContainerBox>
        <Grid container justifyContent="center" gap={2}>
          {isDesktop && (
            <Grid item>
              {/* filters */}
              <Filters />
            </Grid>
          )}

          <Grid item xs={isDesktop ? 4 : 12}>
            {!isDesktop && (
              <Stack direction="row" justifyContent="center" spacing={2} mb={5}>
                <Button
                  variant="contained"
                  onClick={() => setIsFilterOpen(true)}
                >
                  Filters
                </Button>{" "}
                <Button
                  variant="contained"
                  onClick={() => setIsBasketOpen(true)}
                >
                  Basket
                </Button>
              </Stack>
            )}
            <Items />
          </Grid>
          {isDesktop && (
            <Grid item>
              {/* basket */}
              <Basket />
            </Grid>
          )}
        </Grid>
        {!isDesktop && (
          <SwipeableDrawer
            anchor={"left"}
            open={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            onOpen={() => setIsFilterOpen(true)}
          >
            <Stack p={2}>
              <Filters />
            </Stack>
          </SwipeableDrawer>
        )}
        {!isDesktop && (
          <SwipeableDrawer
            anchor={"right"}
            open={isBasketOpen}
            onClose={() => setIsBasketOpen(false)}
            onOpen={() => setIsBasketOpen(true)}
          >
            <Stack>
              <Basket />
            </Stack>
          </SwipeableDrawer>
        )}
      </RootContainerBox>
    </>
  );
}
