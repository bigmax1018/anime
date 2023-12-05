import { styled } from "@mui/material/styles";
import { Switch, SwitchProps as BaseSwitchProps } from "@mui/material";

export { default } from "./SwitchButton";

export interface SwitchOwnProps {
	label?: string;
}

export type SwitchProps = SwitchOwnProps & BaseSwitchProps;

export const Android12Switch = styled(Switch)(({ theme }) => ({
	padding: 8,
	"& .MuiSwitch-track": {
		borderRadius: 22 / 2,
		"&:before, &:after": {
			content: '""',
			position: "absolute",
			top: "50%",
			transform: "translateY(-50%)",
			width: 16,
			height: 16,
		},
		"&:before": {
			backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
				theme.palette.getContrastText(theme.palette.primary.main)
			)}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
			left: 12,
		},
		"&:after": {
			backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
				theme.palette.getContrastText(theme.palette.primary.main)
			)}" d="M19,13H5V11H19V13Z" /></svg>')`,
			right: 12,
		},
	},
	"& .MuiSwitch-thumb": {
		boxShadow: "none",
		width: 16,
		height: 16,
		margin: 2,
	},
}));

// export const AntSwitch = styled(Switch)(({ theme }) => ({
//   width: 28,
//   height: 16,
//   padding: 0,
//   display: 'flex',
//   '&:active': {
//     '& .MuiSwitch-thumb': {
//       width: 15,
//     },
//     '& .MuiSwitch-switchBase.Mui-checked': {
//       transform: 'translateX(9px)',
//     },
//   },
//   '& .MuiSwitch-switchBase': {
//     padding: 2,
//     '&.Mui-checked': {
//       transform: 'translateX(12px)',
//       color: '#fff',
//       '& + .MuiSwitch-track': {
//         opacity: 1,
//         backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
//       },
//     },
//   },
//   '& .MuiSwitch-thumb': {
//     boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     transition: theme.transitions.create(['width'], {
//       duration: 200,
//     }),
//   },
//   '& .MuiSwitch-track': {
//     borderRadius: 16 / 2,
//     opacity: 1,
//     backgroundColor:
//       theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
//     boxSizing: 'border-box',
//   },
// }));
