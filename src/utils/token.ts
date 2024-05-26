export const setTokenWithExpiry = (key: string, token: string, expiry: number) => {
    const now = new Date();
    const item = {
        token: token,
        expiry: now.getTime() + expiry,
    };
    localStorage.setItem(key, JSON.stringify(item));
};

export const getTokenWithExpiry = (key: string) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
        return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }
    return item.token;
};
