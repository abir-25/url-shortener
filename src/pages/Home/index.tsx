import React, {useState} from 'react';
import {Box, Button, Card, CardActions, CardContent, Container, TextField, Typography} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import axios from "axios";
import {ContentCopy, CachedOutlined, SaveOutlined, CheckCircle} from "@mui/icons-material";
import './index.css'
import LocalStorage from "../../utils/LocalStorage";
import ToastMessage from "../../component/ToastMessage";

function Home() {
    const theme = useTheme();

    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [value, setValue] = useState('');
    const [longUrl, setLongUrl] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [shortenCompleted, setShortenCompleted] = useState(false);

    interface urlObject {
        id: number;
        longUrl: string;
        shortUrl: string;
    }

    const handleChange = (event: any) => {
        setValue(event.target.value);
        setShortenCompleted(false);
        setError(false);
        setLoading(false);
        setMessage('');
    };

    const handleConvert = async () =>{
        setLoading(true);
        await fetchData();
    }

    const fetchData = async () => {
        if(value.length<5){
            setError(true);
            setErrorMessage('Username must be at least 5 characters long');
            setLoading(false);
            setMessage('');
        }
        else{
            try {
                const res = await axios(`https://api.shrtco.de/v2/shorten?url=${value}`);
                setLongUrl(value);
                setValue(res.data.result.full_short_link);
                setLoading(false);
                setShortenCompleted(true);
                setMessage('Link has been shortened');
            } catch (err: any) {
                setError(true);
                setErrorMessage(err?.response?.data?.error);
                setShortenCompleted(false);
                setLongUrl('');
            } finally {
                setLoading(false);
            }
            removeMessage();
        }
    }

    const handleCopyContent = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setMessage('Link has been copied');
        } catch (err) {
            setMessage('Link has been failed to copy');
        }
        removeMessage();
    }

    const removeMessage = () =>{
        setTimeout(()=>{
            setMessage('');
        }, 1500)
    }

    const handleSaveUrl = () =>{
        let urlList = LocalStorage.getURLFromLocalStorage();
        let updatedUrlList = removeIfURLExists(urlList, longUrl);
        const linkObj:urlObject = {
            id: Math.floor(Math.random() * 1000000000),
            longUrl: longUrl,
            shortUrl: value
        };
        updatedUrlList.push(linkObj);
        LocalStorage.saveURLToLocalStorage(updatedUrlList);
        setMessage('Link has been saved');
        removeMessage();
    }

    const removeIfURLExists = (urlList: Array<urlObject>, urlToCheck: String) => {
        return urlList.filter((item: urlObject) => item.longUrl !== urlToCheck);
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
                }}>
                <Card
                    sx={{
                        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
                        p: isSmallScreen ? 1 : 2
                    }}>
                    <CardContent>
                        <Typography variant="h3" component="h3" sx={{color: '#666666', textAlign: 'left', fontWeight: '500', fontSize: isSmallScreen ? '30px' : '40px'}}>
                            Shorten a long link
                        </Typography>
                        <Box
                            sx={{
                                mt: 4,
                                position: 'relative'
                            }}
                            component="form" autoComplete="off">
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
                                    <SaveOutlined className='icon' onClick={handleSaveUrl} />
                                    <ContentCopy className='icon' sx={{ right: '45px'}} onClick={handleCopyContent}/>
                                </>
                            }
                        </Box>
                    </CardContent>
                    <CardActions sx={{display:'flex', justifyContent:'space-between'}}>
                        <LoadingButton
                            size="large"
                            color="primary"
                            onClick={handleConvert}
                            loading={loading}
                            loadingPosition="start"
                            startIcon={<CachedOutlined />}
                            variant="contained"
                            sx={{ml: 1}}
                        >
                            <span>Convert</span>
                        </LoadingButton>
                        {
                            message.length>0 &&
                                <ToastMessage type='success' message={message} />
                        }
                    </CardActions>
                </Card>


            </Box>
        </Container>
    );
}

export default Home;
