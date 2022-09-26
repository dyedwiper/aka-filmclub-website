import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTE_INTERN_EDIT_IMAGE } from '../../constants';

export default function ImageLink({ entity, addRoute }) {
    return (
        <>
            {entity.image ? (
                <Link to={ROUTE_INTERN_EDIT_IMAGE + entity.image.uuid}>Bild bearbeiten</Link>
            ) : (
                <Link to={addRoute + entity.uuid}>Bild hinzufügen</Link>
            )}
        </>
    );
}
