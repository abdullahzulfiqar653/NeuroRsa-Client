import { Link, Navigate } from "react-router-dom";

import { useAuth } from "../AuthContext";
import ErrorBoundary from "../components/ErrorBoundary";
import GroupComponent from "../components/RegisterScreenComponent";

const RegisterScreen = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/main-home" />;
  return (
    <div className="w-full h-[100vh] items-center relative bg-darkslategray-300 overflow-x-hidden overflow-y-auto  flex md:flex-row flex-col  justify-around md:justify-end px-[15px] sm:px-[15px] md:px-[125px]   box-border leading-[normal] tracking-[normal] mq450:pl-5 mq450:pr-5 mq450:box-border mq725:pl-[62px] mq725:pr-[62px] mq725:box-border">
      <Link to="/" className="block sm:block md:hidden lg:none">
        <img
          src="/Group 1261153272.svg"
          alt=""
          className="absolute top-[33px] left-[21px] z-[5]"
        />
      </Link>
      <main className=" w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px]"></main>
      <ErrorBoundary>
        <GroupComponent />
      </ErrorBoundary>
      <div className="md:hidden self-stretch flex justify-end pt-0 pb-0 pl-px text-sm text-gray-200">
        <div className="w-full text-sm inline-block z-[3]">
          Produced by:{" "}
          <span className="border-b-[1px] border-gray-200">
            Neuronus Computing
          </span>
        </div>
      </div>
      <img
        className="absolute top-[-5px] w-full right-[0px]  z-[1] hidden md:block"
        alt=""
        src="/RegisBg.svg"
      />
      <img
        className="absolute  left-[0px] right-[0px] w-full z-[1] md:hidden"
        alt=""
        src="/RegisMobileBg.svg"
      />
    </div>
  );
};

export default RegisterScreen;
