import { Button, FieldError, Input } from "@heroui/react";
import React, { useState } from "react";
import { Calendar, DateField, DatePicker, Label } from "@heroui/react";
import { TextField } from "@heroui/react";
import { ListBox, Select } from "@heroui/react";
import { Link, useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { registerSchema } from "../../../lib/validationSchemas/authSechema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { registerUser } from "../../../services/AuthServices";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [sucessMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  let {
    register,
    handleSubmit,
    control,
    formState: { errors ,issubmiting}
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: null,
      gender: "",
    },
  });

  async function submit(data) {
    try {
       setIsLoading(true);
      let response = await registerUser(data);
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      let errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    }finally{
        setIsLoading(false);
    }
  }
  return (
    <>
      <form
        className="max-w-4xl mx-auto w-full"
        onSubmit={handleSubmit(submit)}
      >
        <h2 className="text-3xl font-bold my-2">
          Welcome to our social media platform
        </h2>
        <p className="text-gray-500 text-lg font-semibold my-2">
          Please fill in this form to create an account
        </p>
        <div className="form-body pb-3">
          <div className="filed-dev pb-3">
            <TextField
              aria-label="Name"
              isInvalid={errors.name}
              className="w-full md:w-xl"
            >
              {/* <Label>Name</Label> */}
              <Input
                className="border border-gray-100 outline pb-4"
                placeholder="Enter your name"
                {...register("name")}
                variant="primary"
                type="text"
              />
              <FieldError>{errors.name?.message}</FieldError>
            </TextField>
          </div>
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
          <div className="filed-dev pb-3 w-full md:w-xl relative">
            <TextField
              aria-label="password"
              isInvalid={errors.password}
              className="w-full md:w-xl "
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
            {showPassword ? (
              <FaEyeSlash
                className="cursor-pointer absolute top-[25%] right-3.75"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <FaEye
                className="cursor-pointer absolute top-[25%] right-3.75"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
          <div className="filed-dev pb-3">
            <TextField
              aria-label="rePassword"
              isInvalid={errors.rePassword}
              className="w-full md:w-xl"
            >
              <Input
                {...register("rePassword")}
                className="border border-gray-100 outline pb-4"
                placeholder="Confirm your Password"
                type="password"
                variant="primary"
              />
              <FieldError>{errors.rePassword?.message}</FieldError>
            </TextField>
          </div>

          <div className="flex items-center gap-3">
            <TextField
              aria-label="dateOfBirth"
              isInvalid={errors.dateOfBirth}
              className="w-full md:w-70"
            >
              <Input
                {...register("dateOfBirth")}
                className="border border-gray-100 outline pb-4"
                placeholder="Confirm your Password"
                type="date"
                variant="primary"
              />
              <FieldError>{errors.dateOfBirth?.message}</FieldError>
            </TextField>

           <Controller
              name="gender"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <select
                  {...field}
                  aria-label="gender"
                  className="w-full md:w-70 px-3 py-2 border rounded-[0.75rem] bg-white shadow-sm pb-3 focus:outline-none"
                >
                  <option value="" disabled>
                    Select a gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              )}
            />
            <FieldError>{errors.gender?.message}</FieldError>
          </div>
          <div className="field-div pt-5">
            <Button color="primary" className="w-full md:w-xl" type="submit" isDisabled={isLoading}>
                Register
                {isLoading ? <FaSpinner className="w-3.5 h-3.5" />  :"" }
            </Button>
            <p className="text-center text-lg font-semibold w-full md:w-xl pt-3">
              Already have an account
              <Link to="/login" className="text-blue-500 font-semibol pl-3">
                Login
              </Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
}
