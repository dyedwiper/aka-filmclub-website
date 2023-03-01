export function getCookieValue(key) {
    const value = document.cookie
        .split('; ')
        .find((row) => row.startsWith(key + '='))
        ?.split('=')[1];

    return value;
}

export function setCookie(name, value, maxAge) {
    let cookie = name + '=' + value;
    if (maxAge) {
        cookie += ';max-age=' + maxAge;
    }

    document.cookie = cookie;
}
