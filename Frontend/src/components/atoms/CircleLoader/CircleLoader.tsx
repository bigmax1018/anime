import { Box, CircularProgress } from "@mui/material";

export default function CircleLoader(props: any) {
	return (
		<Box
			sx={{
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				position: "absolute",
				zIndex: 9999,
				backdropFilter: "blur(2px)",
				textAlign: "center",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<CircularProgress {...props} />
		</Box>
	);
}
