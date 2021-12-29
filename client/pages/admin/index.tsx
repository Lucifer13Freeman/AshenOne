import { useRouter } from "next/router";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import {  Card, Grid, IconButton, Avatar, Typography, Button  } from "@mui/material";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useAction";
import Printer from "../../components/Printer/Printer";
import PrinterForm from "../../components/Printer/PrinterForm";
import { ROUTES, LINKS } from "../../utils/constants";
import MainLayout from "../../layouts/MainLayout";
import AdminProfile from "../../components/Admin/AdminProfile";
import { TOKEN } from "../../utils/token";
import { GET_STATISTICS_REPORT } from "../../graphql/queries.ts/admin";


const AdminPage: React.FC = () => 
{
    const router = useRouter();

    const { auth, error: auth_error } = useTypedSelector(state => state.auth);
    const { statistics_report, error: report_error } = useTypedSelector(state => state.report);
    const { async_set_user, async_set_statistics_report, async_logout } = useActions();
    
    const { loading: statistics_report_loading, 
            data: statistics_report_data } = useQuery(GET_STATISTICS_REPORT,   
    {
        onCompleted: data => async_set_statistics_report({ ...data.get_statistics_report }),
        onError: err => 
        {
            console.log(err);
            async_set_user(null);
                
            if (err.message === TOKEN.ERROR_MESSAGE) 
            {
                router.push(ROUTES.LOGIN);
                // router.reload();
                async_logout();
            }
        },
        nextFetchPolicy: "cache-first"
    });
    
    return (

        <MainLayout>
            <Grid container justifyContent='center'>
            { auth.user && <AdminProfile user={auth.user} /*user_id={user_id}*//>}
            {/* {auth.user
                ? <AdminProfile user={auth.user} />
                : <div>Admin not found!</div>
            } */}
            </Grid>
            <Printer>
                <PrinterForm statistics_report={statistics_report}/>
            </Printer>
        </MainLayout>
    );
}


export default AdminPage;