import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Error403 from './Error403.svg';
import { useNavigate } from 'react-router';
import { Paths } from '../../router/paths';

interface Props {
	onReset: () => void;
	showButton: boolean;
	message?: string;
}
export default function Page_403({ onReset, message, showButton }: Props) {
	const navigate = useNavigate();
	return (
		<Box
			width={'100vw'}
			height={'calc(100vh - 64px)'}
			display="flex"
			justifyContent="center"
		>
			<Box
				display="flex"
				justifyContent="center"
				flexDirection="column"
				width="33%"
			>
				<img src={Error403} />
				<Box mt={4} style={{ textAlign: 'center' }}>
					<Typography variant="h5">
						{message ||
							`You don't have permission to access on this server`}
					</Typography>
				</Box>
				{showButton && (
					<Box display="flex" justifyContent="center" mt={4}>
						<Button
							variant="contained"
							color="primary"
							disableElevation
							style={{ paddingBottom: 5, paddingTop: 5 }}
							onClick={() => {
								navigate(Paths.APP_HOME);
								onReset();
							}}
						>
							GO TO HOMEPAGE
						</Button>
					</Box>
				)}
			</Box>
		</Box>
	);
}
