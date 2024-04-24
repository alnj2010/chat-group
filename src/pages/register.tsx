import { EDIT_PROFILE_PAGE_ROUTE, LOGIN_PAGE_ROUTE } from "@/constanst";
import CredentialsForm from "@/components/CredentialsForm";
import { Credentials } from "@/types";
import { callAPICredentialsSignIn, callAPISignUpFromAuthForm } from "@/lib/api";
import AuthBoxContainer from "@/components/AuthBoxContainer";
import AuthLayout from "@/layouts/AuthLayout";
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";

const Register: NextPageWithLayout = () => {
  const registerAction = async (credentials: Credentials) => {
    await callAPISignUpFromAuthForm(credentials);
    await callAPICredentialsSignIn(credentials);
  };
  return (
    <AuthBoxContainer
      title="Join thousands of learners from around the world"
      subtitle=" Master web development by making real-life projects. There are
      multiple paths for you to choose"
      jumpTo={LOGIN_PAGE_ROUTE}
      jumpTextTo="Login"
      jumpAdviceTo="Already a member?"
    >
      <CredentialsForm
        formId="sign-up"
        action={registerAction}
        redirectTo={EDIT_PROFILE_PAGE_ROUTE}
        textButton="Start coding now"
      />
    </AuthBoxContainer>
  );
};

Register.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};
export default Register;
