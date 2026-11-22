import back from "/src/assets/back.png";
import { useNavigate } from "react-router-dom";

//design the role type
interface getrole {
    role: string,
}

const DetailsPage = (props: getrole) => {

    const navigation = useNavigate();
    //handle input 
    function handleInput(e: React.FormEvent<HTMLInputElement>) {
        e.currentTarget.setCustomValidity("");
    }
    //handle invalid input in inputes
    function handleInvalid(e: React.FormEvent<HTMLInputElement>) {
        e.currentTarget.setCustomValidity('This field is required Please fill out the details.');
    }
    //handle submition
    function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
    }
    return (
        <>
            <div className="w-full relative h-full flex md:px-25 flex-col items-center p-3 py-10 justify-start gap-10 ">
                <img title="go back" onClick={() => { navigation("/") }} className="md:h-10 h-7 w-7 md:w-10 mr-auto cursor-pointer" src={back} alt="" />

                <h1 className="text-4xl font-serif md:text-7xl text-[#000000] lg:text-5xl">Apna Artist</h1>
                <form onSubmit={handleSubmit} className="w-full text-[rgb(33,33,33)] font-serif md:grid md:grid-cols-2  md:gap-5 flex flex-col items-center justify-center gap-4">
                    <label className="flex w-full px-2 flex-col gap-2" >
                        <span className="md:text-xl">UserName</span>
                        <input onInput={handleInput} onInvalid={handleInvalid} className="h-10 md:h-15 text-[#4d4d4d]  w-full border border-[#ddd] rounded-lg px-5 md:text-lg p-2 focus:outline-amber-500" type="text" placeholder="Enter userName" required />
                    </label>
                    <label className="flex w-full px-2 flex-col gap-2" >
                        <span className="md:text-xl">Email</span>
                        <input className="h-10 md:h-15 md:text-lg  text-[#4d4d4d] w-full border border-[#ddd] rounded-lg px-5 p-2 focus:outline-amber-500" type="text" placeholder="Enter email adress" required />
                    </label>
                    <label className="flex w-full px-2 flex-col gap-2" >
                        <span className="md:text-xl">Home Adress</span>
                        <input className="h-10 md:h-15 md:text-lg  text-[#4d4d4d] w-full border border-[#ddd] rounded-lg px-5 p-2 focus:outline-amber-500" type="text" placeholder="Enter Home address" required />
                    </label>
                    <label className="flex w-full px-2 flex-col gap-2" >
                        <span className="md:text-xl">Mobile No.</span>
                        <input className="h-10 md:h-15 md:text-lg  text-[#4d4d4d] w-full border border-[#ddd] rounded-lg px-5 p-2 focus:outline-amber-500" type="text" placeholder="Enter Mobile no." required />
                    </label>
                    <label className="flex w-full px-2 flex-col gap-2" >
                        <span className="md:text-xl">Create password</span>
                        <input className="h-10 md:h-15 md:text-lg  text-[#4d4d4d] w-full border border-[#ddd] rounded-lg px-5 p-2 focus:outline-amber-500" type="text" placeholder="Enter new password" required />
                    </label>
                    <label className="flex w-full px-2 flex-col gap-2" >
                        <span className="md:text-xl">Comform password</span>
                        <input className="h-10 md:h-15 md:text-lg  text-[#4d4d4d] w-full border border-[#ddd] rounded-lg px-5 p-2 focus:outline-amber-500" type="text" placeholder="Enter password again" required />
                    </label>
                    <label className="flex w-full px-2 flex-col gap-2" >
                        <span className="md:text-xl">What kind of art do you like?</span>
                        <input className="h-10 md:h-15 md:text-lg  text-[#4d4d4d] w-full border border-[#ddd] rounded-lg px-5 p-2 focus:outline-amber-500" type="text" placeholder="Ex:- Sketching,painting..." required />
                    </label>
                    <label className="flex w-full px-2 flex-col gap-2" >
                        <span className="md:text-xl">birthday date</span>
                        <input className="h-10 md:h-15 md:text-lg text-[#4d4d4d] w-full border border-[#ddd] rounded-lg px-5 p-2 focus:outline-amber-500" type="Date" required />
                    </label>
                    <label className="flex w-full px-2 flex-col gap-2" >
                        <span className="md:text-xl">State</span>
                        <select className="border md:h-15 md:text-lg p-2  border-[#ddd]" name="state" id="state">
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Dehli">Dehli</option>
                            <option value="GOA">GOA</option>
                            <option value="UP">Utter pradesh</option>
                            <option value="JMU">Jaamu</option>
                            <option value="Hariyana">Hariyana</option>
                            <option value="PJB">Panjab</option>
                            <option value="GJ">Gujrat</option>
                            <option value="MH">Maharastra</option>
                        </select>
                    </label>
                    <label className="flex bg-[#ddd] md:text-lg  md:h-15 p-2 rounded-sm text-gray-500 w-full px-2 items-center justify-between gap-2" >
                        <span className="md:text-xl">Role</span>
                        <button disabled>{props.role}</button>
                    </label>
                    <br />
                    <button type="submit" className="w-full md:text-lg cursor-pointer md:w-50 md:ml-[60%] text-black m-auto p-3 ml-auto border border-amber-400  text-2xl rounded-lg shadow-[0px_0px_5px_#ddd] bg-amber-300">Next</button>
                </form>
            </div >
        </>
    )
}

export default DetailsPage
