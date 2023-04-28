import React, {FC} from "react";

type PropsType = {
    message: string
}

const DialogMessage: FC<PropsType> = (props) => {
    return (
        <div>{props.message}</div>
    );
}

export default DialogMessage;