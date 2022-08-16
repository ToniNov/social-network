import React, {ChangeEvent, useEffect, useState} from 'react';

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatusWithHooks = (props: ProfileStatusType) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(()=>{
        setStatus(props.status)
    },[props.status])

     const activateEditMod = () => {
         setEditMode(true)
     }

     const deactivateEditMod = () => {
         setEditMode(false)
         props.updateStatus(status)
     }
     const onStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
         setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
                <div>
                    <b>Status</b>:
                    <span onDoubleClick={activateEditMod}>{props.status || 'Set status'}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input
                        onChange={onStatusChange}
                        value={status}
                        onBlur={deactivateEditMod}
                        autoFocus={true}
                    />
                </div>
            }
        </div>
    )
}


export default ProfileStatusWithHooks;