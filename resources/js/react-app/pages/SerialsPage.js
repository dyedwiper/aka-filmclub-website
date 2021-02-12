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
        if (semester.year) {
            GetSerialsBySemester(semester).then((res) => {
                setSerials(res.data);
                setIsLoading(false);
            });
        }
    }, [semester]);

    return (
        <PageStyled>
            <HeadlineStyled>Filmreihen</HeadlineStyled>
            <SemesterSelect setSemester={setSemester} />
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
