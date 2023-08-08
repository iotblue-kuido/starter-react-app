import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Error404 from './Error404.svg';
import { useNavigate } from 'react-router';
import { Paths } from '../../router/paths';

interface Props {
	onReset: () => void;
}

const Page_404: React.ComponentType<Props> = function (props: Props) {
	const { onReset } = props;
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
				width="25vw"
			>
				<Box height="40vh">
					<img src={Error404} width="100%" height="100%" />
				</Box>
				<Box mt={4} style={{ textAlign: 'center' }}>
					<Typography
						variant="h4"
						style={{ fontFamily: 'Poppins', fontWeight: 500 }}
					>
						Page not found
						{/* {t('general.not_found')} */}
					</Typography>
				</Box>
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
			</Box>
		</Box>
	);
};

export default Page_404;
