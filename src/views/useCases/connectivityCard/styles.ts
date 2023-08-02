import {makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export const useStyles = makeStyles((theme:Theme) => ({
    root: {
        maxWidth: 400,
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



