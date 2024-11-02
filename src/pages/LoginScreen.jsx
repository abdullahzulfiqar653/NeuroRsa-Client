import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import GroupComponent from "../components/LoginScreenComponent";

const LoginScreen = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/main-home" />;

  return (
    <div className="w-full h-[100vh] relative bg-darkslategray-300 overflow-x-hidden overflow-y-auto  flex md:flex-row flex-col items-start md:justify-end justify-around px-[15px] sm:px-[15px] md:px-[125px] lg:px-[125px] py-[25px]  box-border leading-[normal] tracking-[normal] mq450:pl-5 mq450:pr-5 mq450:box-border mq725:pl-[62px] mq725:pr-[62px] mq725:box-border">
      <main className=" w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px]"></main>
      <GroupComponent />
      <div className="md:hidden flex justify-end text-end items-end h-full  text-sm text-gray-200">
        <div className="w-full text-sm inline-block z-[3]">
          Produced by:{" "}
          <span className="border-b-[1px] border-gray-200">
            Neuronus Computing
          </span>
        </div>
      </div>
      <img
        className="absolute top-[-5px] right-[0px] w-full  z-[1] hidden md:block"
        alt=""
        src="/loginBg.svg"
      />
      <img
        className="absolute  left-[0px] right-[0px] w-full z-[1] md:hidden"
        alt=""
        src="/loginMobileBg.svg"
      />
    </div>
  );
};

export default LoginScreen;
