import { useState } from "react";
import {
  Typography,
  Box,
  Button,
  styled,
  Stack,
  Grid,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

import { getItems, selectItems } from "../../../features/items/itemSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  selectFilters,
  paginate,
  FilterState,
} from "../../../features/filter/filterSlice";
import { NumberBoxStyle } from "./Commons/NumberBox";
import useResponsive from "../../../hooks/useResponsive";

const StyledStack = styled(Stack)(({ theme }) => ({
  cursor: "pointer",
}));
const DotBoxStyle = styled(Stack)(({ theme }) => ({
  width: 3,
  height: 3,
  background: "#000",
  borderRadius: "100%",
}));
export default function Pagination() {
  const isDesktop = useResponsive("up", "lg");

  const filters = useAppSelector(selectFilters) as FilterState;
  const page = filters.page;
  const items = useAppSelector(selectItems);
  const totalCount = items.totalItemCount;
  const totalPage = Math.ceil(totalCount / filters.limit);

  const [pageNumbers, setPageNumbers] = useState<number[]>(
    Array.from(Array(9).keys()).slice(1)
  );

  const dispatch = useAppDispatch();

  const onClickPage = (pageNumber: number) => {
    dispatch(paginate(pageNumber));
    dispatch(getItems());
  };

  const onClickNextPage = () => {
    if (page === totalPage) return;
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

  const onChangePage = (event: SelectChangeEvent) => {
    const pageNumber = +event.target.value;
    onClickPage(pageNumber);
  };

  return (
    <Grid container px={isDesktop ? 3 : 0} spacing={1}>
      <Grid sx={{ display: "flex", justifyContent: "flex-start" }} item xs>
        <StyledStack
          onClick={onClickPrevPage}
          direction="row"
          spacing={1}
          alignItems="center"
        >
          <Box component="img" src="/assets/icons/arrow-left.png" alt="prev" />
          {isDesktop && <Typography>Prev</Typography>}
        </StyledStack>
      </Grid>
      <Grid item xs={8}>
        {isDesktop ? (
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
            {/* <Stack direction="row" alignItems="center" spacing={2}>
            {page > 4 && page < totalPage - 4 ? (
              <NumberBoxStyle
                sx={{
                  background: "#1EA4CE",
                  padding: "10px 8px 8px 10px",
                }}
              >
                {page}
              </NumberBoxStyle>
            ) : (
              [1, 2, 3].map((x) => <DotBoxStyle key={x} />)
            )}
          </Stack>
          {pageNumbers.slice(-4).map((item) => (
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
          ))} */}
          </Stack>
        ) : (
          <Stack>
            <Select
              value={page.toString()}
              label="Page"
              onChange={onChangePage}
            >
              {pageNumbers.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </Stack>
        )}
      </Grid>
      <Grid sx={{ display: "flex", justifyContent: "flex-end" }} item xs>
        <StyledStack
          onClick={onClickNextPage}
          direction="row"
          spacing={1}
          alignItems="center"
        >
          {isDesktop && <Typography>Next</Typography>}

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
