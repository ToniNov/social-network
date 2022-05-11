import React, {ChangeEvent} from 'react';

type ProfileStatusType = {
    status: string
    updateStatus:(status:any)=> void

}

class ProfileStatus extends React.Component<ProfileStatusType> {

    state = {
        editMode: false,
        status: this.props.status
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
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
        this.setState( {status: e.currentTarget.value})
    }

   componentDidUpdate(prevProps: Readonly<ProfileStatusType>, prevState: Readonly<{}>, snapshot?: any) {
        if (prevProps.status !== this.props.status)
        this.setState({
            status: this.props.status
        })
   }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMod} >{this.props.status || 'Set status'}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input
                            onChange={this.onStatusChange}
                            value={this.state.status}
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