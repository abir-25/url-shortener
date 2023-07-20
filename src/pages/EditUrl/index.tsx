import React, {useState} from 'react';
import { Container} from "@mui/material";
import './index.css'
import ConvertUrl from "../../component/ConvertUrl";
import { useLocation } from 'react-router-dom';
function EditUrl() {
    const { state } = useLocation();
    const urlId = state?.id ?? 0;

    return (
        <Container maxWidth="lg"
                   sx={{display: 'flex',
                       justifyContent: 'center',
                       alignItems: 'center',
                       height: '90vh'}} >
            <ConvertUrl id={urlId} />
        </Container>
    );
}

export default EditUrl;
