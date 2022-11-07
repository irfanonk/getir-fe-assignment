import { useEffect } from "react";

import { Box, Stack, styled } from "@mui/material";
import FilterCard from "./FilterCard";
import {
  getCompanies,
  selectComponies,
} from "../../../../features/companies/companiesSlice";
import { getTags, selectTags } from "../../../../features/tags/tagsSlice";
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
    slug: "plh",
  },
  {
    name: "Price high to low",
    slug: "phl",
  },
  {
    name: "New to old",
    slug: "nto",
  },
  {
    name: "Old to new",
    slug: "otn",
  },
];
const TAGS = [
  {
    name: "Beach",
    slug: "Beach",
  },
  {
    name: "Ocean",
    slug: "Ocean",
  },
  {
    name: "Water",
    slug: "Water",
  },
  {
    name: "Animal",
    slug: "Animal",
  },
  {
    name: "Road",
    slug: "Road",
  },
  {
    name: "Rocks",
    slug: "Rocks",
  },
];

const RootBox = styled(Box)(() => ({
  minWidth: 296,
  display: "flex",
  flexDirection: "column",
  rowGap: 25,
}));

export default function Filter() {
  const dispatch = useAppDispatch();
  const companies = useAppSelector(selectComponies);
  const tags = useAppSelector(selectTags);

  useEffect(() => {
    dispatch(getCompanies());
    dispatch(getTags());
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
    dispatch(getItems());
  };

  return (
    <RootBox>
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
        filterData={tags.value}
      />
    </RootBox>
  );
}
