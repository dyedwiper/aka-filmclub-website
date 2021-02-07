import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SemesterSelect from '../common/SemesterSelect';
import SerialRow from '../common/SerialRow';
import { PageStyled } from '../common/styledElements';
import { GetSerialsBySemester } from '../utils/serialServices';

export default function SerialsPage() {
    const [serials, setSerials] = useState([]);
    const [semester, setSemester] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.title = 'Archiv | aka-Filmclub ';
    }, []);

    useEffect(() => {
        console.log('isLoading', isLoading);
        if (semester.year) {
            GetSerialsBySemester(semester).then((res) => {
                console.log('res.data', res.data);
                setSerials(res.data);
                setIsLoading(false);
            });
        }
    }, [semester]);

    return (
        <PageStyled>
            <HeadlineStyled>Filmreihen</HeadlineStyled>
            <SemesterSelect setSemester={setSemester} setIsLoading={setIsLoading} />
            {isLoading ? (
                <div>Loading</div>
            ) : (
                <SerialRowListStyled>
                    {serials.map((serial) => (
                        <SerialRow key={serial.id} serial={serial} />
                    ))}
                </SerialRowListStyled>
            )}
        </PageStyled>
    );
}

const HeadlineStyled = styled.h2``;

const SerialRowListStyled = styled.ul``;
