import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik"
import convertToBase64 from "../../helper/convert";
import "../../styles/register.css"
import avatar from "../../assets/images/profile.png"
import { registerValidation } from "../../helper/validate";
import { Toaster } from "react-hot-toast";
import axios from "axios"




const SignUp = () => {
  const history = useNavigate()
  const [file, setFile] = useState()
  const sendRequest = async(values) => {
    const response = axios.post("http://localhost:5000/api/user/register", {
      firstname : values.firstname,
      lastname : values.lastname,
      mobile : values.phoneNumber,
      email : values.email,
      password : values.password,
      zipcode : values.zipcode,
      address : values.address,
      profile : file
    }).catch((error) => {
      console.log(error)
    })
 return response
  } 
  const formik = useFormik({
    initialValues : {
      email : "",
   firstname : "",
   lastname : "",
      password : "",
      phoneNumber : "",
      zipcode : "",
      address : ""
    },
    validate :  registerValidation,
    validateOnBlur : false,
    validateOnChange : false,
   onSubmit : async (values) =>{
    values = await Object.assign(values, {profile : file || ""})
    sendRequest(values).then(()=>{
      history("/signin")
    })
    }
  })
  const onUpload = async(e)=>{
    console.log(e.target.values)
const base64 = await convertToBase64(e.target.files[0])
setFile(base64)
console.log(base64)
  }
  const [checked, setChecked] = useState(false);
  return (
    <div className="w-full h-screen flex items-center justify-start">
            <Toaster position="top-center" reverseOrder={false}></Toaster>
          <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
          <span className="shopmart-logo">SHOPMART</span>
          </Link>

          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Get started fast with ShopMart
              </span>
              <br />
              Fast and Easy Shopping Experience
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Access all SHOPMART services
              </span>
              <br />
              Enjoy access to a diverse array of SHOPMART services tailored to enhance your online shopping experience. From personalized recommendations to secure payment options, we've got you covered.
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Trusted by online Shoppers
              </span>
              <br />
       Our commitment to quality and customer satisfaction sets us apart in the world of e-commerce.
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <Link to="/">
              <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                © SHOPMART
              </p>
            </Link>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Terms
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Privacy
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Security
            </p>
          </div>
        </div>
      </div>
      <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
     
          <form className="w-full lgl:w-[500px] h-screen flex items-center justify-center" onSubmit={formik.handleSubmit}>
            <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
         <div className="register-avatar">
        <label htmlFor="profile">
        <img src={file ||  avatar} alt="profile" className="profile-img"></img>

        </label>
        <input onChange={onUpload} type="file" id="profile" name="profile" alt="profile" className="profile-input"></input>
         </div>
                Create your account
              </h1>
              <div className="flex flex-col gap-3">
   
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    First Name
                  </p>
                  <input
                            {...formik.getFieldProps("firstname")}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Your Name"
                  />
     
         
        
                </div>

                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                Last Name
                  </p>
                  <input
                            {...formik.getFieldProps("lastname")}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Your Name"
                  />
     
         
        
                </div>
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                 Email
                  </p>
                  <input
                            {...formik.getFieldProps("email")}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="email"
                    placeholder="youremail@email.com"
                  />
      
                </div>
                {/* Phone Number */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Phone Number
                  </p>
                  <input
                            {...formik.getFieldProps("phoneNumber")}
               
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="number"
                    inputMode="numeric"
                    placeholder="+234XXXXXXXXXX"
                  />
         
                </div>
             
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Password
                  </p>
                  <input
                            {...formik.getFieldProps("password")}
           
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder="Create password"
                  />
        
                </div>
                {/* Address */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Address
                  </p>
                  <input
                            {...formik.getFieldProps("address")}
                
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="road-001, house-115, example area"
                  />
         
                </div>
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Country
                  </p>
                  <input
                            {...formik.getFieldProps("country")}
               
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Nigeria"
                  />
            
                </div>
          
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Zip/Postal code
                  </p>
                  <input
                            {...formik.getFieldProps("zipcode")}
            
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="number"
                    placeholder="Your country"
                  />
          
                </div>
                {/* Checkbox */}
                <div className="flex items-start mdl:items-center gap-2">
                  <input
                    onChange={() => setChecked(!checked)}
                    className="w-4 h-4 mt-1 mdl:mt-0 cursor-pointer"
                    type="checkbox"
                  />
                  <p className="text-sm text-primeColor">
                    I agree to the SHOPMART{" "}
                    <span className="text-blue-500">Terms of Service </span>and{" "}
                    <span className="text-blue-500">Privacy Policy</span>.
                  </p>
                </div>
                <button
        
                  className={`${
                    checked
                      ? "bg-primeColor hover:bg-black hover:text-white cursor-pointer"
                      : "bg-gray-500 hover:bg-gray-500 hover:text-gray-200 cursor-none"
                  } w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300`}
                  type="submit"
                >
                  Create Account
                </button>
                <p className="text-sm text-center font-titleFont font-medium">
                  Don't have an Account?{" "}
                  <Link to="/signin">
                    <span className="hover:text-blue-600 duration-300">
                      Sign in
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        
      </div>
    </div>
  );
};

export default SignUp;
