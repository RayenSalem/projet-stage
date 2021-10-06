import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import GlobalForm from "../components/GlobalForm";
import styles from "../styles/Home.module.css";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Paper } from "@material-ui/core";
export default function Home() {
  const { handleSubmit, register } = useForm();
  const router = useRouter();
  const [err, setErr] = useState("");

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:4000/auth/login", data);

      if (res.data && res.status == 200) {
        localStorage.setItem("user", JSON.stringify(res.data.message));
        let user = JSON.parse(localStorage.getItem("user")).user;
        console.log(user);
        if (user.isEmployee == true) {
          router.push("/employees");
        } else {
          router.push("/admins");
        }
      }
    } catch (err) {
      setErr("Something bad happened");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto my-4"
      style={{ maxWidth: "500px" }}
    >
      <div className="mb-3">
        <TextField
          required
          name="email"
          inputRef={register}
          label="Email"
          fullWidth
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <TextField
          required
          name="password"
          inputRef={register}
          label="Password"
          fullWidth
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Login
      </button>
      <p className="my-2">
        You dont have an account ?
        <Link href="/signup">
          <a style={{ color: "blue" }}>Register</a>
        </Link>
      </p>
      <p className="my-2">
        reset your:
        <Link href="/reset">
          <a style={{ color: "blue" }}>Password</a>
        </Link>
      </p>
    </form>
  );
}
