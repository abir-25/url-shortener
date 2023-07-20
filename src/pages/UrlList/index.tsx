import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LocalStorage from "../../utils/LocalStorage";
import {useEffect, useState} from "react";
import {Container, useMediaQuery} from "@mui/material";
import Box from "@mui/material/Box";
import {useTheme} from "@mui/material/styles";
import { Link } from '@mui/material';
import {Link as RouterLink} from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function UrlList() {
    const theme = useTheme();
    const navigate = useNavigate();

    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = React.useState(false);

    const [urlList, setUrlList] = useState([])
    const [deleteId, setDeleteId] = useState(0)

    interface urlObject {
        id: number;
        longUrl: string;
        shortUrl: string;
    }

    useEffect(()=>{
        getUrlList();
    }, [])

    const getUrlList = () =>{
        setUrlList(LocalStorage.getURLFromLocalStorage());
    }

    const handleClickOpen = (id: number) => {
        setDeleteId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setDeleteId(0);
        setOpen(false);
    };

    const handleDelete = () =>{
        let updatedUrlList = urlList.filter((item: urlObject) => item.id !== deleteId);
        LocalStorage.saveURLToLocalStorage(updatedUrlList);
        setOpen(false);
        getUrlList();
    }

    const handleEdit = (id: number) =>{
        navigate("/editUrl", {
            state: {
                id: id,
            },
        });
    }

    return (
        <Container maxWidth="lg"
                   sx={{display: 'flex',
                       justifyContent: 'center',
                       alignItems: 'center',
                       height: '90vh'}} >
            <Box
                sx={{
                    width: isSmallScreen ? '100%' : isMediumScreen? '95%' : '90%',
                    minHeight: 650,
                    overflowY: 'auto',
                    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px'
                }}>
                <TableContainer>
                    <Table sx={{ minWidth: '300px' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell width='57%'><Typography sx={{fontWeight: '500'}}>Long Url</Typography></TableCell>
                                <TableCell width='27%'><Typography sx={{fontWeight: '500'}}>Short Url</Typography></TableCell>
                                <TableCell width='16%'><Typography sx={{fontWeight: '500'}}>Action</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {urlList.map((row: urlObject) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Link sx={{textDecoration: 'none'}} href={row.shortUrl} component="a" target="_blank"><Typography>{row.longUrl}</Typography></Link>
                                    </TableCell>
                                    <TableCell><Link sx={{textDecoration: 'none'}} href={row.shortUrl} component="a" target="_blank"><Typography>{row.shortUrl}</Typography></Link></TableCell>
                                    <TableCell>
                                        <Box sx={{display: 'flex'}}>
                                            <Typography sx={{cursor: 'pointer', mr: 1}} onClick={()=>{handleEdit(row.id)}}>Edit </Typography> ||  <Typography sx={{cursor: 'pointer', ml: 1}} onClick={()=>{handleClickOpen(row.id)}}>Delete </Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete URL"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure to delete this URL?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>

    );
}