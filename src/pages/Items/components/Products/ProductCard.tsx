import {
  Typography,
  Box,
  Button,
  styled,
  CardActions,
  CardContent,
  Card,
} from "@mui/material";
import Price from "../Price";
import { Item } from "../../../../features/items/itemSlice";
import useResponsive from "../../../../hooks/useResponsive";

type Props = {
  product: Item | null;
};

const ImageBoxStyle = styled("div")(({ theme }) => ({
  border: "1px solid #F3F0FE",
  borderRadius: "24px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 32,
  [theme.breakpoints.up("md")]: {
    width: 124,
    height: 124,
    padding: 0,
  },
}));
const RootBoxStyle = styled("div")(({ theme }) => ({
  background: "none",
}));

export default function MediaCard({ product }: Props) {
  const isDesktop = useResponsive("up", "lg");
  return (
    <RootBoxStyle>
      <ImageBoxStyle>
        <Box
          component="img"
          width={92}
          height={92}
          src={`https://picsum.photos/id/10/200/300`}
          alt={product?.name}
        />
      </ImageBoxStyle>

      <CardContent sx={{ textAlign: "left" }}>
        <Price color="#1EA4CE" price={product?.price} />
        <Typography
          sx={{ fontSize: 14, fontWeight: "bold" }}
          color="text.primary"
        >
          {product?.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button sx={{ width: "100%", background: "#1EA4CE" }}>Add</Button>
      </CardActions>
    </RootBoxStyle>
  );
}
