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

export default function UrlList() {
    const [urlList, setUrlList] = useState([])
    useEffect(()=>{
        setUrlList(LocalStorage.getURLFromLocalStorage());
    }, [])

    interface urlObject {
        id: number;
        longUrl: string;
        shortUrl: string;
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Long Url</TableCell>
                        <TableCell>Short Url</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {urlList.map((row: urlObject) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.longUrl}
                            </TableCell>
                            <TableCell>{row.shortUrl}</TableCell>
                            <TableCell align="right">Edit || Delete</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}