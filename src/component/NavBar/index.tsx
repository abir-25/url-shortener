import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import logo from "../../assets/icon.png";
import {Link} from "react-router-dom";
import './index.css';
import MenuItem from "@mui/material/MenuItem";
export default function NavBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <Link to='/'>
                            <img width="40px" src={logo} alt="Logo" />
                        </Link>

                    </IconButton>
                    <MenuItem>
                        <Typography variant="h6">
                            <Link to='/urlList'>URL List</Link>
                        </Typography>
                    </MenuItem>
                </Toolbar>
            </AppBar>
        </Box>
    );
}