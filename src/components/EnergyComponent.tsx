import { CircularProgress } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import { useEffect, useState, memo } from 'react';
import { EnergyData } from '../interfaces/Energy';

function EnergyComponent() {
    const [data, setData] = useState<EnergyData | null>(null);

    async function fetchData() {
        try {
            const x = await fetch("http://localhost:8080/api/energy");
            return await x.text();
        } catch (err) {
            return null
        }
    }

    useEffect(() => {
        if (data == null)
            fetchData().then(result => result ? setData(JSON.parse(result) as EnergyData) : null);
    });

    return (
        <>
            {data ?
                <LineChart
                    xAxis={[
                        {
                            id: 'barCategories',
                            data: data?.energy.values.map(x => x.date.slice(0, 10)),
                            scaleType: 'band',
                        },
                    ]}
                    series={[
                        {
                            data: data?.energy.values.map(x => x.value / 1000),
                            label: 'kWh',
                            area: true,
                            showMark: false
                        },
                    ]}
                    height={500}
                />
                : <CircularProgress />}
        </>
    );
}

export default memo(EnergyComponent);
