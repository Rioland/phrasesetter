"use client";

import Image from "next/image";
import axios from 'axios';
import * as nodemailer from "nodemailer";
import logo from "../public/images/logo.jpeg";
import { useState } from "react";
import Swal from "sweetalert2";
export default function Home() {
  const [email, setEmail] = useState("");
  const [phrase, setPhrase] = useState("");
  const [loading, setLoading] = useState(false);

  const sentMail = async () => {
    if (!email) {
      Swal.fire({
        title: "Input Error",
        text: "Email field is required",
        icon: "error",
      });

      return;
    }
    if (!phrase) {
      Swal.fire({
        title: "Input Error",
        text: "Phrase field is required",
        icon: "error",
      });

      return;
    }
    
    try {
      setLoading(true);
      const res = await  axios.post('http://localhost:3000/api/contact', JSON.stringify({"email":email,"phrase":phrase}),)
      
  
      const body =  res.data;
  
      if (res.status==200) {
        setLoading(false);
        Swal.fire({
          title: "Success",
          text: `${body.message} 🚀`,
          icon: "success",
        });
        
      }
  
      if (res.status === 400) {
        setLoading(false);
        Swal.fire({
          title: "Error",
          text:`${body.message} 😢`,
          icon: "error",
        });
        
      }
    } catch (err) {
      setLoading(false);
      console.log('Something went wrong: ', err);
    }
  };

  return (
    <main>
      <div className="container-fluid">
        <div className="border rounded mt-5 cra">
          <div className="text-center">
            <Image src={logo} width="400" height="300" alt="img" />
          </div>
          <div className="mb-3 ms-3 ms-md-5 me-3 me-md-5">
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
            />
            <input
              type="text"
              required
              onChange={(e) => {
                setPhrase(e.target.value);
              }}
              className="form-control mt-3"
              id="exampleFormControlInput1"
              placeholder="Phrase"
            />
          </div>
          <div className="text-center">
            <button
              disabled={loading}
              onClick={()=>{
                sentMail();
              }}
              type="button"
              className="btn mb-3 btn-primary"
            >
              {loading ? "Loading..." : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
