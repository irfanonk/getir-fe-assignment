import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Typography, Box, Button } from "@mui/material";
import Price from "../Price";
import { Item } from "../../../../features/items/itemSlice";

type Props = {
  product: Item | null;
};

export default function MediaCard({ product }: Props) {
  return (
    <Box sx={{ background: "none", width: 225 }}>
      <Box
        sx={{
          border: "1px solid #F3F0FE",
          borderRadius: "12px",
          padding: "32px",
        }}
      >
        <CardMedia
          component="img"
          width={92}
          height={92}
          image={`https://picsum.photos/id/10/200/300`}
          alt="green iguana"
        />
      </Box>

      <CardContent sx={{ textAlign: "left" }}>
        <Price color="#1EA4CE" price={product?.price} />
        <Typography variant="body2" color="text.primary">
          {product?.name}
        </Typography>
      </CardContent>
      <Button sx={{ width: "100%", background: "#1EA4CE" }}>Add</Button>
    </Box>
  );
}
