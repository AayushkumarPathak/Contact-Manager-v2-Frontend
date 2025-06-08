export const doLogin = (data: string, nextFn: () => void) => {
    localStorage.setItem("loginToken", JSON.stringify(data));
    nextFn();
}

export const isLoggedIn = () : Boolean  => {
    let data = localStorage.getItem("loginToken");
    if(data == null){
        return false;
    }
    return true;
}

export const getToken = () : (string | null) => {
    if(isLoggedIn()){
        const tokenStr = localStorage.getItem("loginToken");
        if (tokenStr) {
            return JSON.parse(tokenStr).token;
        }
    }
    return null;
}

export const getCurrUserDetails = () => {
    if(isLoggedIn()){
        const tokenStr = localStorage.getItem("loginToken");
        if (tokenStr) {
            const data = JSON.parse(tokenStr).userDto;
            return data;
        }
    }
    return null;
}

