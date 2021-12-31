import { Card, Container, Grid, Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

interface StepWrapperProps
{
    active_step: number;
}

const steps: string[] = ['Track information', 'Track picture', 'Track audio'];

const StepWrapper: React.FC<StepWrapperProps> = ({ active_step, children }) =>
{
    return (
        <Container>
            <Stepper activeStep={active_step}>
                { steps.map((step, index) =>
                    <Step
                        key={index}
                        completed={active_step > index}
                    >
                        <StepLabel>{step}</StepLabel>
                    </Step>
                ) }
            </Stepper>
            <Grid 
                container justify="center" 
                style={{ margin: '70px 0', height: 270 }}
            >
                <Card style={{width:600}}>
                    {children}
                </Card>
            </Grid>
        </Container>
    );
}

export default StepWrapper;