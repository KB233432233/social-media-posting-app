import axios from 'axios';




const Auth = (user, updateValues) => {
    localStorage.setItem('user', JSON.stringify(user));
    let { id } = JSON.parse(localStorage.getItem('user'));
    // updateValues(id)
    axios.defaults.headers.common['Authorization'] = user.token;
}


const isGuest = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    if (!user) return true;
    return false;
}

const getToken = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    return user !== null ? user.token : '';
}



export { Auth, isGuest, getToken };