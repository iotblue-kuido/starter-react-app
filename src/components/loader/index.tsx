import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import MUIBox, { BoxProps } from '@mui/material/Box';

const Box = styled(MUIBox)<BoxProps>(({ theme }) => ({
	background: theme.palette.background.paper
}));

export default function Loader({
	fullHeight = true,
	fullWidth = true,
}: {
	fullHeight?: boolean;
	fullWidth?: boolean;
}) {
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			height={fullHeight ? '100%' : 'auto'}
			width={fullWidth ? '100%' : 'auto'}
		>
			<CircularProgress
				size={fullHeight && fullWidth ? 32 : 16}
				color="primary"
			/>
		</Box>
	);
}
