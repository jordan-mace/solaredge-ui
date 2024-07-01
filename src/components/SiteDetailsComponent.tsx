import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { SiteData } from '../interfaces/Site';
  

export default function SiteDetailsComponent() {
    const [bio, setBio] = useState<SiteData | null>(null);

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
        const interval = setInterval(() => {
            if(bio !== null) return;
            fetchBio().then(result => result ? setBio(JSON.parse(result) as SiteData) : null)

        }, 5000)
        return () => clearInterval(interval)
    });

    return (
        <>
            {bio ? 
            <>
                <h4>Current</h4>
                <p>Power: {(bio.overview.currentPower.power / 1000).toPrecision(2)}kWh</p>
                <h4>Lifetime</h4>
                <p>Power: {(bio.overview.lifeTimeData.energy / 1000)}kWh</p>
                <p>Revenue: ${bio.overview.lifeTimeData.revenue}</p>
            </> : <CircularProgress />}
        </>
    );
}