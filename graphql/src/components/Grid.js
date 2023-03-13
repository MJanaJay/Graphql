import React from 'react';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/material/styles';
import { ClassNames } from '@emotion/react';

const styles = makeStyles({
    wrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0 5rem 0 5rem",
    },
    item: {
        paddingTop: "1rem",
    }
})

function Grid() {
    // const {graph, title, infoText} = ;
    // const classes = styles();
    // return ( 
    //     <div className={classes.wrapper}>
    //         <div className={classes.item}>{graph}</div>
    //         <Typography className={classes.item} variant="h4">{title}</Typography>
    //         <div className={classes.item}>
    //             <Typography className={classes.item} variant="h5">{infoText}</Typography>
    //         </div>
    //     </div>
    // );
    return (
        null
    )
}

export default Grid;