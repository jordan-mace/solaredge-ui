import { Box } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState, memo } from 'react';

export interface Root {
    powerDetails: PowerDetails
  }
  
  export interface PowerDetails {
    timeUnit: string
    unit: string
    meters: Meter[]
  }
  
  export interface Meter {
    type: string
    values: Value[]
  }
  
  export interface Value {
    date: string
    value?: number
  }
  

function Details() {
    const [bio, setBio] = useState<Root | null>(null);

    async function fetchBio() {
        try{
        const x = await fetch("http://localhost:8080/api/details");
        return await x.text();
        }catch(err){
            return null
        }
    }

    useEffect(() => {
        if (bio == null)
            fetchBio().then(result => result ? setBio(JSON.parse(result) as Root) : null);
    });

    return (
        <>
            {bio ?
            <BarChart
                xAxis={[
                    {
                        id: 'barCategories',
                        data: bio?.powerDetails.meters.map(x => x.type),
                        scaleType: 'band',
                    },
                ]}
                series={[
                    {
                        data: bio?.powerDetails.meters.map(x => x.values[0].value ? x.values[0].value / 1000 : null),
                        label: 'kWh'
                    },
                ]}
                height={500}
            />
            : null}
        </>
    );
}

export default memo(Details);
