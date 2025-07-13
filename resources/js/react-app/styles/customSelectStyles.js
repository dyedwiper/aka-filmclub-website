export const semesterSelectStyles = {
    container: (provided) => ({
        ...provided,
        display: 'inline-block',
        width: '150px',
    }),
    control: customControlStyles,
    dropdownIndicator: customDropdownIndicatorStyles,
    indicatorSeparator: customIndicatorSeparatorStyles,
    singleValue: customSingleValueStyles,
    menu: customMenuStyles,
    option: customOptionStyles,
};

export const serialSemesterSelectStyles = {
    container: (provided) => ({
        ...provided,
        display: 'block',
        width: '250px',
    }),
    control: customControlStyles,
    dropdownIndicator: customDropdownIndicatorStyles,
    indicatorSeparator: customIndicatorSeparatorStyles,
    singleValue: customSingleValueStyles,
    menu: customMenuStyles,
    option: customOptionStyles,
};

export const screeningFormSelectStyles = {
    container: (provided) => ({
        ...provided,
        display: 'block',
        width: '100%',
    }),
    control: customControlStyles,
    dropdownIndicator: customDropdownIndicatorStyles,
    indicatorSeparator: customIndicatorSeparatorStyles,
    singleValue: customSingleValueStyles,
    menu: customMenuStyles,
    option: customOptionStyles,
};

export const userStatusSelectStyles = {
    container: (provided) => ({
        ...provided,
        display: 'inline-block',
        width: '300px',
        '@media (max-width: 767px)': {
            width: '100%',
        },
    }),
    control: customControlStyles,
    dropdownIndicator: customDropdownIndicatorStyles,
    indicatorSeparator: customIndicatorSeparatorStyles,
    singleValue: customSingleValueStyles,
    menu: customMenuStyles,
    option: customOptionStyles,
};


export const fskRatingSelectStyles = {
    container: (provided) => ({
        ...provided,
        display: 'inline-block',
        width: '260px',
        '@media (max-width: 767px)': {
            width: '100%',
        },
    }),
    control: customControlStyles,
    dropdownIndicator: customDropdownIndicatorStyles,
    indicatorSeparator: customIndicatorSeparatorStyles,
    singleValue: customSingleValueStyles,
    menu: customMenuStyles,
    option: customOptionStyles,
};

export const positionSelectStyles = {
    container: (provided) => ({
        ...provided,
        display: 'inline-block',
        width: '100px',
        '@media (max-width: 767px)': {
            width: '100%',
        },
    }),
    control: customControlStyles,
    dropdownIndicator: customDropdownIndicatorStyles,
    indicatorSeparator: customIndicatorSeparatorStyles,
    singleValue: customSingleValueStyles,
    menu: customMenuStyles,
    option: customOptionStyles,
};

export const distributorSelectStyles = {
    container: (provided) => ({
        ...provided,
        display: 'block',
        width: '100%',
    }),
    control: customControlStyles,
    dropdownIndicator: customDropdownIndicatorStyles,
    indicatorSeparator: customIndicatorSeparatorStyles,
    singleValue: customSingleValueStyles,
    menu: customMenuStyles,
    option: customOptionStyles,
};

export const licenseSelectStyles = {
    container: (provided) => ({
        ...provided,
        display: 'block',
        width: '100%',
    }),
    control: customControlStyles,
    dropdownIndicator: customDropdownIndicatorStyles,
    indicatorSeparator: customIndicatorSeparatorStyles,
    singleValue: customSingleValueStyles,
    menu: customMenuStyles,
    option: customOptionStyles,
};

function customControlStyles(provided, state) {
    return {
        ...provided,
        borderColor: state.isDisabled ? 'var(--aka-hellgrau)' : 'black',
        borderRadius: '0',
        cursor: 'pointer',
        '&:hover': {
            borderColor: 'var(--aka-grau)',
        },
    };
}

function customDropdownIndicatorStyles(provided, state) {
    return {
        ...provided,
        color: state.isDisabled ? 'var(--aka-grau)' : 'black',
        '&:hover': {
            color: 'var(--aka-grau)',
        },
    };
}

function customIndicatorSeparatorStyles(provided) {
    return {
        ...provided,
        backgroundColor: 'var(--aka-gelb)',
    };
}

function customSingleValueStyles(provided, state) {
    return {
        ...provided,
        color: state.isDisabled ? 'var(--aka-grau)' : 'black',
    };
}

function customMenuStyles(provided) {
    return {
        ...provided,
        borderRadius: '=',
    };
}

function customOptionStyles(provided, state) {
    return {
        ...provided,
        backgroundColor: state.isSelected ? 'var(--aka-gelb)' : 'white',
        color: 'black',
    };
}
