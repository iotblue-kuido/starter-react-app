import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './500.css';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

interface Props {
	onReset: () => void;
}

export default function Page_500({ onReset }: Props) {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { pathname } = location;

	const getApplicationIdByPathName: () => string = () => {
		const pathSections = pathname.split('/');
		return pathSections[1];
	};
	return (
		<>
			<Box
				width={'100vw'}
				height="70%"
				display="flex"
				justifyContent="center"
				flexDirection="column"
			>
				<Box fontStyle={{ textAlign: 'center' }}>
					<h1>500</h1>
					<h2>
						{t('UNEXPECTED_ERROR')} <b>:(</b>
					</h2>
					<div className="gears">
						<div className="gear one">
							<div className="bar"></div>
							<div className="bar"></div>
							<div className="bar"></div>
						</div>
						<div className="gear two">
							<div className="bar"></div>
							<div className="bar"></div>
							<div className="bar"></div>
						</div>
						<div className="gear three">
							<div className="bar"></div>
							<div className="bar"></div>
							<div className="bar"></div>
						</div>
					</div>
				</Box>
			</Box>
			<Box
				display="flex"
				justifyContent="center"
				mt={4}
				position="fixed"
				bottom="8rem"
				width="100%"
			>
				<Button
					variant="outlined"
					color="inherit"
					disableElevation
					style={{ paddingBottom: 5, paddingTop: 5 }}
					onClick={() => {
						navigate(`/${getApplicationIdByPathName()}`);
						onReset();
					}}
				>
					{t('GO_TO_HOMEPAGE')}
				</Button>
			</Box>
		</>
	);
}
