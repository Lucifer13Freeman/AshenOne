import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import {useRouter } from "next/router";
import { useState } from "react";
import CreateTrackInfo from "../../components/CreateTrackInfo";
import FileUpload from "../../components/Files/FileUpload";
import StepWrapper from "../../components/StepWrapper";
import { useInput } from "../../hooks/useInput";
import MainLayout from "../../layouts/MainLayout";

const Create = () =>
{
    const [active_step, set_active_step] = useState(1);
    const [picture, set_picture]: any = useState(null);
    const [audio, set_audio]: any = useState(null);
    const name = useInput('');
    const artist = useInput('');
    const text = useInput('');

    const router = useRouter();
    

    const next = () =>
    {
        if (active_step !== 3) set_active_step(prev => prev + 1);
        else
        {
            const form_data = new FormData();

            form_data.append('name', name.value);
            form_data.append('artist', artist.value);
            form_data.append('text', text.value);
            form_data.append('picture', picture);
            form_data.append('audio', audio);

            axios.post('http://localhost:5000/tracks', form_data)
                .then(res => router.push('/tracks'))
                .catch(e => console.log(e));
        }
    }

    const back = () =>
    {
        set_active_step(prev => prev - 1)
    }

    return (
        <MainLayout>
            <StepWrapper active_step={active_step}>
                {active_step === 1 &&
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
                }
                {active_step === 2 &&
                    <FileUpload
                        set_file={set_picture}
                        accept="image/*"
                    >
                        <Button>Upload picture</Button>
                    </FileUpload>                
                }
                {active_step === 3 &&
                    <FileUpload
                    set_file={set_audio}
                    accept="audio/*"
                >
                    <Button>Upload audio</Button>
                </FileUpload> 
                }
            </StepWrapper>
            <Grid container justify='space-between'>
                <Button disabled={active_step === 1} onClick={back}>Back</Button>
                <Button onClick={next}>Next</Button>
            </Grid>
        </MainLayout>
    );
}

export default Create;