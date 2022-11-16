import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { Company } from "../../../../features/companies/companiesSlice";
import CircleChecked from "@mui/icons-material/CheckCircleOutline";
import CircleUnchecked from "@mui/icons-material/RadioButtonUnchecked";

type Props = {
  filterData?: FilterData[] | Company[];
  title?: string;
  search?: boolean;
  searchText?: string;
  onClickFilter: (value: string) => void;
};

type FilterData = {
  name: string;
  slug: string;
};

export default function FilterCard({
  filterData,
  title,
  search,
  searchText,
  onClickFilter,
}: Props) {
  const [checked, setChecked] = useState<string>("");

  const [searchedData, setSearchedData] = useState<FilterData[] | null>(null);

  const handleToggle = (value: string) => () => {
    if (value === checked) {
      setChecked("");
      onClickFilter("");
    } else {
      setChecked(value);
      onClickFilter(value);
    }
  };

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchedData(
      filterData?.filter((data) => data.name.toLowerCase().includes(value)) ||
        null
    );
  };

  return (
    <Box>
      <Typography sx={{ fontSize: "13px", mb: 1 }}>{title}</Typography>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          height: 274,
          overflow: "auto",
        }}
      >
        {search && (
          <Stack px={2}>
            <TextField
              onChange={onChangeSearch}
              placeholder={searchText}
              variant="outlined"
            />
          </Stack>
        )}
        {(searchedData || filterData)?.map((data) => {
          const { name, slug } = data;
          const labelId = `checkbox-list-label-${name}`;

          return (
            <ListItem key={name} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={handleToggle(slug)}
                dense
              >
                <ListItemIcon>
                  {title === "Sorting" ? (
                    <Checkbox
                      icon={<CircleUnchecked />}
                      checkedIcon={<CircleChecked />}
                      edge="start"
                      checked={checked === slug}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{
                        "aria-labelledby": labelId,
                      }}
                    />
                  ) : (
                    <Checkbox
                      edge="start"
                      checked={checked === slug}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  )}
                </ListItemIcon>
                <ListItemText id={labelId} primary={name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
