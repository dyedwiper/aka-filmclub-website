import React from 'react';
import styled from 'styled-components';

export default function ImageFormGroup() {
    return (
        <ImageFormGroupStyled>
            <LabelStyled>
                Bild (png oder jpg; bis 1 MB)
                <InputStyled name="image" type="file" />
            </LabelStyled>
            <LabelStyled>
                Titel des Bilds
                <InputStyled name="imageTitle" />
            </LabelStyled>
            <LabelStyled>
                Alternativtext zum Bild
                <InputStyled name="altText" />
            </LabelStyled>
            <LabelStyled>
                Copyright
                <InputStyled name="copyright" />
            </LabelStyled>
        </ImageFormGroupStyled>
    );
}

const LabelStyled = styled.label`
    margin: 20px 0;
    display: block;
`;

const InputStyled = styled.input``;

const ImageFormGroupStyled = styled.div``;
