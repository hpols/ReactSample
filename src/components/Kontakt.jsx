//For Nodemailer See: https://dev.to/jlong4223/how-to-implement-email-functionality-with-node-js-react-js-nodemailer-and-oauth2-2h7m
//For Recapcha See: https://blog.logrocketnpm install --save react-google-recaptcha.com/implement-recaptcha-react-application/

import React, { useState, useRef } from "react";
//import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
//import kontaktStyle from "../styles/Kontakt.module.scss";

const Kontakt = () =>{

  const [mailerState, setMailerState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const captchaRef = useRef(null);
  
  function handleStateChange(e) {
    setMailerState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(e.target.name);
  }

const submitEmail  = async (e) =>{
  e.preventDefault();

    //handling captcha
    const token = captchaRef.current.getValue();
    captchaRef.current.reset();
    let response = "";
 
    await axios.post(process.env.REACT_APP_API_URL, {token})
    .then(res => 
      console.log("axios post in Kontakt: ",res),
      console.log({ mailerState }), //handling mail 
      
      response = await fetch("http://localhost:3001/send", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ mailerState }),
      })
      .then((res) => res.json())
      .then(async (res) => {
        const resData = await res;
        console.log(resData);
        if (resData.status === "success") {
          alert("Message Sent");
        } else if (resData.status === "fail") {
          alert("Message failed to send");
        }
      })
      .then(() => {
        setMailerState({
          email: "",
          name: "",
          message: "",
        });
      }),
    )
    .catch((error) => {
        console.log(error);
    })
}

  return(
    <div id="wrapper">
     <form onSubmit={submitEmail}>
       <fieldset >
         <legend>React NodeMailer Contact Form</legend>
         <input
           placeholder="Name"
           onChange={handleStateChange}
           name="name"
           value={mailerState.name}
         />
         <input
           placeholder="Email"
           onChange={handleStateChange}
           name="email"
           value={mailerState.email}
         />
         <textarea
           placeholder="Message"
           onChange={handleStateChange}
           name="message"
           value={mailerState.message}
         />
         {/*  <ReCAPTCHA
            sitekey={process.env.REACT_APP_SITE_KEY}
            ref={captchaRef}
            /> */}
         <button>Send Message</button>
       </fieldset>
     </form>
      </div>
  )
}

export default Kontakt