import React, { useRef } from "react";

interface FileUploadProps
{
    set_file: Function;
    accept: string;
    set_base64?: Function;
}

const FileUpload: React.FC<FileUploadProps> = ({ set_file, accept, children, set_base64 }) =>
{
    const ref: React.MutableRefObject<HTMLInputElement | any> = useRef<HTMLInputElement>();

    const on_change = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        if (e.target.files) 
        {
            const file = e.target.files[0];
            set_file(file);

            if (set_base64)
            {
                const reader  = new FileReader();
                reader.onload = (e)  => set_base64(e.target?.result);
                reader.readAsDataURL(file);
            }
        }
    }

    return (
        <div onClick={ () => ref.current.click() }>
            <input 
                type="file"
                accept={accept}
                style={{ display: "none" }}
                ref={ref}
                onChange={on_change}
            />
            {children}
        </div>
    );
}

export default FileUpload;