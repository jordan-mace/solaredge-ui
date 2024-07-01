import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { SiteData } from '../interfaces/Site';
  

export default function SiteDetailsComponent() {
    const [data, setData] = useState<SiteData | null>(null);

    async function fetchData() {
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
            if(data !== null) return;
            fetchData().then(result => result ? setData(JSON.parse(result) as SiteData) : null)

        }, 5000)
        return () => clearInterval(interval)
    });

    return (
        <>
            {data ? 
            <>
                <h4>Current</h4>
                <p>Power: {(data.overview.currentPower.power / 1000).toPrecision(2)}kWh</p>
                <h4>Lifetime</h4>
                <p>Power: {(data.overview.lifeTimeData.energy / 1000)}kWh</p>
                <p>Revenue: ${data.overview.lifeTimeData.revenue}</p>
            </> : <CircularProgress />}
        </>
    );
}