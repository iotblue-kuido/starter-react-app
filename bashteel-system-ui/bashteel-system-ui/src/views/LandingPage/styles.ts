import {makeStyles} from "@mui/styles";
import {Theme} from "@mui/material/styles";

export const useStyles = makeStyles((theme:Theme) => ({
    root: {
        maxWidth: 500,
        padding: theme.spacing(4,2),
        background: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius
    },
    value: {
        '&.error': {
            color: theme.palette.error.main,
        }
    }
}))



