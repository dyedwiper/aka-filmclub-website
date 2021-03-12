import { ContentState, convertFromHTML, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React, { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import HorizontalLineToolbarButton from '../../common/forms/HorizontalLineToolbarButton';
import { PageStyled } from '../../common/styledElements';
import { editorStyleObject, toolbarStyleObject, wrapperStyleObject } from '../../styles/wysisygEditorStyles';
import { getLastParameterFromPath } from '../../utils/pathUtils';
import { getText, postText } from '../../utils/textServices';
import LoadingPage from '../LoadingPage';

export default function EditTextPage() {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [assocPage, setAssocPage] = useState('');
    const [defaultText, setDefaultText] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    let history = useHistory();

    useEffect(() => {
        const page = getLastParameterFromPath();
        getText(page).then((res) => {
            setDefaultText(res.data);
            setAssocPage(page);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(defaultText))));
    }, [defaultText]);

    if (isLoading) return <LoadingPage />;

    return (
        <PageStyled>
            <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                wrapperStyle={wrapperStyleObject}
                toolbarStyle={toolbarStyleObject}
                editorStyle={editorStyleObject}
                toolbar={{
                    options: ['inline', 'blockType', 'link'],
                    blockType: {
                        options: ['Normal', 'H3', 'H4', 'H5', 'H6'],
                    },
                    link: {
                        showOpenOptionOnHover: false,
                        defaultTargetOption: '_blank',
                    },
                }}
                toolbarCustomButtons={[<HorizontalLineToolbarButton />]}
            />
            <ButtonContainerStyled>
                <SaveButtonStyled onClick={saveText}>Speichern</SaveButtonStyled>
                <BackButtonStyled onClick={() => history.goBack()}>Zurück</BackButtonStyled>
            </ButtonContainerStyled>
        </PageStyled>
    );

    function saveText() {
        const textObject = { text: draftToHtml(convertToRaw(editorState.getCurrentContent())) };
        postText(assocPage, textObject).then(() => {
            history.goBack();
        });
    }
}

const ButtonContainerStyled = styled.div`
    display: grid;
    grid-template-columns: 100px 100px;
    grid-gap: 10px;
    margin-top: 20px;
`;

const SaveButtonStyled = styled.button``;

const BackButtonStyled = styled.button`
    background-color: var(--aka-grau);
`;
