import moment from 'moment';

export const date_format = (date?: Date) => 
{
    if (date && date !== undefined) return moment(date).format('D MMMM YYYY, hh:mm a');
    //else return 'Incorrect date';
}
