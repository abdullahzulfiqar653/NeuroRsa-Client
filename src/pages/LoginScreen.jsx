import { Navigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import GroupComponent from "../components/LoginScreenComponent";

const LoginScreen = () => {
  const { isAuthenticated } = useAuth();
  // if (isAuthenticated) return <Navigate to="/main-home" />;
  return (
    <div className="w-full h-[100vh] relative bg-darkslategray-300 overflow-x-hidden overflow-y-auto  flex flex-row items-start justify-end px-[15px] sm:px-[15px] md:px-[125px] lg:px-[125px] py-[125px]  box-border leading-[normal] tracking-[normal] mq450:pl-5 mq450:pr-5 mq450:box-border mq725:pl-[62px] mq725:pr-[62px] mq725:box-border">
      <main className=" w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px]">
        <img
          className="absolute    top-[0px] bottom-[0px] left-[0px] max-h-full w-[833px] object-cover z-[1]"
          alt=""
          src="/rectangle-34624467@2x.png"
        />
        <img
          className="absolute top-[50%] translate-y-[-50%] right-[0px] w-[748px] h-[748px] z-[1]"
          alt=""
          src="/group-1261153234.svg"
        />
      </main>
      <GroupComponent />
      <img
        className="absolute bottom-[0px] right-[0px] w-[550px] h-[350px] z-[1] object-cover object-top"
        alt=""
        src="/Group-bottom.png"
      />
    </div>
  );
};

export default LoginScreen;
