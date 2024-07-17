import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';


Axios.defaults.withCredentials = true;

const Register = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputUserEmail, setInputUserEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputDate, setInputDate] = useState("");

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await Axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, {
        name: inputUsername,
        email: inputUserEmail,
        password: inputPassword,
        dateofbirth : inputDate
      });

      if (response.status === 200) {
        console.log("User Registered successfully.", response.data);
        setShow(false);
        navigate("/login");
      }
    } catch (error) {
      console.error('Registration failed', error.message);
    }
      setShow(true);
      setLoading(false);
    }
  

  return (
    <section className="bg-gray-50 md:dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign Up
            </h1>
            <Form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <Form.Group controlId="username">
                <Form.Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  controlid="nameid"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Abhishek"
                  value={inputUsername}
                  onChange={(e) => setInputUsername(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="useremail">
                <Form.Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  controlid="emailid"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  value={inputUserEmail}
                  onChange={(e) => setInputUserEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  controlid="passwordid"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="dateofbirth">
                <Form.Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  controlid="dateid"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Date of Birth"
                  value={inputDate}
                  onChange={(e) => setInputDate(e.target.value)}
                  required
                />
              </Form.Group>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <Form.Check
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      // className="w-4 h-4 border border-gray-300 rounded bg-gray-50  focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <Form.Label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</Form.Label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline text-white ">Forgot password?</a>
              </div>
              <Button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" disabled={loading}>
                {loading ? "Logging In..." : "Sign Up"}
              </Button>
              {show && (
                <Alert className="mt-2 text-slate-200" variant="danger" onClose={() => setShow(false)} dismissible>
                  Incorrect username or password.
                </Alert>
              )}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400 flex flex-wrap ">
                Already have an account? &nbsp;&nbsp;&nbsp;&nbsp;     
                <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</a>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
