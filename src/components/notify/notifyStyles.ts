// Copyright (c) 2021 Amirhossein Movahedi (@qolzam)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles/createTheme';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            boxShadow: 'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 12px 24px 0px',
            border: 'solid 1px rgba(145, 158, 171, 0.08)',
            overflow: 'inherit',
            marginTop: '12px',
            marginLeft: '4px',
        },
        paper: {},
        container: {
            width: 360,
            maxWidth: '100%',
        },
        fullPageXs: {
            [theme.breakpoints.down('xs')]: {
                width: '100%',
                height: '100%',
                margin: 0,
                overflowY: 'auto',
                maxHeight: '100%',
                maxWidth: '100%',
                position: 'relative',
                top: '0 !important',
                left: '0 !important',
            },
        },
        noNotify: {
            textAlign: 'center',
            width: '100%',
            padding: 10,
        },
        popperClose: {
            pointerEvents: 'none',
        },
        popperOpen: {
            zIndex: 1,
            maxWidth: 500,
            overflowY: 'auto',
        },
        popper: {},
        overflowHidden: {
            overflow: 'hidden',
        },
        list: {
            padding: 5,
            width: '100%',
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            padding: '16px 20px',
        },
        headerContent: {
            flexGrow: 1,
        },
        listRoot: {
            height: 'auto',
        },
        listWrapper: {
            height: '100%',
            overflow: 'hidden',
            flexGrow: 1,
        },
    }),
);
