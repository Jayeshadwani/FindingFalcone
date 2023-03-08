import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import baseurl from './Baseurl'
import { useSnackbar } from 'notistack'
import {AppContext} from "./AppContext"
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

export default function Result() {
    const props = useContext(AppContext)
    const totalTimeTaken = props.totalTimeTaken
    const setTotalTimeTaken = props.setTotalTimeTaken
    const isSuccess = props.isSuccess
    const setIsSuccess = props.setIsSuccess
    const finalPlanets = props.finalPlanets
    const setFinalPlanets = props.setFinalPlanets
    const setFinalVehicles = props.setFinalVehicles
    const finalVehicles = props.finalVehicles 
    const [isLoading,setIsLoading] = useState(false)
    const { enqueueSnackbar } = useSnackbar()
    const [token,setToken] = useState()
    const [results,setResults] = useState({})
    


    const handleReset = () => {
        setTotalTimeTaken(0)
        setFinalPlanets([])
        setFinalVehicles([])

    }
    
        
    const fetchResults = async (token) => {
        
        console.log(isSuccess,"isSuccess prop")
        if(!token && !finalPlanets && !finalVehicles) return
        try
        {
            const response = await fetch(`${baseurl}/find`,{
            method : "POST",
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
            },body : JSON.stringify({
                "token" : `${token}`,
                "planet_names" : finalPlanets,
                "vehicle_names" : finalVehicles 
            })}).then(res => res.json())

            setResults(response)

            enqueueSnackbar("Successfully fetched results",{variant:"success"})
            
            if(response)
            {
                if(response.status === "success") {
                    setIsSuccess(true)
                }
                else{
                    setIsSuccess(false)
                }
            }
        }
        catch (error) {
            enqueueSnackbar("Failed to fetch results.Check if backend server is running and returns valid JSON.",{variant:"error"})   
        }
    }

    const fetchToken = async () => {
        try {
            const response = await fetch(`${baseurl}/token`,{
                method : "POST",
                headers : {
                    "accept" : "application/json"
                }
            }).then((resp)=>resp.json())
            setToken(response.token)    
            enqueueSnackbar("Successfully fetched access token",{variant:"success"})
            return response.token
        } catch (error) {
            enqueueSnackbar("Failed to fetch token.Check backend is running and returning valid response",{variant:"error"})
        }
    }

    useEffect(()=>{
        setIsLoading(true)
        const onLoad = async () => {
            const token = await fetchToken()
            await fetchResults(token,finalPlanets,finalVehicles)
        }
        onLoad().then(() => setIsLoading(false))
    },[])


  return (
    <Box  sx={{width:"100vw",height:"100vh", backgroundColor:"primary.light"}}>
        
        
        <Box className="poster" sx={{minHeight:"50vh",minWidth:"100vw"}}>
        <Typography
            color="primary.dark"
            variant='h3'
            align='left'
            marginLeft={10}
            >Finding Falcone!</Typography>
            {!isLoading ? <>
            {isSuccess ? 
            <>
            <Grid container sx={{marginLeft:10,marginTop:2}} >
                <Grid item sx={{border:2,borderColor:"#43A047",borderRadius:2,backgroundColor:"#ffffff"}}>
                    <Typography
                        variant='h5'
                        color="primary.dark"
                    >
                     Success! Congratulations on finding Queen Al Falcone. King Shan is mighty pleased.
                     <SentimentSatisfiedAltIcon />
                    </Typography>         
                    <Typography
                        variant='h6'
                        color="primary.dark"
                    >
                        Time Taken : {totalTimeTaken}
                    </Typography>
                    <Typography
                        variant='h6'
                        color="primary.dark"
                    >
                        Planet found : {results.planet_name}
                    </Typography>
                </Grid>
            </Grid>
            </> : 
            <>
                <Box sx={{display:"flex",marginLeft:10}}>
                    <Typography
                            sx={{border:2,borderRadius:2,borderColor:"#d32f2f",backgroundColor:"#ffffff"}}
                            variant='h5'
                            display="flex"
                            color="primary.dark"

                        >
                        Better luck next time! Queen is hiding.
                        <SentimentDissatisfiedIcon sx={{marginTop:0.5}}/>
                    </Typography>   
                    
                    
                  
                </Box>
            </>}
            <Box sx={{marginLeft:10,marginTop:5}}>
                <Link to="/" className='link'>
                    <Button 
                        variant='outlined'
                        size='large'
                        sx={{borderColor:"primary.dark",color:"primary.dark"}}            
                        className="text-capitalize"
                        onClick={handleReset}
                    >
                        <Typography variant="h6" >
                            Start Again
                        </Typography>
                    </Button>
                </Link>
                <Typography variant="h6" fontSize={12} sx={{marginTop:3,color:"primary.dark"}} > Coding Problem : www.geektrust.in/finding-falcone </Typography>
            </Box>      
            </> : <CircularProgress disableShrink/> }
        </Box>
        
        
    </Box>
  )
}
