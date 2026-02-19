import { AUTH_LEVEL_ADMIN, AUTH_LEVEL_EDITOR } from '../constants';

export function isAdmin(user) {
    return user.level >= AUTH_LEVEL_ADMIN;
}

export function isEditor(user) {
    return user.level >= AUTH_LEVEL_EDITOR;
}
