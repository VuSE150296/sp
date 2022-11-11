import React, { useEffect } from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";
const clientId =
  "874015971178-0461l5tlksvspu487u08779128bn5rn7.apps.googleusercontent.com";
export default function LoginGoogle({ setLoading }) {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  let navigate = useNavigate();
  const onSuccess = async (res) => {
    setLoading(true);
    localStorage.setItem("userLogin", JSON.stringify(res.profileObj));
  };

  const onFailure = (res) => {
    console.log("onFailure", res);
  };
  return (
    <GoogleLogin
      buttonText="Login"
      clientId={clientId}
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
}
