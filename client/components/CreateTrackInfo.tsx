import { Grid, TextField } from "@mui/material";
import React from "react";
import { useInput } from "../hooks/useInput";


const CreateTrackInfo: React.FC = () =>
{
    const name = useInput('');
    const artist = useInput('');
    const text = useInput('');
    
    return (
        <Grid 
            container 
            direction="column" 
            style={{ padding: 20 }}
        >
            <TextField
                {...name}
                style={{ marginTop: 20 }}
                label={"Track name"}
            />
            <TextField
                {...artist}
                style={{ marginTop: 20 }}
                label={"Author name"}
            />
            <TextField
                {...text}
                style={{ marginTop: 20 }}
                label={"Track text"}
                multiline
                rows={3}
            />
        </Grid>
    );
}

export default CreateTrackInfo;