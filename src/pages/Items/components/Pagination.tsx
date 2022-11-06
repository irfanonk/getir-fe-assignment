import { useState } from "react";
import { Typography, Box, Button, styled, Stack, Grid } from "@mui/material";

import { getItems, selectItems } from "../../../features/items/itemSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectFilters, paginate } from "../../../features/filter/filterSlice";
import { NumberBoxStyle } from "./Commons/NumberBox";

const StyledStack = styled(Stack)(({ theme }) => ({
  cursor: "pointer",
}));

export default function Pagination() {
  const filters = useAppSelector(selectFilters);
  const page = filters.page;
  const items = useAppSelector(selectItems);
  const totalCount = items.totalCount;
  const totalPage = Math.ceil(totalCount / filters.limit);

  console.log("page", page, totalCount, totalPage);

  const [pageNumbers, setPageNumbers] = useState<number[]>(
    Array.from(Array(9).keys()).slice(1)
  );

  const dispatch = useAppDispatch();

  const onClickPage = (pageNumber: number) => {
    console.log("pageNumber", pageNumber);
    dispatch(paginate(pageNumber));
    dispatch(getItems());
  };

  const onClickNextPage = () => {
    if (pageNumbers[pageNumbers.length - 1] + 1 < totalPage) {
      setPageNumbers(pageNumbers.map((x) => x + 1));
    }

    dispatch(paginate(page + 1));
    dispatch(getItems());
  };
  const onClickPrevPage = () => {
    if (page === 1) return;
    if (pageNumbers[0] !== 1) {
      setPageNumbers(pageNumbers.map((x) => x - 1));
    }
    dispatch(paginate(page - 1));
    dispatch(getItems());
  };

  return (
    <Grid container pl={3} pr={3} spacing={1}>
      <Grid item xs>
        <StyledStack
          onClick={onClickPrevPage}
          direction="row"
          spacing={1}
          alignItems="center"
        >
          <Box component="img" src="/assets/icons/arrow-left.png" alt="prev" />
          <Typography> Prev </Typography>
        </StyledStack>
      </Grid>
      <Grid item xs={8}>
        <Stack direction="row" spacing={2}>
          {pageNumbers.map((item) => (
            <NumberBoxStyle
              onClick={() => onClickPage(item)}
              sx={{
                background: item === page ? "#1EA4CE" : "",
                padding: "10px 8px 8px 10px",
              }}
              key={item}
            >
              {item}
            </NumberBoxStyle>
          ))}
        </Stack>
      </Grid>
      <Grid sx={{ display: "flex", justifyContent: "flex-end" }} item xs>
        <StyledStack
          onClick={onClickNextPage}
          direction="row"
          spacing={1}
          alignItems="center"
        >
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
