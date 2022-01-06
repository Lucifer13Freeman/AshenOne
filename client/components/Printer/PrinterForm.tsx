import { IStatisticsReport } from "../../types/report";
import { date_format } from "../../utils/date-format";


interface PrinterFormProps
{
    statistics_report?: IStatisticsReport;
}

const PrinterForm: React.FC<PrinterFormProps> = ({ statistics_report }) =>
{
    return (
        <div>
            <h1>Statistics report</h1>
                <h4>Social network: AshenOne</h4>
                <h4>Developer and founder: Lipinskas Dmitry Yurievich</h4>
                <p>Statistics details:</p>
            <table>
                 <tr>
                    <td>Element</td>
                    <td>Count</td>
                </tr>
                <tr>
                    <td>Total users</td>
                    <td style={{textAlign: 'right'}}>{statistics_report?.total_users}</td>
                </tr>
                <tr>
                    <td>Total banned users</td>
                    <td style={{textAlign: 'right'}}>{statistics_report?.total_banned_users}</td>
                </tr>
                <tr>
                    <td>Total messages</td>
                    <td style={{textAlign: 'right'}}>{statistics_report?.total_messages}</td>
                </tr>
                <tr>
                    <td>Total reactions</td>
                    <td style={{textAlign: 'right'}}>{statistics_report?.total_reactions}</td>
                </tr>
                <tr>
                    <td>Total posts</td>
                    <td style={{textAlign: 'right'}}>{statistics_report?.total_posts}</td>
                </tr>
                <tr>
                    <td>Total post likes</td>
                    <td style={{textAlign: 'right'}}>{statistics_report?.total_post_likes}</td>
                </tr>
                <tr>
                    <td>Total comments</td>
                    <td style={{textAlign: 'right'}}>{statistics_report?.total_comments}</td>
                </tr>
                <tr>
                    <td>Total comment likes</td>
                    <td style={{textAlign: 'right'}}>{statistics_report?.total_comment_likes}</td>
                </tr>
                <tr>
                    <td>Total subscriptions</td>
                    <td style={{textAlign: 'right'}}>{statistics_report?.total_subscriptions}</td>
                </tr>
                <tr>
                    <td>Total groups</td>
                    <td style={{textAlign: 'right'}}>{statistics_report?.total_groups}</td>
                </tr>
                <tr>
                    <td>Total invites</td>
                    <td style={{textAlign: 'right'}}>{statistics_report?.total_invites}</td>
                </tr>
            </table>
            <h5>Дата: {date_format(statistics_report?.created_at)}</h5>
        </div>
    );
}

export default PrinterForm;