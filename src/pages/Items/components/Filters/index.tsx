import { useEffect } from "react";

import { Box, Stack } from "@mui/material";
import FilterCard from "./FilterCard";
import {
  getCompanies,
  selectComponies,
} from "../../../../features/companies/companiesSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { filterByBrand, sort } from "../../../../features/filter/filterSlice";
import { getItems } from "../../../../features/items/itemSlice";

const sorting = [
  {
    name: "Price low to high",
    value: "",
  },
  {
    name: "Price high to low",
    value: "",
  },
  {
    name: "New to old",
    value: "",
  },
  {
    name: "Old to new",
    value: "",
  },
];

export default function Filter() {
  const dispatch = useAppDispatch();
  const companies = useAppSelector(selectComponies);
  console.log("companies", companies);

  useEffect(() => {
    dispatch(getCompanies());
  }, []);

  const onClickSort = (sorting: string) => {
    console.log("sorting", sorting);
    dispatch(sort(sorting));
    dispatch(getItems());
  };
  const onClickFilterBrand = (brand: string) => {
    console.log("brand", brand);
    dispatch(filterByBrand(brand));
    dispatch(getItems());
  };

  return (
    <Stack spacing={2}>
      <FilterCard
        onClickFilter={onClickSort}
        title="Sorting"
        filterData={sorting}
      />
      <FilterCard
        onClickFilter={onClickFilterBrand}
        title="Brands"
        search={true}
        searchText="Search brand"
        filterData={companies.value}
      />
    </Stack>
  );
}
