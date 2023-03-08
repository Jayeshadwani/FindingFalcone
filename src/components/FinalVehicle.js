import React,{useState} from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useContext } from "react";
import { AppContext } from "./AppContext";

export default function FinalVehicle({selectedPlanet}) 
{
  const props = useContext(AppContext)  
  const vehicles = props.vehicles
  const setVehicles = props.setVehicles
  const totalTimeTaken = props.totalTimeTaken
  const setTotalTimeTaken = props.setTotalTimeTaken
  const finalVehicles = props.finalVehicles
  const setFinalVehicles = props.setFinalVehicles 
  const initialValue = ""
  const [selected, setSelected] = useState(initialValue);
  const [availableVehicles,setAvailableVehicles] = useState(vehicles)
  const lastTime = props.lastTime
  const setLastTime = props.setLastTime


  
  const handleChange = (event) => {
    const selectedVehicle = event.target.value
    let updatedVehicles = []
    var vehicleSpeed = 0
    let currentTime = 0
    
    if (selected === initialValue) 
    {
      updatedVehicles = availableVehicles.map((vehicle)=>
      {
        if(vehicle.name === selectedVehicle) {
          vehicleSpeed = vehicle.speed
          return {...vehicle, total_no : vehicle.total_no - 1}
        }
        else return vehicle;
      })
      currentTime = (selectedPlanet.distance / vehicleSpeed)  
      setTotalTimeTaken(currentTime + totalTimeTaken )
    }
    else 
    {
      updatedVehicles = availableVehicles.map((vehicle)=>{
        if(vehicle.name === selected)
        {
          setFinalVehicles(finalVehicles.filter(v=> v.name !== vehicle.name))
          return {...vehicle, total_no : vehicle.total_no + 1}
        }
        else return vehicle
      })

      updatedVehicles = updatedVehicles.map((vehicle)=>
      {
        if(vehicle.name === selectedVehicle){
          vehicleSpeed = vehicle.speed
          return {...vehicle,total_no : vehicle.total_no - 1}
        }
        else return vehicle
      })
      currentTime = (selectedPlanet.distance / vehicleSpeed)  
      setTotalTimeTaken(currentTime + totalTimeTaken - lastTime)
    }

    setLastTime(currentTime)
    setFinalVehicles([...finalVehicles,selectedVehicle])
    setSelected(selectedVehicle)
    setAvailableVehicles(updatedVehicles)
    setVehicles(updatedVehicles)
  };

  return (
    <>
      <FormControl>
        <RadioGroup
          id="vehicles"
          value={selected}
          onChange={handleChange}
        >
          {availableVehicles.map((vehicle) => {
             return (
              <FormControlLabel
                disabled={selectedPlanet.distance > vehicle.max_distance ? true : false }
                key={vehicle.name}
                value={vehicle.name}
                control={<Radio />}
                label={`${vehicle.name}(${vehicle.total_no})`}
              />
            ); 
          })}
        </RadioGroup>
    </FormControl>
    </>
  )
}

