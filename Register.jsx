import { useState } from "react";
import { Link } from "react-router-dom";
import Image from "./registerImg.png";
import "./index.css";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dob: "",
    country: "",
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`${name}:${value}`); //changes are shown in console
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required!";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required!";
    }

    if (!formData.email) {
      newErrors.email = "Email is required!";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address!";
    }

    if (!formData.password) {
      newErrors.password = "Password is required!";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters!";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required!";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match!";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select a gender!";
    }

    if (!formData.dob) {
      newErrors.dob = "Date of Birth is required!";
    } else {
      const birthDate = new Date(formData.dob);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 18) {
        newErrors.dob = "You must be atleast 18 years old!";
      }
    }

    if (!formData.country) {
      newErrors.country = "Please select a country!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateForm()) {
      setRegistrationSuccess(true);
    }
  };

  const email = "";
  const password = "";

  return (
    <div className="Container min-h-screen flex items-center justify-center px-4">
      {registrationSuccess ? (
        <div className="text-white text-2xl font-bold">
          Registration Successful! <br />
          <Link
            to="/login"
            state={{
              registeredEmail: formData.email,
              registeredPassword: formData.password,
            }}
            className="mt-4 block text-center text-blue-400 underline hover:text-white"
          >
            Go to Login
          </Link>
        </div>
      ) : (
        <div className="main-container w-full max-w-4xl flex flex-col md:flex-row bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-lg">
          <div className="img-container w-full md:w-[40%] h-[250px] md:h-auto bg-gray-800 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none overflow-hidden">
            <img
              src={Image}
              alt="Image with Register Name"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="form-container w-full md:w-[60%] p-6 md:p-8 bg-gray-700 rounded-br-2xl md:rounded-r-2xl">
            <h1 className="text-3xl font-bold text-white mb-6 text-center">
              Register Here
            </h1>

            <div className="grid-container grid-card grid  gap-4">
              <div>
                <label className="block text-sm font-medium text-white">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full p-2 mt-1 rounded-md bg-gray-600 text-white"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full p-2 mt-1 rounded-md bg-gray-600 text-white"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName}</p>
                )}
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-white">
                  Email ID
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 mt-1 rounded-md bg-gray-600 text-white"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 rounded-md bg-gray-600 text-white"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 rounded-md bg-gray-600 text-white"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <div className="gender-box mt-4">
              <label className="block text-sm font-medium text-white">
                Gender
              </label>
              <div className="flex gap-4 mt-1">
                {["male", "female", "other"].map((gender) => (
                  <label key={gender} className="flex items-center text-white">
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={formData.gender === gender}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-white">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 rounded-md bg-gray-600 text-white"
                />
                {errors.dob && (
                  <p className="text-red-500 text-sm">{errors.dob}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Country
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 rounded-md bg-gray-600 text-white"
                >
                  <option value="">Select Country</option>
                  <option value="INDIA">INDIA</option>
                  <option value="USA">USA</option>
                  <option value="Canada">Canada</option>
                  <option value="UK">UK</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleRegister}
              className="button w-full mt-6 p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Register
            </button>
            <h1 className="text-white text-center mt-2 flex justify-center items-center ">
              OR
            </h1>
            <Link
              to="/login"
              className="block text-center w-full mt-2 p-2 text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              Go to Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
