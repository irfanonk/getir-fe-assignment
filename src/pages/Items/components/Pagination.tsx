import { useState } from "react";
import { Typography, Box, Button, styled, Stack, Grid } from "@mui/material";

import { getItems } from "../../../features/items/itemSlice";
import { useAppDispatch } from "../../../redux/hooks";

const NumberBoxStyle = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  padding: "10px 8px 8px 10px",
  cursor: "pointer",
}));
const StyledStack = styled(Stack)(({ theme }) => ({
  cursor: "pointer",
}));

export default function Pagination() {
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const dispatch = useAppDispatch();

  const onClickPage = (pageNumber: number) => {
    console.log("pageNumber", pageNumber);
    const params = {
      limit: 16,
      page: pageNumber,
    };
    setSelectedPage(pageNumber);
    dispatch(getItems(params));
  };
  return (
    <Grid container pl={3} pr={3} spacing={1}>
      <Grid item xs>
        <StyledStack direction="row" spacing={1} alignItems="center">
          <Box component="img" src="/assets/icons/arrow-left.png" alt="prev" />
          <Typography> Prev </Typography>
        </StyledStack>
      </Grid>
      <Grid item xs={6}>
        <Stack direction="row" spacing={2}>
          {Array.from(Array(8).keys()).map((item, i) => (
            <NumberBoxStyle
              onClick={() => onClickPage(i + 1)}
              sx={{
                background: i + 1 === selectedPage ? "#1EA4CE" : "",
              }}
              key={i}
            >
              {item + 1}{" "}
            </NumberBoxStyle>
          ))}
        </Stack>
      </Grid>
      <Grid sx={{ display: "flex", justifyContent: "flex-end" }} item xs>
        <StyledStack direction="row" spacing={1} alignItems="center">
          <Typography>Next</Typography>
          <Box
            width={14}
            height={14}
            component="img"
            src="/assets/icons/arrow-right.png"
            alt="next"
          />
        </StyledStack>
      </Grid>
    </Grid>
  );
}
