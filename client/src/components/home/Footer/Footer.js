import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaFacebook, FaYoutube, FaLinkedin, FaGithub } from "react-icons/fa";
import FooterListTitle from "./FooterListTitle";
import flutterwave from "../../../../src/assets/images/svg/flutterwave.svg"
import paystack from "../../../../src/assets/images/svg/paystack.svg"
import visacard from "../../../../src/assets/images/svg/visacard.svg"
import mastercard from "../../../../src/assets/images/svg/mastercard.svg"
import amexcard from "../../../../src/assets/images/svg/amexcard.svg"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const showToastMessage = () => {
    toast.success("Subscription Successfull !", {
      className: "toast-message",
    });
  };
  const showCorrectEmail = () =>{
    toast.error("Invalid Email !", {
     
        className : "toast-message"
      });
  }
  const errorSubscription = () => {
    toast.warning("User Already Subscribed", {
      });
    }
    const internetError = () => {
      toast.warning("Network Errror", {
        });
        
    
      }
  const Subscribe = () => {
    axios.post("http://localhost:3500/newsletter",
     {email : email},
       {
    headers: {
      'X-Api-Key': process.env.REACT_APP_FRONTEND_BACKEND_PADDLOCK,
      'Content-Type': 'application/json',
    },
})
    .then((response)=>{
        if(response.status === 201){
          showToastMessage()
        }else{
          errorSubscription()
          console.log(response.status)
            console.log("error in subscribing user")
            
        }
      })
      .catch((error)=>{
        console.error("Error : " +error)
  internetError()
      })
}

  function InputChange(event){
    console.log("Gideon")
    setEmail(event.target.value)
      }
    function inputSubmit(event){
      console.log(event.target.value)
        event.preventDefault();
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const isEmailValid = emailRegex.test(email);
      if(!isEmailValid){
        showCorrectEmail()
      }
      if(isEmailValid){
        Subscribe()
      }
    }


  return (
    <div className="w-full bg-[#F5F5F3] py-20">
        <ToastContainer />
      <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2  xl:grid-cols-6 px-4 gap-10">
        <div className="col-span-2">
          <FooterListTitle title=" More about Shopmart" />
          <div className="flex flex-col gap-6">
            <p className="text-base w-full xl:w-[80%]">
           Shopmart is an electronic commerce project that was created by a group of students at landmark university
            </p>
            <ul className="flex items-center gap-2">
              <a
                href="https://www.youtube.com/@reactjsBD"
                target="_blank"
                rel="noreferrer"
              >
                <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaYoutube />
                </li>
              </a>
              <a
                href="https://github.com/noorjsdivs"
                target="_blank"
                rel="noreferrer"
              >
                <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaGithub />
                </li>
              </a>
              <a
                href="https://www.facebook.com/Noorlalu143/"
                target="_blank"
                rel="noreferrer"
              >
                <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaFacebook />
                </li>
              </a>
              <a
                href="https://www.linkedin.com/in/noor-mohammad-ab2245193/"
                target="_blank"
                rel="noreferrer"
              >
                <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaLinkedin />
                </li>
              </a>
            </ul>
          </div>
        </div>
        <div>
          <FooterListTitle title="Shop" />
          <ul className="flex flex-col gap-2">
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Accesories
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Clothes
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Electronics
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Home appliances
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              New Arrivals
            </li>
          </ul>
        </div>
        <div>
          <FooterListTitle title="Your account" />
          <ul className="flex flex-col gap-2">
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Profile
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Orders
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Addresses
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Account Details
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Payment Options
            </li>
          </ul>
        </div>
        <div className="col-span-2 flex flex-col items-center w-full px-4f">
          <FooterListTitle title="Subscribe to our newsletter." />
          <div className="w-full">
            <p className="text-center mb-4">
            Fuel Your Inbox With The Latest Trends in Electronic-Commerce
            </p> 
              <div className="w-full flex-col xl:flex-row flex justify-between items-center gap-4">
                <div className="flex flex-col w-full">
                  <input
                    onChange={InputChange}
                    value={email}
                    className="w-full h-12 border-b border-gray-400 bg-transparent px-4 text-primeColor text-lg placeholder:text-base outline-none"
                    type="text"
                    placeholder="Insert your email ...*"
                  />

                </div>
                <button 
                  onClick={inputSubmit}
                  className="newsletter-button"
                >
                  Subscribe
                </button>
              </div>
            
<div className="flutterwave-boss">            
       <img src={flutterwave} alt="payment-options" className="payment-options"></img>
       <img src={paystack} alt="payment-options" className="payment-options"></img>
       <img src={visacard} alt="payment-options" className="payment-options"></img>
       <img src={mastercard} alt="payment-options" className="payment-options"></img>
       <img src={amexcard} alt="payment-options" className="payment-options"></img>
       
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
