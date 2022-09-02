import React, { useEffect, useState } from 'react';
import { default as ReactSelect } from 'react-select';
import { serialSemesterSelectStyles } from '../../styles/customSelectStyles';
import { computeSemesterOptions } from '../../utils/semesterUtils';

export default function SemesterSelectForSerialForm({ defaultSemester }) {
    const [semesterOptions, setSemesterOptions] = useState([]);
    const [defaultValue, setDefaultValue] = useState({});

    useEffect(() => {
        setSemesterOptions(computeSemesterOptions({ isIncludingNextSemester: true }));
    }, []);

    useEffect(() => {
        // Diese Bedingung muss so aussehen, weil der defaultValue von react-select sonst
        // nicht korrekt gesetzt wird. Warum, ist mir nicht ganz klar.
        if (!defaultValue && defaultSemester) {
            setDefaultValue({
                label: defaultSemester.slice(0, 2) + ' ' + defaultSemester.slice(2),
                value: defaultSemester,
            });
        } else {
            // Hier wird das zweite Array-Element genommen, weil dieses das aktuelle Semester ist.
            setDefaultValue(semesterOptions[1]);
        }
    }, [semesterOptions]);

    if (!defaultValue) return <></>;

    return (
        <ReactSelect
            name="semester"
            options={semesterOptions}
            defaultValue={defaultValue}
            styles={serialSemesterSelectStyles}
        />
    );
}
