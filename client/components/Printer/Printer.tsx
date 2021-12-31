import { Button, Card, Grid } from "@mui/material";
import { FormEvent } from "react";
import styles from '../../styles/App.module.scss';


const Printer: React.FC = ({ children }) =>
{
    const open_printer_window = (e: FormEvent) =>  
    {
        e.preventDefault();
        const printer_form = document.getElementById('print_area')?.innerHTML;
        const printer_window: Window | null = window.open('','','left=50,top=50,width=860,height=640,toolbar=0,scrollbars=1,status=0');
    
        if (printer_window && printer_form)
        {
            printer_window.document.write(printer_form);
            printer_window.document.close();
            printer_window.focus();
            printer_window.print();
            printer_window.close();
        }
    }

    return (
        <Card className={styles.card} style={{ margin: '10px 0px' }}>
            <Grid 
                container 
                //direction="column" 
                style={{ padding: 20, margin: '20px 36px' }}
            >
                <form onSubmit={open_printer_window}>
                    <div id = 'print_area'>
                        {children}
                    </div>
                    <Button variant="contained" type='submit'>Print report</Button>
                </form>
            </Grid>
        </Card>
    );
}

export default Printer;