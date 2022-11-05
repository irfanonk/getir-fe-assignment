import { useEffect } from "react";

import { Box, Stack } from "@mui/material";
import FilterCard from "./FilterCard";
import {
  getCompanies,
  selectComponies,
} from "../../../../features/companies/companiesSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";

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

  return (
    <Stack spacing={2}>
      <FilterCard title="Sorting" filterData={sorting} />
      <FilterCard
        title="Brands"
        search={true}
        searchText="Search brand"
        filterData={companies.value}
      />
    </Stack>
  );
}
