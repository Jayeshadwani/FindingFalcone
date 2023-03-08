import { createContext, useState } from "react";

const AppContext = createContext()

const AppState = (props) => {
  const [totalTimeTaken,setTotalTimeTaken] = useState(0)    
  const [isSuccess,setIsSuccess] = useState(false)
  const [finalVehicles,setFinalVehicles] = useState([])
  const [finalPlanets,setFinalPlanets] = useState([])
  const [vehicles,setVehicles] = useState([])     
  const [planets,setPlanets] = useState([])
  const [clonePlanets,setClonePlanets] = useState([])
  const [lastTime,setLastTime] = useState(0)
    
  return(
        <AppContext.Provider value={{totalTimeTaken,setTotalTimeTaken,isSuccess,setIsSuccess,finalVehicles,setFinalVehicles,finalPlanets,setFinalPlanets,vehicles,setVehicles,planets,setPlanets,clonePlanets,setClonePlanets,lastTime,setLastTime}}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppState;

export {AppContext}