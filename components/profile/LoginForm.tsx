import Router from "next/router";
import React from "react";
import { mutate } from "swr";

import ListErrors from "../common/ListErrors";
import UserAPI from "../../lib/api/user";

import Zipy from "zipy-staging-nextjs";

const LoginForm = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleEmailChange = React.useCallback(
    (e) => setEmail(e.target.value),
    []
  );
  const handlePasswordChange = React.useCallback(
    (e) => setPassword(e.target.value),
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, status } = await UserAPI.login(email, password);
      if (status !== 200) {
        setErrors(data.errors);
      }
      Zipy.identify("conduit_test" , {
        firstName: "Mark",
        lastName: "Reader",
        age: "30",
        customerName: "Pixelphone Inc.",
        phone: "202-555-0112",
      });
      if (data?.user) {
        window.localStorage.setItem("user", JSON.stringify(data.user));
        mutate("user", data?.user);
        Router.push("/");
      }
      let sessionURL = Zipy.getCurrentSessionURL();
      console.log("sessionURL",sessionURL); 
      const circularReference = { myself: {}};
      circularReference.myself = circularReference;
      console.log('Circular Reference: ', circularReference);

      const data = JSON.stringify({
          query: ` {
            users  {
                id
                email
                name
            }
        }`
        });
      const response =   fetch(
          'https://api.mocki.io/v2/c4d7a195/graphql',
          {
            method: 'post',
            body: data,
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': data.length
            },
          }
        );
      
    } catch (error) {
      console.error(error);
      reject();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ListErrors errors={errors} />

      <form onSubmit={handleSubmit}>
        <fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </fieldset>

          <button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            disabled={isLoading}
          >
            Sign in
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default LoginForm;
