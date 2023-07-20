import * as React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {CheckCircle, Cancel, Info} from "@mui/icons-material";
import {useTheme} from "@mui/material/styles";
import {useMediaQuery} from "@mui/material";
export default function ToastMessage(props: any) {
    const {type, message} = props;
    const theme = useTheme();

    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Box sx={{display: 'flex', flexDirection:'row', justifyContent: 'center', alignItems:'center'}}>
            {
                type === 'success' && <CheckCircle sx={{color: '#09ad49', fontSize: '20px'}}/>
            }
            {
                type === 'info' && <Info sx={{color: '#60a5fa', fontSize: '20px'}}/>
            }
            {
                type === 'error' && <Cancel sx={{color: '#f87171', fontSize: '20px'}}/>
            }
            <Typography sx={{color: type === 'success' ? '#09ad49' : type === 'info' ? '#60a5fa' : '#f87171', mr: 1, ml: 1, fontSize: isSmallScreen ? '12px' : '15px'}}>{message}</Typography>
        </Box>
    );
}