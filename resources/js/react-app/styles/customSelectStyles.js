export const semesterSelectStyles = {
    option: customOptionStyles,
    container: (provided) => ({
        ...provided,
        display: 'inline-block',
        width: '150px',
        marginLeft: '20px',
    }),
};

export const serialSemesterSelectStyles = {
    option: customOptionStyles,
    container: (provided) => ({
        ...provided,
        display: 'block',
        width: '250px',
    }),
};

export const serialSelectStyles = {
    option: customOptionStyles,
    container: (provided) => ({
        ...provided,
        display: 'block',
        width: '100%',
    }),
};

export const userStatusSelectStyles = {
    option: customOptionStyles,
    container: (provided) => ({
        ...provided,
        display: 'inline-block',
        width: '300px',
        '@media (max-width: 901px)': {
            width: '100%',
        },
    }),
};

const customOptionStyles = (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? 'var(--aka-gelb)' : 'white',
    color: 'black',
});
