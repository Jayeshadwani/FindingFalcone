import React,{useContext, useState} from 'react'
import FinalVehicle from './FinalVehicle';
import { Autocomplete,TextField,Box } from '@mui/material';
import { AppContext } from './AppContext';

export default function FinalPlanet() {
  const props = useContext(AppContext)
  const finalPlanets = props.finalPlanets
  const setFinalPlanets = props.setFinalPlanets
  const planets = props.clonePlanets
  const setPlanets = props.setClonePlanets  
  const [selected, setSelected] = useState({name:"",distance:0});
  const [showVehicles, setShowVehicles] = useState(false);
  const initialValue = ""
  


  const handleChange = (event,planet) => {
    const selectedPlanet = planet.name
    let updatedPlanets = []
    if(selected.name === initialValue)
    {
      updatedPlanets = planets.map((item) => {
                            if (item.name === selectedPlanet) 
                            {
                              return {...item,selected:true};
                              
                            } 
                            else return item;
                          });
      setPlanets(updatedPlanets)

    }
    else{
      updatedPlanets = planets.map((item) => {
                if (item.name === selected.name) {
                  setFinalPlanets(finalPlanets.filter((p)=> p.name !== item.name))
                  return {...item,selected:false}
                } else return item;
            });
      
      updatedPlanets = updatedPlanets.map((item) => {
          if (item.name === planet.name) 
          {
            return {...item,selected:true}
          } else return planet;
      });
      setPlanets(updatedPlanets)
    }
    setSelected({ 
        name : planet.name, 
        distance : planet.distance
      })

    
    setFinalPlanets([...finalPlanets,selectedPlanet])
    setShowVehicles(true)
  }

  return (
    <>
      <Autocomplete
        disablePortal
        disableClearable
        id="autocomplete-planets"
        getOptionLabel={(planet)=>planet.name || "unnamed Planet"}
        options={planets}
        isOptionEqualToValue={(option,value)=>option.name === value.name}
        renderOption={(props,planet)=>(
          !planet.selected ? <Box component="li" {...props} key={planet.name}>
            {planet.name}
          </Box>  : null
        )}
        onChange={(e,v) => handleChange(e,v)}
        noOptionsText="No planet found"
        renderInput={(params) => <TextField {...params} label="Select" />}
      />
      {showVehicles ? <FinalVehicle selectedPlanet={selected} /> : null}
    </>
  )
}
