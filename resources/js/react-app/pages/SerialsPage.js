import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import SemesterSelect from '../common/SemesterSelect';
import SerialRow from '../common/SerialRow';
import { PageHeadlineStyled, PageStyled } from '../common/styledElements';
import Context from '../Context';
import { getSerialsBySemester } from '../utils/serialServices';

export default function SerialsPage() {
    const [serials, setSerials] = useState([]);
    const [semester, setSemester] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const { setPageTitle } = useContext(Context);

    useEffect(() => {
        document.title = 'Filmreihen | aka-Filmclub';
        setPageTitle('Filmreihen');
    }, []);

    useEffect(() => {
        if (semester) {
            getSerialsBySemester(semester).then((res) => {
                setSerials(res.data);
                setIsLoading(false);
            });
        }
    }, [semester]);

    return (
        <PageStyled>
            <PageHeadlineStyled>Filmreihen</PageHeadlineStyled>
            <SemesterSelect setSemester={setSemester} setIsLoading={setIsLoading} />
            {isLoading ? (
                <div>Loading</div>
            ) : (
                <ListStyled>
                    {serials.map((serial) => (
                        <SerialRow key={serial.id} serial={serial} />
                    ))}
                </ListStyled>
            )}
        </PageStyled>
    );
}

const ListStyled = styled.ul``;
