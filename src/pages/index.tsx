import CredentialsForm from "@/components/CredentialsForm";
import { PROFILE_PAGE_ROUTE, REGISTER_PAGE_ROUTE } from "@/constanst";
import { Credentials } from "@/types";
import { callAPICredentialsSignIn } from "@/lib/api";
import { NextPageWithLayout } from "./_app";
import { ReactElement } from "react";
import AuthLayout from "@/layouts/AuthLayout";
import AuthBoxContainer from "@/components/AuthBoxContainer";

const Login: NextPageWithLayout = () => {
  const loginAction = async (credentials: Credentials) => {
    await callAPICredentialsSignIn(credentials);
  };

  return (
    <AuthBoxContainer
      title="Login"
      subtitle=""
      jumpTo={REGISTER_PAGE_ROUTE}
      jumpTextTo="Register"
      jumpAdviceTo="Don’t have an account yet?"
    >
      <CredentialsForm
        formId="sign-in"
        action={loginAction}
        redirectTo={PROFILE_PAGE_ROUTE}
        textButton="Login"
      />
    </AuthBoxContainer>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};
export default Login;
