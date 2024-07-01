import './App.css';
import EnergyComponent from './components/EnergyComponent';
import { Card, CardContent, Container, Grid, Typography } from '@mui/material';
import SiteDetailsComponent from './components/SiteDetailsComponent';
import { memo } from 'react';
import Details from './components/Details';

function App() {
  return (
    <div className="App-header">
    <Container>
      <Grid rowSpacing={2} columnSpacing={2} spacing={2}>
        <Grid item margin={2} xs={6}>
          <Card  variant="outlined">
          <CardContent>
            <Typography variant="h5" component="div">
              Energy generated this month
            </Typography>
            <EnergyComponent />
          </CardContent>
          </Card>
        </Grid>
        <Grid item margin={2} xs={4}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" component="div">
              Site details
            </Typography>
            <SiteDetailsComponent />
          </CardContent>
          </Card>
        </Grid>
        <Grid item margin={2}>
          <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" component="div">
              Details
            </Typography>
            <Details />
          </CardContent>
          </Card>
        </Grid>
      </Grid>
      </Container>
    </div>
  );
}

export default memo(App);
