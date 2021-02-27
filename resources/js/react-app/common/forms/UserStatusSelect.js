import React from 'react';
import { default as ReactSelect } from 'react-select';
import { userStatusSelectStyles } from '../../styles/customSelectStyles';

export default function UserStatusSelect({ defaultStatus }) {
    const statusOptions = [
        { label: 'aktiv', value: 0 },
        { label: 'pausiert/unklar', value: 1 },
        { label: 'Alumni', value: 2 },
    ];

    return (
        <ReactSelect
            name="status"
            options={statusOptions}
            defaultValue={statusOptions[defaultStatus]}
            styles={userStatusSelectStyles}
        />
    );
}
