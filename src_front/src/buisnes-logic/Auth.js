//сохранение токена в session storage
function saveToken(token) {
    sessionStorage.setItem('tokenData', JSON.stringify(token));
}


// получение токена jwt
function getTokenData(login, password) {
    return fetch('api/auth', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            login,
            password,
        }),
    })
        .then((res) => {
            if (res.status === 200) {
                const tokenData = res.json();
                saveToken(JSON.stringify(tokenData)); 
                return Promise.resolve()
            }
            return Promise.reject();
        });
}


// обновление токена, когда он закончится
function refreshToken(token) {
    return fetch('api/auth/refreshToken', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token,
        }),
    })
        .then((res) => {
            if (res.status === 200) {
                const tokenData = res.json();
                saveToken(JSON.stringify(tokenData)); // сохраняем полученный обновленный токен в sessionStorage, с помощью функции, заданной ранее
                return Promise.resolve();
            }
            return Promise.reject();
        });
}


//функция обёртка url
export async function fetchWithAuth(url, options) {

    const loginUrl = '/auth';
    let tokenData = null;

    if (sessionStorage.authToken) { 
        tokenData = JSON.parse(localStorage.tokenData);
    } else {
       return window.location.replace(loginUrl); 
    }

    if (!options.headers) {
        options.headers = {};
    }
    
    if (tokenData) {
        if (Date.now() >= tokenData.expires_on * 1000) {
            try {
                const newToken = await refreshToken(tokenData.refresh_token);
                saveToken(newToken);
            } catch {
               return  window.location.replace(loginUrl);
            }
        }
        options.headers.Authorization = `Bearer ${tokenData.token}`;
    }

    return fetch(url, options); 
}