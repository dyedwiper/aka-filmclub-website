import React from 'react';
import { default as ReactSelect } from 'react-select';
import { userStatusSelectStyles } from '../../styles/customSelectStyles';

export default function UserStatusSelect({ disabled, defaultStatus }) {
    const statusOptions = [
        { label: 'aktiv', value: 0 },
        { label: 'pausiert/unklar', value: 1 },
        { label: 'Alumni', value: 2 },
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
