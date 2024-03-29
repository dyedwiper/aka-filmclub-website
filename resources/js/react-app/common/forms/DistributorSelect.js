import React, { useEffect, useState } from 'react';
import { getDistributors } from '../../services/distributorServices';
import { default as ReactSelect } from 'react-select';
import { distributorSelectStyles } from '../../styles/customSelectStyles';
import styled from 'styled-components';

export default function DistributorSelect({ defaultDistributor, isEditing }) {
    const noDistributorOption = { label: '-- kein Verleih --', value: '' };

    const [distributorOptions, setDistributorOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getDistributors().then((res) => {
            setDistributorOptions(computeDistributorOptions(res.data));
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <LoadingNoteStyled>Am Laden...</LoadingNoteStyled>;

    return (
        <ReactSelect
            name="distributor_id"
            options={distributorOptions}
            defaultValue={
                defaultDistributor
                    ? { label: defaultDistributor.name, value: defaultDistributor.id }
                    : isEditing && noDistributorOption
            }
            styles={distributorSelectStyles}
            placeholder="Verleih wählen..."
        />
    );

    function computeDistributorOptions(distributors) {
        const options = [noDistributorOption];
        distributors.forEach((distributor) => {
            options.push({
                label: distributor.name,
                value: distributor.id,
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
