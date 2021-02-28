import React from 'react';
import { default as ReactSelect } from 'react-select';
import { USER_STATUS_ACTIVE, USER_STATUS_ALUMNI, USER_STATUS_PAUSED } from '../../constants';
import { userStatusSelectStyles } from '../../styles/customSelectStyles';

export default function UserStatusSelect({ disabled, defaultStatus }) {
    const statusOptions = [
        { label: 'aktiv', value: USER_STATUS_ACTIVE },
        { label: 'pausiert/unklar', value: USER_STATUS_PAUSED },
        { label: 'Alumni', value: USER_STATUS_ALUMNI },
    ];

    return (
        <ReactSelect
            name="status"
            isDisabled={disabled}
            options={statusOptions}
            defaultValue={statusOptions[defaultStatus]}
            styles={userStatusSelectStyles}
        />
    );
}
