import { default as BaseTooltip } from "@mui/material/Tooltip";
type BaseTooltipProps = React.ComponentProps<typeof BaseTooltip>;
export default function Tooltip(props: BaseTooltipProps) {
	return <BaseTooltip {...props} />;
}
