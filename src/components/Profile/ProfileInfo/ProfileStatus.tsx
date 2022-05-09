import React from 'react';

type ProfileStatusType = {
    status: string
}

class ProfileStatus extends React.Component<ProfileStatusType> {

    state = {
        editMode: false
    }

    activateEditMod = () => {
        this.setState({
            editMode:true
        })

    }
    deactivateEditMod = () => {
        this.setState({
            editMode:false
        })

    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMod} >{this.props.status}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input
                            value={this.props.status}
                            onBlur={this.deactivateEditMod}
                            autoFocus={true}
                        />
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;