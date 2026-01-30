export const authFetch = async (url, options = {}) => {
    const user = JSON.parse(localStorage.getItem('app-user'));
    const token = user?.token;

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    return response;
};
