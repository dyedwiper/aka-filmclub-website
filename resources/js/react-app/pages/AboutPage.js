import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { PageHeadlineStyled, PageStyled } from '../common/styledElements';
import Context from '../Context';

export default function AboutPage() {
    const { setPageTitle } = useContext(Context);

    useEffect(() => {
        document.title = 'Über uns | aka-Filmclub';
        setPageTitle('Über uns');
    }, []);

    return (
        <PageStyled>
            <PageHeadlineStyled>Wir über uns</PageHeadlineStyled>
            <AboutParagraphStyled>
                Der „Akademische Filmclub an der Universität Freiburg e.V.“ – oder kurz aka-Filmclub – wurde im Jahre
                1957 gegründet und ist damit einer der ältesten studentischen Filmclubs in Deutschland. Wir sind ein als
                gemeinnützig anerkannter Verein, der den Studierenden und Mitarbeiter*innen der Uni Freiburg und allen
                Filminteressierten in Freiburg ein abwechslungsreiches und anspruchsvolles Filmprogramm zu
                erschwinglichen Preisen an der Uni bieten möchte. Vieles hat sich seit der Gründung geändert, doch eines
                hat die Jahre überdauert: Der cineastische Anspruch.
            </AboutParagraphStyled>
            <AboutParagraphStyled>
                Etwa 40 Studierende aller Fakultäten engagieren sich hier ehrenamtlich als aktive Mitglieder, indem sie
                jedes Semester ein umfang- und abwechslungsreiches Programm aus Einzelfilmen und Themenreihen auswählen.
                Im Mittelpunkt stehen dabei die Begeisterung für und die thematische Auseinandersetzung mit dem Medium
                Film in all seinen künstlerischen und technischen Facetten.
            </AboutParagraphStyled>
        </PageStyled>
    );
}

const AboutParagraphStyled = styled.p``;
