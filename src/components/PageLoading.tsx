import { CircularProgress, Stack } from "@mui/material";

export default function PageLoading() {
  return (
    <Stack
      sx={{ position: "fixed", top: "50%", left: "45%" }}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress id="page-loader" />
    </Stack>
  );
}
