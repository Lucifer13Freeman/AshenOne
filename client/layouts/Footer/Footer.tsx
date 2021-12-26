import styles from '../../styles/Footer.module.scss';


const Footer: React.FC = () => 
{
    return (
        <footer className={styles.footer}>
            <div>
                <p>AshenOne&reg;</p>
                <p>Developed by Lipinskas D.Y.</p>
                <p>Copyright&copy; {new Date().getFullYear()} All rights reserved.</p>
            </div>
        </footer>
    );
}


export default Footer;