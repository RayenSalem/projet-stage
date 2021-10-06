import React, { useState, useContext } from "react";
import dynamic from "next/dynamic";
const M = dynamic(() => import("materialize-css"), { ssr: false });

const ResetPassword = ({ token }) => {
  const [password, setPassword] = useState("");
  console.log(token);
  const PostData = () => {
    console.log("lol");
    fetch("http://localhost:4000/auth/reset", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          //   M.toast({ html: data.error, classes: "#c62828 red darken-3" });
          console.log(data.error);
        } else {
          console.log("success");
        }
      })
      .catch((err) => {
        console.log("lol");
        console.log(err);
        console.log("lol");
      });
  };
  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2>Rest Password</h2>
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn waves-effect waves-light #64b5f6 blue darken-1"
          onClick={() => PostData()}
        >
          reset password
        </button>
      </div>
    </div>
  );
};

ResetPassword.getInitialProps = async ({ query }) => {
  const token = query.token;
  return { token };
};

export default ResetPassword;
