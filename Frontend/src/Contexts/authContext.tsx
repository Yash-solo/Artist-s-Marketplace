// interface userData {
//     userName: string,
//     name: string,
//     email: string,
//     bio: string,
//     role: string,
//     city: string,
//     password: string,



// }
interface propsType {
    email: string,
    password: string,
}
interface SignInResponse {
    success: boolean,
    role?: "buyer" | "artist",
    message?: string,
}

export const AuthContext = async (props: propsType): Promise<SignInResponse> => {
    async function SignIn() {
        try {
            //fetch data after calling
            const response = await fetch("http://localhost:3000/signin", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ "Email": props.email, "Password": props.password })
            });
            const data = await response.json();
            //get user complete data and plan to distribute it . 
            console.log("data after contexts:- ", data);

            //check if get response 
            if (!response.ok) {
                return { success: false, message: data.message || "sign in failed" }
            }
            return data

        } catch (error: unknown) {
            if (error instanceof Error) {
                return { success: false, message: error.message };
            }
            return { success: false, message: "Not able to connect with server" }
        }
    }
    return SignIn();

}



