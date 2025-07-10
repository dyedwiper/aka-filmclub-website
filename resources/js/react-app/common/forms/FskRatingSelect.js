import React from 'react';
import { default as ReactSelect } from 'react-select';
import {
    FSK_RATING_NONE,
    FSK_RATING_NONE_NAME,
    FSK_RATING_0,
    FSK_RATING_0_NAME,
    FSK_RATING_6,
    FSK_RATING_6_NAME,
    FSK_RATING_12,
    FSK_RATING_12_NAME,
    FSK_RATING_16,
    FSK_RATING_16_NAME,
    FSK_RATING_18,
    FSK_RATING_18_NAME,
    FSK_RATING_NOT_RATED,
    FSK_RATING_NOT_RATED_NAME,
} from '../../constants';
import { fskRatingSelectStyles } from '../../styles/customSelectStyles';

export default function fskRatingSelect({ defaultRating }) {
    const ratingOptions = [
        { label: FSK_RATING_NONE_NAME, value: FSK_RATING_NONE },
        { label: FSK_RATING_0_NAME, value: FSK_RATING_0 },
        { label: FSK_RATING_6_NAME, value: FSK_RATING_6 },
        { label: FSK_RATING_12_NAME, value: FSK_RATING_12 },
        { label: FSK_RATING_16_NAME, value: FSK_RATING_16 },
        { label: FSK_RATING_18_NAME, value: FSK_RATING_18 },
        { label: FSK_RATING_NOT_RATED_NAME, value: FSK_RATING_NOT_RATED },
    ];

    return (
        <ReactSelect
            name="fsk"
            isDisabled={false}
            options={ratingOptions}
            defaultValue={ratingOptions.find(option => option.value === defaultRating)}
            styles={fskRatingSelectStyles}
        />
    );
}
