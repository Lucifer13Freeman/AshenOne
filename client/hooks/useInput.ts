import React, { useState } from "react";


export const useInput = (initial_value: string) =>
{
    const [value, set_value] = useState(initial_value);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        set_value(e.target.value);
    }

    return { value, /*set_value,*/ onChange }
}