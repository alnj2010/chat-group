import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";

type Profile = {
  email: string;
};

export const getServerSideProps = (async (req) => {
  const user = await getToken(req);

  const profile = { email: "asd" };
  return { props: profile };
}) satisfies GetServerSideProps<{}>;

export default function Page({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  return <main data-testid="change-info-section">Edit profile</main>;
}
