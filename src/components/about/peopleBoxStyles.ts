import { Theme } from '@material-ui/core/styles';
import { makeStyles, createStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minWidth: 275,
        },
        listRoot: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
        socialIcon: {
            width: '22px !important',
            height: '22px !important',
        },
    }),
);
