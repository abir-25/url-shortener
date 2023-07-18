import React, {useState} from 'react';
import {Box, Button, Card, CardActions, CardContent, Container, TextField, Typography} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import axios from "axios";
import {ContentCopy, CachedOutlined, SaveOutlined, CheckCircle} from "@mui/icons-material";
import './index.css'

function Home() {
    const theme = useTheme();

    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [infoMessage, setInfoMessage] = useState('');
    const [shortenCompleted, setShortenCompleted] = useState(false);


    const handleChange = (event: any) => {
        setValue(event.target.value);
        setShortenCompleted(false);
        setError(false);
        setLoading(false);
        setInfoMessage('');
    };

    const handleSubmit = async () =>{
        setLoading(true);
        await fetchData();
    }

    const fetchData = async () => {
        if(value.length<5){
            setError(true);
            setErrorMessage('Username must be at least 5 characters long');
            setLoading(false);
            setInfoMessage('');
        }
        else{
            try {
                const res = await axios(`https://api.shrtco.de/v2/shorten?url=${value}`);
                setValue(res.data.result.full_short_link);
                setLoading(false);
                setShortenCompleted(true);
                setInfoMessage('Link has been shortened');
                removeInfoMessage();
            } catch(err: any) {
                setError(true);
                setErrorMessage(err?.response?.data?.error);
            } finally {
                setLoading(false);
            }
        }
    }

    async function copyContent() {
        try {
            await navigator.clipboard.writeText(value);
            setInfoMessage('URL has been copied');
        } catch (err) {
            setInfoMessage('URL has been failed to copy');
        }
        removeInfoMessage();
    }

    const removeInfoMessage = () =>{
        setTimeout(()=>{
            setInfoMessage('');
        }, 1500)
    }


    return (
        <Container maxWidth="lg"
                   sx={{display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh'}} >
            <Box
                sx={{
                    width: isSmallScreen ? '100%' : isMediumScreen? '95%' : '90%',
                    height: 340
                }}
            >
                <Card sx={{
                    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
                    p: 2
                }}>
                    <CardContent>
                        <Typography variant="h3" component="h3" sx={{color: '#666666', textAlign: 'left', fontWeight: '500'}}>
                            Shorten a long link
                        </Typography>
                        <Box sx={{mt: 4, position: 'relative'}} component="form"
                             autoComplete="off">
                            <TextField
                                sx={{
                                    width: '100%'
                                }}
                                label="URL"
                                value={value}
                                onChange={handleChange}
                                error={error}
                                helperText={error && errorMessage}
                            />
                            {shortenCompleted &&
                                <>
                                    <SaveOutlined className='icon'/>
                                    <ContentCopy className='icon' sx={{ right: '45px'}} onClick={copyContent}/>
                                </>
                            }
                        </Box>
                    </CardContent>
                    <CardActions sx={{display:'flex', justifyContent:'space-between'}}>
                        <LoadingButton
                            size="large"
                            color="primary"
                            onClick={handleSubmit}
                            loading={loading}
                            loadingPosition="start"
                            startIcon={<CachedOutlined />}
                            variant="contained"
                            sx={{ml: 1}}
                        >
                            <span>Convert</span>
                        </LoadingButton>
                        {
                            infoMessage.length>0 &&
                            <Box sx={{display: 'flex', flexDirection:'row', justifyContent: 'center', alignItems:'center'}}>
                                <CheckCircle sx={{color: '#0abf50', fontSize: '20px'}}/>
                                <Typography sx={{color: '#0abf50', mr: 1, ml: 1}}>{infoMessage}</Typography>
                            </Box>
                        }


                    </CardActions>
                </Card>


            </Box>
        </Container>
    );
}

export default Home;
