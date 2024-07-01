import { CircularProgress } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { DetailsData } from '../interfaces/Details';
import { useEffect, useState, memo } from 'react';

function Details() {
    const [data, setData] = useState<DetailsData | null>(null);

    async function fetchData() {
        try {
            const x = await fetch("http://localhost:8080/api/details");
            return await x.text();
        } catch (err) {
            return null
        }
    }

    useEffect(() => {
        if (data == null)
            fetchData().then(result => result ? setData(JSON.parse(result) as DetailsData) : null);
    });

    return (
        <>
            {data ?
                <BarChart
                    xAxis={[
                        {
                            id: 'barCategories',
                            data: data?.powerDetails.meters.map(x => x.type),
                            scaleType: 'band',
                        },
                    ]}
                    series={[
                        {
                            data: data?.powerDetails.meters.map(x => x.values[0].value ? x.values[0].value / 1000 : null),
                            label: 'kWh'
                        },
                    ]}
                    height={500}
                />
                : <CircularProgress />}
        </>
    );
}

export default memo(Details);
