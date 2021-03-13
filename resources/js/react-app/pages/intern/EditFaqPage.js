import React, { useContext, useEffect, useState } from 'react';
import { PageStyled } from '../../common/styledElements';
import Context from '../../Context';

export default function EditFaqPage() {
    const [faqs, setFaqs] = useState([]);

    const { setPageTitle } = useContext(Context);

    useEffect(() => {
        getFaqByUuid().then((res) => {
            setText(res.data);
        });
    }, []);

    useEffect(() => {
        document.title = 'FAQs | aka-Filmclub';
        setPageTitle('FAQs');
    }, []);

    return <PageStyled>

    </PageStyled>;
}
