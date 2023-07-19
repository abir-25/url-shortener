import * as React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {CheckCircle, Cancel, Info} from "@mui/icons-material";

export default function ToastMessage(props: any) {
    const {type, message} = props;
    return (
        <Box sx={{display: 'flex', flexDirection:'row', justifyContent: 'center', alignItems:'center'}}>
            {
                type === 'success' && <CheckCircle sx={{color: '#0abf50', fontSize: '20px'}}/>
            }
            {
                type === 'info' && <Info sx={{color: '#60a5fa', fontSize: '20px'}}/>
            }
            {
                type === 'error' && <Cancel sx={{color: '#f87171', fontSize: '20px'}}/>
            }
            <Typography sx={{color: type === 'success' ? '#0abf50' : type === 'info' ? '#60a5fa' : '#f87171', mr: 1, ml: 1}}>{message}</Typography>
        </Box>
    );
}