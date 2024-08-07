import "./App.css";
import EnergyComponent from "./components/Energy";
import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import SiteDetailsComponent from "./components/SiteDetails";
import { memo } from "react";
import Details from "./components/Details";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Environment from "./components/Environment";

function App() {
  return (
    <div className="App">
      <div className="App-center">
        <Header />
      </div>
      <Container>
        <Grid rowSpacing={2} columns={2} columnSpacing={2}>
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
          <Grid item margin={2} xs={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5" component="div">
                  Environmental Impact
                </Typography>
                <Environment />
              </CardContent>
            </Card>
          </Grid>
          <Grid item margin={2} xs={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5" component="div">
                  Energy generated this month
                </Typography>
                <EnergyComponent />
              </CardContent>
            </Card>
          </Grid>
          <Grid item margin={2}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5" component="div">
                  Today
                </Typography>
                <Details />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <div className="App-center">
        <Footer />
      </div>
    </div>
  );
}

export default memo(App);
