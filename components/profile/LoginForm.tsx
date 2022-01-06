import Router from "next/router";
import React from "react";
import { mutate } from "swr";

import ListErrors from "../common/ListErrors";
import UserAPI from "../../lib/api/user";

import Zipy from "zipy-test-v1";

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

      let demodata = {
        firstName : "Manisha",
        lastName:  "Malla",
        customerName: " Test Customer",
        avatar : "http://general.com/avatar",
        phone: "9911221234",
        cname: "hospital.com",
        homepage: "http://manishamalla.com",
        genericData: "Should not see this",
        "emp id": "67786",
        "client-id": "1234"
      }
      //demodata["emp id"] = "35678";
      //demodata["client-id"] = "1234";
      Zipy.identify("12345", demodata);
      
      if (data?.user) {
        window.localStorage.setItem("user", JSON.stringify(data.user));
        mutate("user", data?.user);
        Router.push("/");
      }
    } catch (error) {
      console.error(error);
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
