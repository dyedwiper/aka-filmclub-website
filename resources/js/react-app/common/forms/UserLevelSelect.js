import React from 'react';
import { default as ReactSelect } from 'react-select';
import { AUTH_LEVEL_ADMIN, AUTH_LEVEL_EDITOR, AUTH_LEVEL_NORMAL } from '../../constants';
import { userStatusSelectStyles } from '../../styles/customSelectStyles';

export default function UserLevelSelect({ disabled, defaultLevel }) {
    const levelOptions = [
        { label: 'normales Mitglied', value: AUTH_LEVEL_NORMAL },
        { label: 'Editor*in', value: AUTH_LEVEL_EDITOR },
        { label: 'Administrator*in', value: AUTH_LEVEL_ADMIN },
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
