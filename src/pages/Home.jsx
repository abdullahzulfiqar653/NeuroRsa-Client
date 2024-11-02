import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../AuthContext";

const Home = ({ className = "" }) => {
  const { isAuthenticated } = useAuth();
  return (
    <section
      className={`self-stretch overflow-x-hidden flex flex-row items-start justify-start max-w-full text-left text-lg text-gray-200 font-montserrat ${className}`}
    >
      
      <div className="absolute inset-0 bg-[#0B2837] bg-opacity-[70%]"></div>
      <video autoPlay muted loop playsInline id="background-video">
        <source src="./bg-video.mp4" type="video/mp4" />
      </video>
      <div className="bg-[#0B2837] absolute z-40 w-full">
        <Header />
      </div>
      <div className="flex-1 flex flex-col  max-w-full lg:gap-[63px] mq750:gap-8 mq450:gap-4">
        <div className=" xs:max-w-[100%] md:max-w-[883px] lg:max-w-[883px] flex xs:flex-col sm:flex-col md:flex-row lg:flex-row xs:items-start items-center justify-start py-0 xs:px-[15px] sm:px-[15px] md:px-8 lg:px-8 box-border max-w-full text-xl text-gainsboro font-neue-plak z-10">
          <div className="flex-1 flex flex-col items-start justify-start xs:gap-[43px] sm:gap-[43px] md:gap-[69px] lg:gap-[69px] max-w-full sm:min-h-[100vh] sm:justify-center">
            <div className="xs:mt-[100px] sm:mt-[100px] md:mt-[0px] lg:mt-[0px] self-stretch flex flex-col items-start justify-start  max-w-full">
              <div className="xs:max-w-[100%] md:max-w-[724px] lg:max-w-[724px] flex flex-col items-start justify-start  max-w-full text-24xl text-white">
                <h1 className="md:mt-5 mt-11 mb-[17px] xs:max-w-[100%] md:max-w-[518px] lg:max-w-[518px] xs:text-[24px] sm:text-[24px] md:text-[43px] lg:text-[43px] xs:leading-[5px] sm:leading-[33px] md:leading-[60px] lg:leading-[60px] relative text-[43px] font-semibold inline-block max-w-full z-[1]">
                  Welcome to neuro.RSA
                </h1>
                <div className="self-stretch relative xs:text-[13px] sm:text-[13px] md:text-[20px] lg:text-[20px] leading-[23px] text-gainsboro inline-block xs:mb-[14px] sm:mb-[14px] md:mb-[43px] lg:mb-[43px] z-[1] max-w-[724px]">
                  Neuro.RSA is a front-end for the crypto software. For most
                  actions you need either a public key (certificate) or your own
                  private key.
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-start py-0 xs:pl-[11px] sm:pl-[11px] md:pl-[19px] lg:pl-[19px] pr-0 box-border max-w-full">
                <div className="flex-1 flex flex-col items-start justify-start md:gap-[19px] gap-[14px] max-w-full">
                  <div className="w-[745px] flex flex-row  items-center justify-start gap-[9px] max-w-full">
                    <div className="w-[12px] h-[12px] min-w-[20px]">
                      <img
                        src="/circle-icon.svg"
                        alt=""
                        className="w-[12px] h-[12px] relative z-[1]"
                      />
                    </div>
                    <div className="text-white font-normal md:text-[20px] text-[13px] md:leading-[27.62px] leading-[10.62px]">
                      The private key is needed to decrypt or sign.
                    </div>
                  </div>
                  <div className="self-stretch flex items-center justify-start gap-[9px] max-w-full">
                    <div className="w-[12px] h-[12px] min-w-[20px]">
                      <img
                        src="/circle-icon.svg"
                        alt=""
                        className="w-[12px] h-[12px] relative z-[1]"
                      />
                    </div>
                    <div className="text-white font-normal md:text-[20px] text-[13px] md:leading-[27.62px] leading-[20.62px]">
                      The public key can be used by others to verify your
                      identity or encrypt to you.
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[724px] text-[13px] md:text-[20px] h-7 relative inline-block max-w-full z-[1] text-white mt-[5px] md:mt-[17px]">
                You can learn more about Neuro.RSA
              </div>
            </div>
            {!isAuthenticated && (
              <div className="w-[438px] flex xs:gap-[14px] sm:gap-[14px]  md:gap-[22px] lg:gap-[22px] max-w-full text-white ">
                <Link
                  to="/login"
                  className="p-[5px]text-white no-underline xs:text-[12px] sm:text-[12px] md:text-[20px] lg:text-[20px]  cursor-pointer bg-[#1B3D4F] flex  w-[100%] xs:max-w-[120px] sm:max-w-[134px] md:max-w-[208px] lg:max-w-[208px] xs:h-[48px] sm:h-[52px] md:h-[82px] lg:h-[82px] justify-center items-center xs:gap-[9px] sm:gap-[9px]  md:gap-[18px] lg:gap-[18px] border-[1px] border-[#345360]"
                >
                  <img
                    className="xs:h-[21px] sm:h-[21px] md:h-[37px] lg:h-[37px] xs:w-[21px] sm:w-[21px] md:w-[37px] lg:w-[37px] z-[1]"
                    alt=""
                    src="/gis_map-lock.svg"
                  />
                  Login
                </Link>
                <Link
                  to="/register-seed"
                  className="p-[5px] text-white no-underline xs:text-[12px] sm:text-[12px] md:text-[20px] lg:text-[20px] cursor-pointer bg-[#1B3D4F] flex w-[100%] xs:max-w-[120px] sm:max-w-[134px] md:max-w-[208px] lg:max-w-[208px] xs:h-[48px] sm:h-[52px] md:h-[82px] lg:h-[82px] justify-center items-center xs:gap-[9px] sm:gap-[9px]  md:gap-[18px] lg:gap-[18px] border-[1px] border-[#345360]"
                >
                  <img
                    className="xs:h-[21px] sm:h-[21px] md:h-[37px] lg:h-[37px] xs:w-[21px] sm:w-[21px] md:w-[37px] lg:w-[37px]  z-[1]"
                    alt=""
                    src="/gis-register.svg"
                  />
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="xs:w-[100%] md:w-[971px] lg:w-[971px] flex flex-col items-start justify-start pt-[41px] px-0 pb-0 box-border max-w-full xs:ml-[-100%] md:ml-[-618px] lg:ml-[-618px]">
        {/* <div className="self-stretch h-[calc(100vh-0vh)] relative"> */}
          <img
            className="absolute xs:right-[0] md:left-[auto] lg:left-[auto] md:right-0 lg:right-[0px] xs:bottom-[0px] md:top-[50%] lg:top-[50%] transform md:-translate-y-1/2 lg:-translate-y-1/2  w-full xs:max-w-[310px] md:max-w-[549.8px] lg:max-w-[549.8px] xs:h-[330px] md:h-[600px] lg:h-[600px] z-[2]"
            loading="lazy"
            alt=""
            src="home-group.png"
          />
         
        {/* </div> */}
      </div>
    </section>
  );
};

Home.propTypes = {
  className: PropTypes.string,
};

export default Home;
