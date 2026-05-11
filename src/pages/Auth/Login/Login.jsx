 import React, { useContext } from 'react'
import { Button, FieldError, Input } from "@heroui/react";
import   { useState } from "react";
import { Calendar, DateField, DatePicker, Label } from "@heroui/react";
import { TextField } from "@heroui/react";
import { ListBox, Select } from "@heroui/react";
import { Link, useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { loginSchema } from "../../../lib/validationSchemas/authSechema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { loginUser } from "../../../services/AuthServices";
import { toast } from "react-toastify";
import { AuthContext } from '../../../context/AuthContext';

export default function Login() {
  const{token,setToken} = useContext(AuthContext);
  console.log("token in login", token);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  let {
    register,
    handleSubmit,
    control,
    formState: { errors ,issubmiting}
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function submit(data) {
    try {
      let response = await loginUser(data);
      setToken(response.data.data.token);
      localStorage.setItem("token", response.data.data.token);
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      let errorMsg = error.response?.data?.message || error.message;
      toast.error(errorMsg);
    }
  }
  return (
    <>
      <form
        className="max-w-4xl mx-auto w-full"
        onSubmit={handleSubmit(submit)}
      >
        <h2 className="text-3xl font-bold my-2">
         Login form
        </h2>
        <p className="text-gray-500 text-lg font-semibold my-2">
          Please fill in this form to login
        </p>
        <div className="form-body pb-3">
         
          <div className="filed-dev pb-3">
            <TextField
              aria-label="email"
              isInvalid={errors.email}
              className="w-full md:w-xl"
            >
              <Input
                className="border border-gray-100 outline pb-4"
                placeholder="Enter your email"
                {...register("email")}
                type="email"
                variant="primary"
              />
              <FieldError>{errors.email?.message}</FieldError>
            </TextField>
          </div>
          <div className="filed-dev pb-3">
            <TextField
              aria-label="password"
              isInvalid={errors.password}
              className="w-full md:w-xl"
            >
              <Input
                {...register("password")}
                className="borderborder-gray-100 outline pb-4"
                placeholder="Enter your Password"
                type={showPassword ? "text" : "password"}
                variant="primary"
              />
              <FieldError>{errors.password?.message}</FieldError>
            </TextField>
          </div>
          <div className="field-div pt-5">
            <Button color="primary" className="w-full md:w-xl" type="submit">
              Login
            </Button>
            <p className="text-center text-lg font-semibold w-full md:w-xl pt-3">
              Don’t have an account?
              <Link to="/register" className="text-blue-500 font-semibol pl-3">
                Register
              </Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
}
