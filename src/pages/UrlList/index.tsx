import * as React from 'react';
import {TableContainer, Table, TableHead, TableBody, TableCell, TableRow, Container, useMediaQuery, Box, Link, Typography, useTheme, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress } from '@mui/material';
import LocalStorage from "../../utils/LocalStorage";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import noData from "../../assets/no-data.png";
import {Link as RouterLink} from 'react-router-dom';

export default function UrlList() {
    const theme = useTheme();
    const navigate = useNavigate();

    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = React.useState(false);

    const [urlList, setUrlList] = useState([])
    const [deleteId, setDeleteId] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    interface urlObject {
        id: number;
        longUrl: string;
        shortUrl: string;
    }

    useEffect(()=>{
        setIsLoading(true);
        getUrlList();
    }, [])

    const getUrlList = () =>{
        let urlListData = LocalStorage.getURLFromLocalStorage();
        setIsLoading(false);
        setUrlList(urlListData);
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
                    height: 650,
                    overflowY: 'auto',
                    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px'
                }}>
                {
                    urlList?.length>0 && !isLoading ?
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
                        :
                        urlList?.length===0 && !isLoading ?
                        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                            <img width='210px' src={noData} alt='No Data'/>
                            <Typography sx={{my: 3}}>No Data Found</Typography>
                            <Button variant="contained" onClick={()=>{ navigate("/")}}>Shorten URL</Button>
                        </Box>
                            :
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <CircularProgress />
                        </Box>
                }

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