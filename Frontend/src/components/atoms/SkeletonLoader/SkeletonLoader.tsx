import { Grid, Skeleton, Stack } from "@mui/material";

export default function SkeletonLoader() {
  return (
    <Grid container spacing={4}>
      <Grid item md={6}>
        <Skeleton variant="text" sx={{ fontSize: "24px" }} />
        <Skeleton variant="rectangular" width={"100%"} height={200} />
        <Stack direction="row" spacing={2} sx={{ marginTop: "12px" }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={40} height={40} />
        </Stack>
      </Grid>
      <Grid item md={6}>
        <Skeleton variant="text" sx={{ fontSize: "24px" }} />
        <Skeleton variant="rectangular" width={"100%"} height={200} />
        <Stack direction="row" spacing={2} sx={{ marginTop: "12px" }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={40} height={40} />
        </Stack>
      </Grid>
      <Grid item md={6}>
        <Skeleton variant="text" sx={{ fontSize: "24px" }} />
        <Skeleton variant="rectangular" width={"100%"} height={200} />
        <Stack direction="row" spacing={2} sx={{ marginTop: "12px" }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={40} height={40} />
        </Stack>
      </Grid>
      <Grid item md={6}>
        <Skeleton variant="text" sx={{ fontSize: "24px" }} />
        <Skeleton variant="rectangular" width={"100%"} height={200} />
        <Stack direction="row" spacing={2} sx={{ marginTop: "12px" }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={40} height={40} />
        </Stack>
      </Grid>
    </Grid>
  );
}
