import React, { useEffect, useState } from 'react';
import { getLicenses } from '../../services/licenseServices';
import { default as ReactSelect } from 'react-select';
import { licenseSelectStyles } from '../../styles/customSelectStyles';
import styled from 'styled-components';

export default function LicenseSelect({ defaultLicense }) {
    const [licenseOptions, setLicenseOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getLicenses().then((res) => {
            setLicenseOptions(computeLicenseOptions(res.data));
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <LoadingNoteStyled>Am Laden...</LoadingNoteStyled>;

    return (
        <ReactSelect
            name="license_id"
            options={licenseOptions}
            defaultValue={defaultLicense && { label: defaultLicense.name, value: defaultLicense.id }}
            styles={licenseSelectStyles}
            placeholder="Lizenz wählen..."
        />
    );

    function computeLicenseOptions(licenses) {
        const options = [{ label: '-- keine Lizenz --', value: '' }];
        licenses.forEach((license) => {
            options.push({
                label: license.name,
                value: license.id,
            });
        });
        return options;
    }
}

const LoadingNoteStyled = styled.div`
    display: grid;
    align-items: center;
    height: 40px;
`;
