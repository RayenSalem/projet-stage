import "../styles/globals.css";
import { FormProvider, useForm } from "react-hook-form";
import Sidebar from "../components/SideBar";
import { useRouter } from "next/router";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { useEffect } from "react";
function MyApp({ Component, pageProps }) {
  const methods = useForm({
    mode: "onBlur",
  });
  const router = useRouter();
  let user = null;
  if (typeof window != "undefined") {
    user = localStorage.getItem("user");
  }

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);
  return (
    <div>
      <Layout>
        <FormProvider {...methods}>
          <Component {...pageProps} />
        </FormProvider>
      </Layout>
    </div>
  );
}

export default MyApp;
