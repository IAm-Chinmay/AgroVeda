import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "../action";
import axios from "axios";
function VendorSignin() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3000/api/market/login", {
        email: email,
        password: pass,
      })
      .then((res) => {
        dispatch(login(res.data.userId));
      })
      .catch((er) => {
        console.log(er);
      });
  };
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "50%",
          border: "1px solid black",
          borderRadius: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <h1 style={{ margin: "10px 0" }}>Login</h1>
        <h5 style={{ fontWeight: 400, margin: "5px 0" }}>
          Don't have an account?
        </h5>
        <h5 style={{ fontWeight: 400, margin: "0" }}>
          <Link
            to="/vsignup"
            style={{ textDecoration: "none", color: "blue", cursor: "pointer" }}
          >
            Sign Up
          </Link>
        </h5>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <form onSubmit={onLogin}>
            <h4 style={{ margin: "10px 0" }}>Email</h4>
            <input
              style={{
                width: "100%",
                height: 30,
                paddingLeft: 10,
                borderWidth: 1,
                borderRadius: 15,
                marginBottom: "15px",
              }}
              type="email"
              placeholder="Enter your email..."
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />

            <h4 style={{ margin: "10px 0" }}>Password</h4>
            <input
              style={{
                width: "100%",
                height: 30,
                paddingLeft: 10,
                borderWidth: 1,
                borderRadius: 15,
                marginBottom: "15px",
              }}
              type="password"
              placeholder="Enter your password"
              onChange={(e) => {
                setPass(e.target.value);
              }}
              required
            />
            <button
              style={{
                width: "100%",
                height: 30,
                paddingLeft: 10,
                borderWidth: 2,
                borderRadius: 15,
                marginBottom: "15px",
                backgroundColor: "#00bf63",
                marginLeft: 10,
                marginTop: 10,
                fontWeight: 800,
                cursor: "pointer",
              }}
              type="submit"
            >
              SIGN IN
            </button>
            <h4
              style={{
                textAlign: "center",
              }}
            >
              <Link to={"/"}>Sign For Consultant</Link>
            </h4>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VendorSignin;
