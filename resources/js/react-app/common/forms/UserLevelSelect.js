import React from 'react';
import { default as ReactSelect } from 'react-select';
import { userStatusSelectStyles } from '../../styles/customSelectStyles';

export default function UserLevelSelect({ disabled, defaultLevel }) {
    const levelOptions = [
        { label: 'normales Mitglied', value: 0 },
        { label: 'Editor*in', value: 1 },
        { label: 'Administrator*in', value: 2 },
    ];

    return (
        <ReactSelect
            name="level"
            isDisabled={disabled}
            options={levelOptions}
            defaultValue={levelOptions[defaultLevel]}
            styles={userStatusSelectStyles}
        />
    );
}
