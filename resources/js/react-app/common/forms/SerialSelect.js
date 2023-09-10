import React, { useEffect, useState } from 'react';
import { default as ReactSelect } from 'react-select';
import styled from 'styled-components';
import { screeningFormSelectStyles } from '../../styles/customSelectStyles';
import { getCurrentAndFutureSerials, getSerials } from '../../services/serialServices';

export default function SerialSelect({ defaultSerial, isEditing }) {
    const noSerialOption = { label: '-- keine Reihe --', value: '' };

    const [serialOptions, setSerialOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCurrentAndFutureSerials().then((res) => {
            setSerialOptions(computeSerialOptions(res.data));
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <LoadingNoteStyled>Am Laden...</LoadingNoteStyled>;

    return (
        <SerialSelectStyled>
            <ReactSelect
                name="serialId"
                options={serialOptions}
                defaultValue={
                    defaultSerial
                        ? { label: defaultSerial.title, value: defaultSerial.id }
                        : isEditing && noSerialOption
                }
                styles={screeningFormSelectStyles}
                placeholder="Reihe wählen..."
            />
            <ButtonStyled type="button " onClick={loadAllSerials}>
                Alle Reihen laden
            </ButtonStyled>
        </SerialSelectStyled>
    );

    function loadAllSerials() {
        setIsLoading(true);
        getSerials().then((res) => {
            setSerialOptions(computeSerialOptions(res.data));
            setIsLoading(false);
        });
    }

    function computeSerialOptions(serials) {
        const options = [noSerialOption];
        serials.forEach((serial) => {
            options.push({
                label: serial.title,
                value: serial.id,
            });
        });
        return options;
    }
}

const SerialSelectStyled = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-gap: 20px;
    height: 40px;
`;

const ButtonStyled = styled.button`
    height: 40px;

    @media (max-width: 767px) {
        font-size: 0.6em;
    }
`;

const LoadingNoteStyled = styled.div`
    display: grid;
    align-items: center;
    height: 40px;
`;
