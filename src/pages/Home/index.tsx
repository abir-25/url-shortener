import React from 'react';
import { Container} from "@mui/material";
import './index.css'
import ConvertUrl from "../../component/ConvertUrl";

function Home() {

    return (
        <Container maxWidth="lg"
                   sx={{display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '90vh'}} >
            <ConvertUrl id={0} />
        </Container>
    );
}

export default Home;
