import React from 'react';
import { default as ReactSelect } from 'react-select';
import {
    AUTH_LEVEL_ADMIN,
    AUTH_LEVEL_ADMIN_NAME,
    AUTH_LEVEL_EDITOR,
    AUTH_LEVEL_EDITOR_NAME,
    AUTH_LEVEL_NORMAL,
    AUTH_LEVEL_NORMAL_NAME,
} from '../../constants';
import { userStatusSelectStyles } from '../../styles/customSelectStyles';

export default function UserLevelSelect({ disabled, defaultLevel }) {
    const levelOptions = [
        { label: AUTH_LEVEL_NORMAL_NAME, value: AUTH_LEVEL_NORMAL },
        { label: AUTH_LEVEL_EDITOR_NAME, value: AUTH_LEVEL_EDITOR },
        { label: AUTH_LEVEL_ADMIN_NAME, value: AUTH_LEVEL_ADMIN },
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
