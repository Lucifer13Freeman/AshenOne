// import { Box, Button, Card, Grid, TextField } from "@material-ui/core";
// import { useRouter } from "next/router";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import TrackList from "../../components/TrackList";
// import { useTypedSelector } from "../../hooks/useTypedSelector";
// import MainLayout from "../../layouts/MainLayout";
// import { NextThunkDispatch, wrapper } from "../../store";
// import { fetch_tracks, search_tracks } from "../../store/actions/track";
// import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';


// const Index = () =>
// {
//     const router = useRouter();
//     const { tracks, error } = useTypedSelector(state => state.track);
//     const [query, set_query] = useState<string>('');
//     const dispatch = useDispatch() as NextThunkDispatch;
//     const [timer, set_timer]: any = useState(null);


//     const search = async (e: React.ChangeEvent<HTMLInputElement>) =>
//     {
//         set_query(e.target.value);

//         if (timer) clearTimeout(timer);

//         set_timer(
//             setTimeout(
//                 async () => 
//                 {
//                     await dispatch(search_tracks(e.target.value));
//                 }, 500)
//         );
//     }

//     if (error) return <MainLayout>
//                         <h1>{error}</h1>
//                     </MainLayout>

//     return (
//         <MainLayout title={'AshenOne Music - Track List'}>
//             <Grid container justify='center'>
//                 <Card style={{width: 900}}>
//                     <Box p={3}>
//                         <Grid container justify='space-between'>
//                             <h1
//                                 style={{padding: 10}}
//                             >
//                                 Track list
//                             </h1>
//                             <Button
//                                 onClick={ () => router.push('tracks/create') }
//                                 color='primary'
//                             >
//                                 Upload
//                             </Button>
//                         </Grid>
//                     </Box>
//                     <Grid container justify='space-between'>
//                         <SearchOutlinedIcon style={{marginLeft: 10}}/>
//                         <TextField
//                             value={query}
//                             onChange={search}
//                             style={{paddingLeft: 10, marginRight: 'auto'}}
//                         />
//                     </Grid>
//                     {tracks 
//                         ? <TrackList tracks={tracks}/>
//                         : <div>Tracks not found!</div>
//                     }
//                 </Card>
//             </Grid>
//         </MainLayout>
//     );
// }

// export default Index;


// export const getServerSideProps = wrapper.getServerSideProps(
//     store => async () =>
//     {
//         const dispatch = store.dispatch as NextThunkDispatch;
//         await dispatch(fetch_tracks());

//         return { props: {} }
//     }
// );