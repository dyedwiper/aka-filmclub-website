export const customSelectStyles = {
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? 'var(--aka-gelb)' : 'white',
        color: 'black',
    }),
    container: (provided) => ({
        ...provided,
        display: 'inline-block',
        width: '150px',
        marginLeft: '20px',
    }),
};
