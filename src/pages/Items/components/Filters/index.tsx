import { useEffect } from "react";

import { Box, Stack } from "@mui/material";
import FilterCard from "./FilterCard";
import {
  getCompanies,
  selectComponies,
} from "../../../../features/companies/companiesSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  filterByBrand,
  filterByTag,
  sort,
} from "../../../../features/filter/filterSlice";
import { getItems } from "../../../../features/items/itemSlice";

const SORTING = [
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
const TAGS = [
  {
    name: "Beach",
    value: "",
  },
  {
    name: "Ocean",
    value: "",
  },
  {
    name: "Water",
    value: "",
  },
  {
    name: "Animal",
    value: "Bear",
  },
  {
    name: "Road",
    value: "Bear",
  },
  {
    name: "Rocks",
    value: "Bear",
  },
  {
    name: "Sunset",
    value: "Bear",
  },
  {
    name: "Old",
    value: "Bear",
  },
  {
    name: "Car",
    value: "Bear",
  },
  {
    name: "Person",
    value: "Bear",
  },
  {
    name: "Hills",
    value: "Bear",
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
    dispatch(sort(sorting));
    dispatch(getItems());
  };
  const onClickFilterBrand = (brand: string) => {
    dispatch(filterByBrand(brand));
    dispatch(getItems());
  };
  const onClickFilterTag = (tag: string) => {
    dispatch(filterByTag(tag));
    //   dispatch(getItems());
  };

  return (
    <Stack spacing={2}>
      <FilterCard
        onClickFilter={onClickSort}
        title="Sorting"
        filterData={SORTING}
      />
      <FilterCard
        onClickFilter={onClickFilterBrand}
        title="Brands"
        search={true}
        searchText="Search brand"
        filterData={companies.value}
      />
      <FilterCard
        onClickFilter={onClickFilterTag}
        title="Tags"
        search={true}
        searchText="Search tag"
        filterData={TAGS}
      />
    </Stack>
  );
}
