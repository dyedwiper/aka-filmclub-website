// taken from https://stackoverflow.com/a/55142565/11854580

export function joinPath(...parts) {
    const separator = '/';

    parts = parts.map((part, index) => {
        if (index) {
            part = part.replace(new RegExp('^' + separator), '');
        }

        if (index !== parts.length - 1) {
            part = part.replace(new RegExp(separator + '$'), '');
        }

        return part;
    });

    return parts.join(separator);
}
