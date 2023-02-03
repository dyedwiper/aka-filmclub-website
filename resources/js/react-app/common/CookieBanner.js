import React from 'react';
import CookieConsent from 'react-cookie-consent';

export default function CookieBanner() {
    return (
        <CookieConsent buttonText="Okay" style={style} buttonStyle={buttonStyle}>
            Unsere Website verwendet funktionale Cookies.
        </CookieConsent>
    );
}

const style = {
    'background-color': 'black',
};

const buttonStyle = {
    'background-color': 'var(--aka-gelb)',
};
