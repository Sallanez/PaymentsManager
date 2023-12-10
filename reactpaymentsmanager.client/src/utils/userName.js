export const getInitialsFromEmail = (email) => {
    const localPart = email.split('@')[0];
    const initials = localPart.substring(0, 2).toUpperCase();
    return initials;
}