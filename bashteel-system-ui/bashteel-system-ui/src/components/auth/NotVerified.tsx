import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NotVerified() {
  const { t } = useTranslation();
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="50vh"
    >
      <Typography variant="h4" align="center">
        {t('NOT_AUTHORIZED_MSG')}
      </Typography>
      <Box py={4}>
        <Link style={{ color: 'lightgrey' }} to={`/`}>
          {t('GO_TO_HOMEPAGE')}
        </Link>
      </Box>
    </Box>
  );
}
