import React from "react";
import { Link } from "react-router-dom";

function VendorSignup() {
  // const dispatch = useDispatch();
  // const [username, setuser] = useState("");
  // const [email, setemail] = useState("");
  // const [password, setpass] = useState("");
  // const [phoneNumber, setph] = useState("");
  // const createAcc = async (e) => {
  //   e.preventDefault();
  //   await axios
  //     .post("http://localhost:3000/api/consultant/signup", {
  //       username: username,
  //       email: email,
  //       password: password,
  //       phoneNumber: phoneNumber,
  //     })
  //     .then((res) => {
  //       dispatch(login(res.data.userId));
  //     })
  //     .catch((er) => {
  //       console.log(er);
  //     });

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
        <h1 style={{ margin: "10px 0" }}>SignUp</h1>

        <h5 style={{ fontWeight: 400, margin: "5px 0" }}>
          Don't have an account?
        </h5>

        <h5 style={{ fontWeight: 400, margin: "0" }}>
          <button style={{ all: "unset", cursor: "pointer", color: "blue" }}>
            <Link to={"/vsignin"}>Login</Link>
          </button>
        </h5>

        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <form>
            <h4 style={{ margin: "10px 0" }}>Username</h4>
            <input
              style={{
                width: "100%",
                height: 30,
                paddingLeft: 10,
                borderWidth: 1,
                borderRadius: 15,
                marginBottom: "15px",
              }}
              type="text"
              placeholder="Enter your username"
              required
              onChange={(e) => {
                //   setuser(e.target.value);
              }}
            />
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
              placeholder="Enter your email"
              required
              onChange={(e) => {
                // setemail(e.target.value);
              }}
            />
            <h4 style={{ margin: "10px 0" }}>Phone-Number</h4>
            <input
              style={{
                width: "100%",
                height: 30,
                paddingLeft: 10,
                borderWidth: 1,
                borderRadius: 15,
                marginBottom: "15px",
              }}
              type="tel"
              placeholder="Enter your phone number"
              required
              onChange={(e) => {
                //   setph(e.target.value);
              }}
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
              required
              onChange={(e) => {
                //   setpass(e.target.value);
              }}
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
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VendorSignup;
