import { AnalyticsHeader } from "./Components/AnalyticsHeader"
import { OverView } from "./Components/Overview"
import { useState } from "react"

export function AnalyticsPage(){
   const [overViewTime,setOverViewTime] = useState(false);
 return (
    <>
    <AnalyticsHeader overViewTime={overViewTime} setOverViewTime={setOverViewTime} />
    <OverView overViewTime={overViewTime} />
    </>
 )
}