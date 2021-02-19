export function getLastParameterFromPath() {
    const path = window.location.pathname;
    return path.slice(path.lastIndexOf('/') + 1);
}

export function getSecondToLastParameterFromPath() {
    const path = window.location.pathname;
    return path.slice(path.lastIndexOf('/', path.lastIndexOf('/') - 1) + 1, path.lastIndexOf('/'));
}
