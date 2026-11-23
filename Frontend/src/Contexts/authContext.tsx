interface userData {
    userName: string,
    name: string,
    email: string,
    bio: string,
    role: string,
    city: string,
    password: string,
}

const authContext = () => {
    async function getUserData() {
        const response = await fetch("url");
        if (response) {
            const data: userData = await response.json();
            console.log("data after contexts:- ", data);
        }
    }
    getUserData();
}

export default authContext
