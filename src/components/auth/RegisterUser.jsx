/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { Button } from "../ui/button";
import { registerUser } from "../utils/ApiFunction";

const RegisterUser = () => {

    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState({});
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
    };

    const validateForm = () => {
        const newErrors = {};
        if (!userData.email) {
            newErrors.email = "Email is required";
        }
        if (!userData.firstName) {
            newErrors.firstName = "First name is required";
        }
        if (!userData.lastName) {
            newErrors.lastName = "Last name is required";
        }
        if (!userData.password) {
            newErrors.password = "Password is required";
        }
        if (!userData.phoneNumber) {
            newErrors.phoneNumber = "Phone number is required";
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage({}); // Clear previous errors

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrorMessage(validationErrors); // Set validation errors
            return; // Prevent submission if there are validation errors
        }

        try {
            const success = await registerUser(userData)
            if (success.statusCode === 200) {
                setUserData({
                    email: "",
                    firstName: "",
                    lastName: "",
                    phoneNumber: "",
                    password: ""
                })
                setSuccessMessage('User registered successfully')
                setTimeout(() => {
                  setSuccessMessage('')
                  navigate('/auth/login')
                }, 3000)
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response?.data?.message || error.message)
                setTimeout(() => setError(''), 500)
            } else {
                console.error("Error registering user", error);
            }
        }
    };

    return (
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      
          <img
            width={160} height={160}
            src="/logo.svg"
            alt="logo"
            className="mb-6"
          />
          
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>

              {error && <p className="text-red-500">{error}</p>}
              {successMessage && <p className="text-green-500">{successMessage}</p>}

              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={userData.email}
                    onChange={handleChange}
                    className={`bg-gray-50 border ${
                      errorMessage.email ? 'border-red-500' : 'border-gray-300'
                    } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="name@email.com"
                  />
                  {errorMessage.email && <p className="text-red-500">{errorMessage.email}</p>}
                </div>
                <div>
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                    className={`bg-gray-50 border ${
                      errorMessage.firstName ? 'border-red-500' : 'border-gray-300'
                    } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="First Name"
                  />
                  {errorMessage.firstName && <p className="text-red-500">{errorMessage.firstName}</p>}
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                    className={`bg-gray-50 border ${
                      errorMessage.lastName ? 'border-red-500' : 'border-gray-300'
                    } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="Last Name"
                  />
                  {errorMessage.lastName && <p className="text-red-500">{errorMessage.lastName}</p>}
                </div>
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={userData.phoneNumber}
                    onChange={handleChange}
                    className={`bg-gray-50 border ${
                      errorMessage.phoneNumber ? 'border-red-500' : 'border-gray-300'
                    } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="0987654321"
                  />
                  {errorMessage.phoneNumber && <p className="text-red-500">{errorMessage.phoneNumber}</p>}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={userData.password}
                    onChange={handleChange}
                    className={`bg-gray-50 border ${
                      errorMessage.password ? 'border-red-500' : 'border-gray-300'
                    } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="••••••••"
                  />
                  {errorMessage.password && <p className="text-red-500">{errorMessage.password}</p>}
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required  
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                >
                  Create an account
                </Button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to={"/login"}
                    className="font-medium text-blue-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
};

export default RegisterUser;
