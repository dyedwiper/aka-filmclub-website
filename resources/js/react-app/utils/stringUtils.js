export function replaceUmlautsAndSpecialCharacters(someString) {
    return someString
        .replace(/\u00e4/g, 'ae')
        .replace(/\u00f6/g, 'oe')
        .replace(/\u00fc/g, 'ue')
        .replace(/\u00df/g, 'ss')
        .replace(/[^a-z^A-Z^0-9]+/g, '_');
}

export function stripHtml(html) {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
}

export function removeDots(someString) {
    const result = someString.replace(/\./g, '');
    return result;
}
