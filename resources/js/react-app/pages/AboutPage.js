import React, { useEffect } from 'react';
import styled from 'styled-components';
import { PageStyled } from '../common/styledElements';

export default function AboutPage() {
    useEffect(() => {
        document.title = 'Über uns | aka-Filmclub ';
    });

    return (
        <PageStyled>
            <HeadlineStyled>Wir über uns</HeadlineStyled>
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

const HeadlineStyled = styled.h2``;

const AboutParagraphStyled = styled.p``;
