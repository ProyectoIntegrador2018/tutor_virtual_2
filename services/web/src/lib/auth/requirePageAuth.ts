import axios from "axios";
import { UserRoleName } from "lib/types/role";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

interface IRequirePageAuth {
  roles: UserRoleName[];
  redirect?: string;
}

type GetServerSidePropsWithAuth<P extends { [key: string]: any }> = (
  context: GetServerSidePropsContext
) => Promise<{ props: P }>;

const requirePageAuth = <P extends { [key: string]: any }>(
  { roles, redirect }: IRequirePageAuth,
  cb?: GetServerSidePropsWithAuth<P>
): GetServerSideProps => async (ctx) => {
  try {
    const { cookie } = ctx.req.headers;

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}/v1/me/role`,
      { headers: cookie ? { cookie } : undefined }
    );

    const viewerRole = response.data;

    if (!roles.includes(viewerRole.role.name)) {
      return { redirect: { destination: redirect }, props: {} };
    }

    return cb ? await cb(ctx) : { props: {} };
  } catch (e) {
    if (roles.includes(UserRoleName.NO_AUTH)) {
      return cb ? await cb(ctx) : { props: {} };
    }
    return { redirect: { destination: redirect, permanent: false }, props: {} };
  }
};

export default requirePageAuth;
