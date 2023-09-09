import React, { useState } from 'react';
import styled from 'styled-components';
import hintIcon from '../../assets/hint_icon.png';

export default function WysiwygEditorHints() {
    const [showHints, setShowHints] = useState(false);

    return (
        <>
            <HintButtonStyled type="button" className={showHints && 'active'} onClick={() => setShowHints(!showHints)}>
                <HintIconStyled src={hintIcon} />
            </HintButtonStyled>
            {showHints && (
                <HintsStyled>
                    <HintStyled>
                        Für große <strong>Absätze</strong> <em>Enter</em> drücken, für kleine Absätze{' '}
                        <em>Shift+Enter</em>.
                    </HintStyled>
                    <HintStyled>
                        Beim <strong>Entfernen von Linien und Bildern </strong>
                        sind sie manchmal im Editor schon verschwunden, aber tauchen nach dem Speichern wieder auf. Dann
                        muss die Rück- bzw. Entfernen-Taste im Editor einmal mehr gedrückt werden, damit das Objekt
                        korrekt entfernt wird.
                    </HintStyled>
                    <HintStyled>
                        Bei der <strong>Größe der Bilder </strong>bitte nur die Breite setzen und die Höhe auf{' '}
                        <em>auto </em>
                        lassen, weil es sonst zu Verzerrungen kommen kann. Die Größe kann nicht nachträglich geändert
                        werden. Dazu muss das Bild neu eingefügt werden.
                    </HintStyled>
                    <HintStyled>
                        Damit ein <strong>Bild in voller Breite</strong> angezeigt wird, die Breite beim Hochladen
                        einfach auf <em>auto</em> lassen. Dafür sollte das hochgeladenene Bild mindestens 824px breit
                        sein.
                    </HintStyled>
                    <HintStyled>
                        Wenn der Mauszeiger über einem eingefügten Bild ist, erscheint unter dem Bild eine{' '}
                        <strong>Option, um das Bild zu positionieren</strong>.
                    </HintStyled>
                    <HintStyled>
                        Wenn <strong>Bilder eingefügt</strong> sind, kann es nötig sein, einmal außerhalb des Editors zu
                        klicken, bevor der <strong>Speichern-Button</strong> funktioniert.
                    </HintStyled>
                </HintsStyled>
            )}
        </>
    );
}
const HintButtonStyled = styled.button`
    width: 48px;
    height: 48px;
    margin: 10px 0 20px 0;
    border: none;
    box-shadow: none;
    padding: 0;
    transition: 1s;

    &.active {
        transform: rotate(180deg);
    }
`;

const HintIconStyled = styled.img`
    width: 48px;
    height: 48px;
`;

const HintsStyled = styled.div`
    margin-bottom: 20px;
`;

const HintStyled = styled.li`
    margin-bottom: 5px;
`;
