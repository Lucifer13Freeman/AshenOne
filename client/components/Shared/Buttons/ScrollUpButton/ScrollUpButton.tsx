import { Avatar } from "@mui/material";
import React from "react";
import ScrollToTop from "react-scroll-up";
import { LINKS } from "../../../../utils/constants";

//import './ScrollUpButton.scss';
import ArrowUp from "./arrow-up.png";

const ScrollUpButton = () => (

    <ScrollToTop 
        showUnder={160} 
        duration={700}
        style={{
                position: 'fixed',
                bottom: 50,
                right: 30,
                cursor: 'pointer',
                transitionDuration: '0.2s',
                transitionTimingFunction: 'linear',
                transitionDelay: '0s'
        }}>
        <img src={`${LINKS.STATIC_FILES_LINK}image/arrow-up.png`} 
            style={{ width: 60, height: 60 }}
        />
        {/* <img 
            src={LINKS.BASE + 'public/arrow-up.png'}
            style={{ width: 60, height: 60 }}
        /> */}
    </ScrollToTop>
);

export default ScrollUpButton;