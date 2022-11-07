import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { Typography, TextField, Stack } from "@mui/material";
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

export default function CheckboxList({
  filterData,
  title,
  search,
  searchText,
  onClickFilter,
}: Props) {
  const [checked, setChecked] = React.useState<string>("");

  const handleToggle = (value: string) => () => {
    if (value === checked) {
      setChecked("");
      onClickFilter("");
    } else {
      setChecked(value);
      onClickFilter(value);
    }
  };

  return (
    <div>
      <Typography sx={{ fontSize: "13px", mb: 1 }}>{title}</Typography>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          maxHeight: 274,
          overflow: "auto",
        }}
      >
        {search && (
          <Stack px={2}>
            <TextField placeholder={searchText} variant="outlined" />
          </Stack>
        )}
        {filterData?.map((data) => {
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
    </div>
  );
}
