import BaseBackdrop from "@mui/material/Backdrop";
type BaseBackdropProps = React.ComponentProps<typeof BaseBackdrop>;
export default function Backdrop(props: BaseBackdropProps) {
	return (
		<BaseBackdrop
			sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
			{...props}
		/>
	);
}
