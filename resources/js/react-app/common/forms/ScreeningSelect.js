import React, { useContext, useEffect, useState } from 'react';
import { default as ReactSelect } from 'react-select';
import styled from 'styled-components';
import Context from '../../Context';
import { screeningFormSelectStyles } from '../../styles/customSelectStyles';
import { formatToDateString } from '../../utils/dateFormatters';
import { getScreenings, getScreeningsBySemester } from '../../utils/services/screeningServices';

export default function ScreeningSelect({ parentScreening, defaultScreening, isEditing }) {
    const isNotSupportingFilmOption = { label: '-- ist kein Vorfilm --', value: '' };

    const [screeningOptions, setScreeningOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { currentSemester } = useContext(Context);

    useEffect(() => {
        getScreeningsBySemester(currentSemester.name).then((res) => {
            setScreeningOptions(computeScreeningOptions(res.data));
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <LoadingNoteStyled>Am Laden...</LoadingNoteStyled>;

    return (
        <ScreeningSelectStyled>
            <ReactSelect
                name="supportingFilmOf"
                options={screeningOptions}
                defaultValue={
                    defaultScreening
                        ? { label: defaultScreening.title, value: defaultScreening.id }
                        : isEditing && isNotSupportingFilmOption
                }
                styles={screeningFormSelectStyles}
                placeholder="Hauptfilm wählen..."
            />
            <ButtonStyled type="button " onClick={loadAllScreenings}>
                Alle Vorführungen laden
            </ButtonStyled>
        </ScreeningSelectStyled>
    );

    function loadAllScreenings() {
        setIsLoading(true);
        getScreenings().then((res) => {
            setScreeningOptions(computeScreeningOptions(res.data));
            setIsLoading(false);
        });
    }

    function computeScreeningOptions(screenings) {
        const options = [isNotSupportingFilmOption];
        screenings
            .filter((screening) => parentScreening && screening.uuid !== parentScreening.uuid)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .forEach((screening) => {
                options.push({
                    label: formatToDateString(screening.date) + ' ' + screening.title,
                    value: screening.id,
                });
            });
        return options;
    }
}

const ScreeningSelectStyled = styled.div`
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
