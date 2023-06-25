export async function fetchData(url, method, data) {
    const token = localStorage.getItem("token");
    let options = {
        method: method,
        cache: "no-cache",
        mode: 'cors',
        withCredentials: true,
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            "Access-Control-Allow-Credentials": true,
            "Authorization": "Bearer " + token
        }
    }

    if (method != "GET") {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    const result = await response.json();
    return result;
}
async function GetLogin() {
    const token = localStorage.getItem("token");
    let options = {
        method: "GET",
        cache: "no-cache",
        mode: 'cors',
        withCredentials: true,
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            "Access-Control-Allow-Credentials": true,
            "Authorization": "Bearer " + token
        }
    }
    const response = await fetch("https://localhost:5001/CheckLogin", options);
    return response;
}

export async function CheckLogin() {
    const response = await GetLogin();
    if (response.status != 401) {
        const result = await response.json();
        if (result.success) {
            window.open('/home', "_top");
        }
    }
}

export async function Logado() {
    const response = await GetLogin();
    if (response.status == 401) {
        localStorage.removeItem("token");
        window.open('/', "_top");
    }
    else {
        const result = await response.json();
        if (!result.success) {
            localStorage.removeItem("token");
            window.open('/', "_top");
        }
    }
}