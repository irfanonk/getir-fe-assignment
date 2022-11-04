import React from "react";
import { Stack, Typography, SxProps } from "@mui/material";

type Props = {
  price: number | string | undefined;
  color?: string;
};

export default function Price({ price, color }: Props) {
  return (
    <Stack direction="row">
      <Typography sx={{ fontWeight: "bold", color: color }}>
        ₺ {price}
      </Typography>
    </Stack>
  );
}
