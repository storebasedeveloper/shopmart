import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik"
import { resetPasswordValidation } from "../../src/helper/validate";
import { Toaster } from "react-hot-toast";

const RESET = () => {
  const formik = useFormik({
    initialValues : {
      password : "",
      confirm_pwd: ""
    },
    validate: resetPasswordValidation,
    validateOnBlur : false,
    validateOnChange : false,
   onSubmit : async (values) =>{
    }
  })
  return (
    <div className="w-full h-screen flex items-center justify-center">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="w-full lgl:w-1/2 h-full">
    
        
          <form className="w-full lgl:w-[450px] h-screen flex items-center justify-center" onSubmit={formik.handleSubmit}>
            <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
                Reset Password
              </h1>
              <div className="flex flex-col gap-3">
                {/* Email */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Password
                  </p>
                  <input
                 {...formik.getFieldProps("password")}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder="New Password"
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                  Confirm Password
                  </p>
                  <input
                       {...formik.getFieldProps("confirm_pwd")}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder="Repeat Password"
                  />
                </div>

                <button 
                type="submit"
                  className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md  duration-300"
                >
                  Sign In
                </button>
                <p className="text-sm text-center font-titleFont font-medium">
                  Don't have an Account?{" "}
                  <Link to="/signup">
                    <span className="hover:text-blue-600 duration-300">
                      Sign up
                    </span>
                  </Link>
                </p>
                <p className="text-sm text-center font-titleFont font-medium">
                Forgot Password?
                  <Link to="/recovery">
                    <span className="hover:text-blue-600 duration-300">
                  Recover Now
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

export default RESET;
