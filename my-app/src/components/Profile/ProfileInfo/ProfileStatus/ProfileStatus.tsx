import React, {ChangeEvent} from "react";
import classes from "./ProfileStatus.module.css";

type PropsType = {
    status: string,
    updateStatusProfile: (newStatus: string) => void
}

type StateType = {
    status: string,
    editMode: boolean
}

class ProfileStatus extends React.Component<PropsType, StateType> {
    constructor(props: PropsType | Readonly<PropsType>) {
        super(props);

        this.state = {
            editMode: false,
            status: this.props.status
        }
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatusProfile(this.state.status);
    }

    onChangeTextStatus = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        });
    }

    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            });
        }
    }

    render() {
        return (
            <>
                <div className={classes["profile-status"]}>
                    { !this.state.editMode
                        ? <div><span onDoubleClick={this.activateEditMode}>{this.props.status || "No status"}</span></div>
                        : <div><input autoFocus={true}
                                      onBlur={this.deactivateEditMode}
                                      onChange={this.onChangeTextStatus}
                                      value={this.state.status}/>
                        </div>
                    }
                </div>
            </>
        );
    }
}

export default ProfileStatus;