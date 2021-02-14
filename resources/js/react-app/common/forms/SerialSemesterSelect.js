import React, { useEffect, useState } from 'react';
import { default as ReactSelect } from 'react-select';
import { serialSemesterSelectStyles } from '../../styles/customSelectStyles';
import { computeSemesterOptions } from '../../utils/semesterUtils';

export default function SerialSemesterSelect() {
    const [semesterOptions, setSemesterOptions] = useState([]);

    useEffect(() => {
        setSemesterOptions(computeSemesterOptions());
    }, []);

    return (
        <ReactSelect
            name="semester"
            options={semesterOptions}
            defaultValue={semesterOptions[0]}
            styles={serialSemesterSelectStyles}
        />
    );
}
