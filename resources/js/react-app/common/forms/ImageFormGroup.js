import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTE_INTERN_LICENSES } from '../../constants';
import LicenseSelect from './LicenseSelect';

export default function ImageFormGroup({ image }) {
    return (
        <ImageFormGroupStyled>
            <LabelStyled>
                Bild (png oder jpg; bis 1 MB)
                <InputStyled name="image" type="file" />
            </LabelStyled>
            <LabelStyled>
                Alternativtext (Beschreibung des Bilds für Sehbehinderte)
                <InputStyled name="altText" defaultValue={image && image.alt_text} />
            </LabelStyled>
            <LabelStyled>
                Urheber*in
                <InputStyled name="originator" defaultValue={image && image.originator} />
            </LabelStyled>
            <LicenseContainerSytled>
                <SelectLabelStyled>
                    Lizenz
                    <LicenseSelect defaultLicense={image && image.license} />
                </SelectLabelStyled>
                <Link to={ROUTE_INTERN_LICENSES}>Lizenzen bearbeiten</Link>
            </LicenseContainerSytled>
            <LabelStyled>
                Link zum Bild (bei CC-lizensierten Bildern notwendig)
                <InputStyled name="link" defaultValue={image && image.link} />
            </LabelStyled>
            <LabelStyled>
                <CheckboxStyled
                    name="keepShowingAfterSemester"
                    type="checkbox"
                    value="1"
                    defaultChecked={image && image.keepShowingAfterSemester}
                />
                Bild nach Ablauf des Semesters weiterhin anzeigen
            </LabelStyled>
        </ImageFormGroupStyled>
    );
}

const ImageFormGroupStyled = styled.div``;

const LabelStyled = styled.label`
    margin: 20px 0;
    display: block;
`;

const InputStyled = styled.input``;

const CheckboxStyled = styled.input`
    margin: 0 10px;
`;

const LicenseContainerSytled = styled.div``;

const SelectLabelStyled = styled.label`
    display: inline-block;
    width: 75%;
    margin-right: 30px;

    @media (max-width: 767px) {
        width: 100%;
        display: block;
    }
`;
