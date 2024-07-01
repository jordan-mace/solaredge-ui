import { Box, Button, FormControl, FormGroup, FormLabel, Input } from '@mui/material';
import { useEffect, useState } from 'react';

interface Root {
    overview: Overview
  }
  
interface Overview {
    lastUpdateTime: string
    lifeTimeData: LifeTimeData
    lastYearData: LastYearData
    lastMonthData: LastMonthData
    lastDayData: LastDayData
    currentPower: CurrentPower
    measuredBy: string
  }
  
interface LifeTimeData {
    energy: number
    revenue: number
  }
  
interface LastYearData {
    energy: number
  }
  
interface LastMonthData {
    energy: number
  }
  
interface LastDayData {
    energy: number
  }
  
interface CurrentPower {
    power: number
  }
  

export default function SiteDetailsComponent() {
    const [bio, setBio] = useState<Root | null>(null);

    async function fetchBio() {
        try{
            const x = await fetch("http://localhost:8080/api/site");
            if(x.status !== 200) return null
            return await x.text();
        }   catch(err)  {
            return null
        }
    }
    
    useEffect(() => {
        if(bio == null)
            fetchBio().then(result => result ? setBio(JSON.parse(result) as Root) : null)
    });

    return (
        <>
            {bio ? <><p>Current power: {(bio.overview.currentPower.power / 1000).toPrecision(2)}kWh</p></> : null}
        </>
    );
}