import "react-toastify/dist/ReactToastify.css";
import "styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Store, { IStore } from 'store'
import { useEffect, useState } from "react";

import type { AppProps } from "next/app";
import Head from "next/head";
import LoginContainer from "module/Login/Container/LoginContainer";
import OfflinePageContainer from "module/404/Container/OfflinePageContainer";
import PageNoAccessContainer from "module/404/Container/PageNoAccessContainer";
import { PulseLoader } from "react-spinners";
import RegisterContainer from "module/Register/Container/RegisterContainer";
import Template from "component/Template";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [statusPage, setStatusPage] = useState(true);
  useEffect(() => {
    const changeStatus = () => {
      setStatusPage(navigator.onLine)
    }
    const handleStart = () => {
      setIsLoading(true);
    };

    const handleStop = () => {
      setIsLoading(false);
    };

    const handleComplete = () => {
      setIsLoading(false);
    };
    window.addEventListener('online', changeStatus)
    window.addEventListener('offline', changeStatus)
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleStop);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, statusPage]);

   const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: true,
            // cacheTime: 5000, // 5 detik
            // refetchInterval: 20000, // selama 20 detik akan dilakukan refetch ulang
            staleTime: 0, // akan melaukan refetch otomatis saat dipanggil ulang, keperluan untuk session sebelum habis data akan dilakukan refetchUlang
            refetchOnWindowFocus: true, //ketika jendela browser mendapatkan fokus atau window diem maka akan melakukan refetch
            refetchOnMount: false, //tidak akan retch pada saat komponen yang menggunakan requery ketika di mount kembali,
            retryOnMount: false, //tidak akan retech ulang jika sebelumnya terjadi kesalahan server atau jaringan
          },
        },
      })
  )

  function Root() {
    const { auth, logOut}: IStore = Store();
    const [showChild, setShowChild] = useState(false);
    useEffect(() => {
      setShowChild(true);
    }, []);
    useEffect(() => {
      if (statusPage === false) {
        return
      }
      if (showChild && statusPage == true ) {
        if ((auth && router.pathname === "/login") ) {
          if(auth?.token){
            router.push("/")
          }else{
            router.push('/404')
          }
        } else if (!auth && router.pathname !== "/login") {
          logOut()
          // router.push('/login')
          location.href = '/login'
        } else if (router.pathname === '/_error') {
          router.push('/404')
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showChild, auth, statusPage]);
      if (!showChild) {
      return null
    }

    if (statusPage === false) {
      return <OfflinePageContainer />
    }

    if (router.pathname === '/_error') {
      return <PageNoAccessContainer/>
    }
    if(showChild){
      const listNoTemplate = ['/register', '/login']
      if(!listNoTemplate.includes(router.pathname)) {
        if(auth?.token){
          return(
          <Template>
            <Component {...pageProps} />
          </Template>
          )
        } else{
         return <Component {...pageProps} />;
        }
      }
      if (!auth?.token) {
        if(router.pathname === "/login"){
           return <LoginContainer/>
        }else{
          return  <RegisterContainer/>;
        }
      }
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>GoFinance</title>
      </Head>
      <div className="light !m-0 !p-0 h-screen">
        {isLoading && (
          <div className="fixed z-50 w-screen h-screen flex justify-center items-center bg-[#0575E6] opacity-95 duration-700 overflow-hidden">
            <PulseLoader color="white" className="m-auto" size={100} />
          </div>
        )}
        {Root()}
        <ToastContainer />
      </div>
    </QueryClientProvider>
  );
}
