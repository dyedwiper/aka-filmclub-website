import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Context from '../../Context';
import hintIcon from '../../assets/hint_icon.png';
import BasePage from '../../common/BasePage';
import WysiwygEditor from '../../common/forms/WysiwygEditor';
import { PageHeadlineStyled } from '../../common/styledElements';
import {
    PAGE_TITLE_ABOUT,
    PAGE_TITLE_AWARDS,
    PAGE_TITLE_CONTACT,
    PAGE_TITLE_IMPRINT,
    PAGE_TITLE_LINKS,
    PAGE_TITLE_PRESS,
    PARAGRAPH_TITLE_SELFMADE,
    PARAGRAPH_TITLE_WELCOME,
} from '../../constants';
import { getText, postText } from '../../utils/services/textServices';
import LoadingPage from '../LoadingPage';

export default function EditTextPage() {
    const [assocPage, setAssocPage] = useState('');
    const [currentContent, setCurrentContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [validationErrors, setValidationErrors] = useState([]);
    const [showHints, setShowHints] = useState(false);

    const { pageTitle, user } = useContext(Context);

    const { page } = useParams();

    let history = useHistory();

    const pageTitleMap = {
        about: PAGE_TITLE_ABOUT,
        contact: PAGE_TITLE_CONTACT,
        imprint: PAGE_TITLE_IMPRINT,
        links: PAGE_TITLE_LINKS,
        press: PAGE_TITLE_PRESS,
        awards: PAGE_TITLE_AWARDS,
        home: PARAGRAPH_TITLE_WELCOME,
        selfmade: PARAGRAPH_TITLE_SELFMADE,
    };

    useEffect(() => {
        getText(page).then((res) => {
            setCurrentContent(res.data.content);
            setAssocPage(page);
            setIsLoading(false);
        });
    }, [page]);

    if (isLoading) return <LoadingPage />;

    return (
        <BasePage pageTitle={pageTitleMap[assocPage] + ' bearbeiten'}>
            <PageHeadlineStyled>{pageTitle}</PageHeadlineStyled>
            <HintButtonStyled className={showHints && 'active'} onClick={() => setShowHints(!showHints)}>
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
            <FormStyled>
                <WysiwygEditor
                    inputName="content"
                    defaultValue={currentContent}
                    setValidationErrors={setValidationErrors}
                    isBlockTypeEnabled={true}
                    isFontSizeEnabled={true}
                    isImageUploadEnabled={true}
                    isHorizontalRuleEnabled={true}
                />
                <ValidationErrorContainerStyled>
                    {validationErrors.map((error, index) => (
                        <ValidationErrorStyled key={index}>{error}</ValidationErrorStyled>
                    ))}
                </ValidationErrorContainerStyled>
                <ButtonContainerStyled>
                    <SaveButtonStyled type="submit" onClick={saveText}>
                        Speichern
                    </SaveButtonStyled>
                    <BackButtonStyled type="button" onClick={() => history.goBack()}>
                        Zurück
                    </BackButtonStyled>
                </ButtonContainerStyled>
            </FormStyled>
        </BasePage>
    );

    function saveText(event) {
        event.preventDefault();

        const content = event.target.form.content.value;
        const data = { content, updated_by: user.username };

        postText(assocPage, data)
            .then(() => {
                if (assocPage === 'home') {
                    history.push('/');
                } else {
                    history.push('/' + assocPage);
                }
            })
            .catch((err) => {
                if (err.response.status === 422) {
                    setValidationErrors(err.response.data.validationErrors);
                }
            });
    }
}

const HintButtonStyled = styled.button`
    width: 48px;
    height: 48px;
    margin-bottom: 20px;
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

const FormStyled = styled.form``;

const ValidationErrorContainerStyled = styled.div`
    color: var(--aka-red);
`;

const ValidationErrorStyled = styled.div`
    margin-bottom: 10px;
`;

const ButtonContainerStyled = styled.div`
    display: grid;
    grid-template-columns: 100px 100px;
    grid-gap: 10px;
    margin-top: 20px;
`;

const SaveButtonStyled = styled.button``;

const BackButtonStyled = styled.button`
    color: white;
    background-color: var(--aka-grau);
`;
