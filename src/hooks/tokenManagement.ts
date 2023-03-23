export const getCookie = (key: string) => {
    let name = key + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};
export const deleteToken = (name: string, path: string, domain: string) => {
    if (getCookie(name)?.length > 0) {
        document.cookie =
            name +
            "=" +
            (path ? ";path=" + path : "") +
            (domain ? ";domain=" + domain : "") +
            ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
};
