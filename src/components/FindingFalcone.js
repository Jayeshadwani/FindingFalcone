import React, { useContext, useEffect } from 'react'
import { Button,Grid,Typography,CardContent,Card } from '@mui/material'
import baseurl from './Baseurl';
import { useSnackbar } from 'notistack';
import FinalPlanet from './FinalPlanet';
import {Link} from "react-router-dom"
import { AppContext } from './AppContext';
import { Box } from '@mui/system';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';




export default function FindingFalcone() {
    
    const props = useContext(AppContext)
    const totalTimeTaken = props.totalTimeTaken
    const finalPlanets = props.finalPlanets
    const finalVehicles = props.finalVehicles 
    const setVehicles = props.setVehicles
    const setPlanets = props.setPlanets
    const setClonePlanets = props.setClonePlanets
      
    const { enqueueSnackbar } = useSnackbar()
    const select = [1,2,3,4]

    const handleChecks = (e) => {
        console.log(finalPlanets.length,finalVehicles.length,totalTimeTaken)
        if(finalPlanets.length >= 4 && finalVehicles.length >= 4 && totalTimeTaken > 0 ){}
        else
        {
            e.preventDefault()
            enqueueSnackbar("Please select planets and vehicles to search for Al falcone",{variant:"warning"})
        }
    }

    const ClonePlanetsArray = (planets) => {
        if(!planets) return
        const cloneArrayOfPlanets = planets.map((planet)=>{
            return {...planet,selected:false}
        })
        setClonePlanets(cloneArrayOfPlanets)
    }

    const fetchVehicles = async (baseurl) => {
        try {
            const response = await fetch(`${baseurl}/vehicles`).then((res)=>res.json())    
            setVehicles(response)
            return response
        } 
        catch (error) 
        {
            enqueueSnackbar("Failed to fetch data.Check if backend returns valid JSON and is running.",{variant:"error"})
            return []
        }
    }

    const fetchPlanets = async(baseurl) => {
        try {
            const response = await fetch(`${baseurl}/planets`).then(res => res.json())
            setPlanets(response)
            return response
        } catch (error) {
            enqueueSnackbar("Failed to fetch data.Check if backend returns valid JSON and is running.",{variant:"error"})
            return []
        }
    }

    useEffect(()=>{
        const onLoad = async() => {
            await fetchVehicles(baseurl)
            const planetsArr = await fetchPlanets(baseurl)
            ClonePlanetsArray(planetsArr)
        }
        onLoad();
    },[])

  return (
    <Box sx={{backgroundColor:"primary.light",width:"100vw",height:"100vh"}}>  
        <Grid container >
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
                <Grid container  >
                    <Grid item xs={6}>
                            <Typography
                        variant='h3'
                        sx={{marginTop:"0.2em"}}
                        >Finding Falcone!</Typography>
                        <Typography
                        variant='h6'
                        gutterBottom
                        >Select planets you want to search in:</Typography>
                    </Grid>
                    <Grid item xs={6} sx={{display:"flex",alignItems:"flex-end",justifyContent:"flex-end"}}>
                        <Button variant='outlined' component="div" sx={{padding:0,marginTop:2,marginLeft:2}}>
                            <Typography
                                variant='h6'                           
                                className="text-capitalize button"
                                sx={{padding:"0.5em",display:"flex"}}
                            >Time Taken:<Typography className="text-capitalize" variant="h6" sx={{marginLeft:0.5}}>{totalTimeTaken}</Typography> </Typography>
                        </Button>
                    </Grid>
                <Grid/>
                <Grid container sx={{marginY:1,padding:1,backgroundColor:"#ffffff",minHeight:"300px",borderRadius:3}}  >
                        {select.map((id)=>{
                            return(
                                <Grid key={id} item xs={3}>
                                    <Card  variant='outlined' sx={{backgroundColor:"secondary.main",color:"primary.main"}} >
                                        <CardContent>
                                            <Typography
                                                align='left'
                                                sx={{marginLeft:1}}
                                                gutterBottom
                                                fontSize={16}
                                                >
                                                    {`Destination${id}`}
                                            </Typography>
                                        
                                    
                                            <FinalPlanet />
                                        </CardContent>
                                    </Card>    
                                </Grid>
                            )
                        })}
                
                </Grid> 
                
                
                
            </Grid>            
            <Grid item xs={1}></Grid>

        </Grid>
        </Grid>
        <Box  sx={{display:"flex",justifyContent:"center",alignItems:"center"}}> 
            <Link to="/find" onClick={handleChecks} className="link">
                    <Button
                        variant="contained"
                        sx={{padding:1,marginTop:2,marginLeft:2,backgroundColor:"primary"}}
                        endIcon={<RocketLaunchIcon /> }
                        > 
                        <Typography
                            variant='h6'
                            align='center'
                            className="text-capitalize link"
                        >
                            Find Queen Al Falcone
                        </Typography>
                    </Button>
                </Link>
                {/* <Typography variant="h6" fontSize={14} > Coding Problem : www.geektrust.in/finding-falcone </Typography> */}
        </Box>
    </Box>
  )
}




