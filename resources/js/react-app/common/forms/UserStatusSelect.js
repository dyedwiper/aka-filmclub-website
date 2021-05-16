import React from 'react';
import { default as ReactSelect } from 'react-select';
import {
    USER_STATUS_ACTIVE,
    USER_STATUS_ACTIVE_NAME,
    USER_STATUS_ALUMNI,
    USER_STATUS_ALUMNI_NAME,
    USER_STATUS_PAUSED,
    USER_STATUS_PAUSED_NAME,
} from '../../constants';
import { userStatusSelectStyles } from '../../styles/customSelectStyles';

export default function UserStatusSelect({ disabled, defaultStatus }) {
    const statusOptions = [
        { label: USER_STATUS_ACTIVE_NAME, value: USER_STATUS_ACTIVE },
        { label: USER_STATUS_PAUSED_NAME, value: USER_STATUS_PAUSED },
        { label: USER_STATUS_ALUMNI_NAME, value: USER_STATUS_ALUMNI },
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
