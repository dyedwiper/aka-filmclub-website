import React, { useEffect, useState } from 'react';
import { default as ReactSelect } from 'react-select';
import { getSerials } from '../../utils/serialServices';
import { serialSelectStyles } from '../../styles/customSelectStyles';

export default function SerialSelect() {
    const [serialOptions, setSerialOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getSerials().then((res) => {
            const serials = res.data;
            const options = [];
            serials.forEach((serial) => {
                options.push({
                    label: serial.title,
                    value: serial.id,
                });
            });
            setSerialOptions(options);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <></>;

    return <ReactSelect options={serialOptions} styles={serialSelectStyles} />;
}
