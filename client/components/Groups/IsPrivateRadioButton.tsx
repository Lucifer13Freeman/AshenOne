// import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

// enum ACCESS
// {
//     PRIVATE = "PRIVATE",
//     PUBLIC = "PUBLIC"
// }

// interface IsPrivateRadioButtonProps
// {
//     access: string;
//     set_access: Function;
//     handle_access_radio_change: Function;
// }

// const IsPrivateRadioButton: React.FC = ({ access, set_access, handle_access_radio_change }) =>
// {
//     return (
//         <RadioGroup
//             style={{padding: '4px 20px'}}
//             aria-label="quiz"
//             name="access"
//             value={access}
//             onChange={handle_access_radio_change}
//         >
//             <FormControlLabel style={{marginBottom: 10}}
//                 value={ACCESS.PRIVATE} 
//                 control={<Radio />} 
//                 label="Private" />
//             <FormControlLabel 
//                 value={ACCESS.PUBLIC} 
//                 control={<Radio />} 
//                 label="Public" />
//         </RadioGroup>
//     );
// }

// export default IsPrivateRadioButton;