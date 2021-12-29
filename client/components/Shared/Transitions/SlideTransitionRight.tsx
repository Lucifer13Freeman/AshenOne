import { Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

const SlideTransitionRight = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any>; },
  ref: React.Ref<unknown>,
) { return <Slide direction="right" ref={ref} {...props} />; });

export default SlideTransitionRight;