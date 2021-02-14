import React from 'react';
import styled from 'styled-components';
import { HorizontalLineStyled } from '../styledElements';

export default function ImageFormGroup({ image }) {
    return (
        <ImageFormGroupStyled>
            <LabelStyled>
                Bild (png oder jpg; bis 1 MB)
                <InputStyled name="image" type="file" />
            </LabelStyled>
            <LabelStyled>
                Alternativtext (Beschreibung des Bilds für Sehbehinderte)
                <InputStyled name="altText" defaultValue={image.alt_text} />
            </LabelStyled>
            <LabelStyled>
                Copyright
                <InputStyled name="copyright" defaultValue={image.copyright} />
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
