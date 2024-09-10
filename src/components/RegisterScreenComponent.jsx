import React, { useState } from "react";
import PropTypes from "prop-types";
import ImportantNotice from "./ImportantNote";
import YourSeed from "./YourSeed";
import { Link } from "react-router-dom";

import useGenerateSeeds from "../hooks/useGenerateSeeds";

const GroupComponent = ({ className = "" }) => {
  const { data } = useGenerateSeeds();
  const [showSeed, setShowSeed] = useState(false);
  const [seedsData, setSeedsData] = useState(false);

  const handleShowSeed = () => {
    setSeedsData(data.pass_phrase);
    setShowSeed(true);
  };

  return (
    <div
      className={`w-[458px] sm:w-[458px] md:w-[458px] lg:w-[458px] rounded-[32px] [background:linear-gradient(180deg,_#1f729d,_#0b2837)] border-darkslategray-100 border-[1px] border-solid box-border flex flex-col items-end justify-start xs:pt-[25px] pt-[67px] pb-3.5 pl-[18px] pr-[19px] max-w-full z-[4] text-left text-9xl text-white font-neue-plak mq450:gap-[34px] mq725:pt-11 mq725:pb-5 mq725:box-border ${className}`}
    >
      <div className="w-[458px]  h-[732px] relative rounded-13xl [background:linear-gradient(180deg,_#1f729d,_#0b2837)] border-darkslategray-100 border-[1px] border-solid box-border hidden max-w-full" />
      <div className="self-stretch flex flex-row items-start justify-end pt-0 pb-2 pl-10 pr-[38px] box-border max-w-full md:mb-[24px] mb-[0px]">
        <div className="block  flex-1 flex flex-col items-start justify-start gap-[16px] max-w-full">
          <div className="self-stretch flex flex-row  py-0 items-center justify-center mq450:pl-5 mq450:pr-5 mq450:box-border">
            <div className="flex flex-row items-center justify-center gap-3 mq450:flex-wrap">
              <img
                className="md:h-[31.6px] md:w-[31px] h-[26.6px] w-[26px] relative z-[1]"
                loading="lazy"
                alt=""
                src="/union.svg"
              />
              <h1 className="m-0 relative text-[25px] md:text-[30px] text-white font-medium md:font-normal inline-block z-[1] mq450:text-3xl">
                neuro.RSA
              </h1>
            </div>
          </div>
        </div>
      </div>
      <img
        src="/Group-1261153238.svg"
        alt="Group 1"
        width={143}
        height={143}
        className="md:w-[143px] md:h-[143px] w-[100px] h-[100px] mx-[auto]"
      />
      <div className="w-full">
        {!showSeed ? (
          <ImportantNotice onShowSeed={handleShowSeed} />
        ) : (
          <YourSeed seedsData={seedsData} />
        )}
      </div>
      <div className="w-full flex flex-row items-center justify-center py-0 text-xs text-gainsboro-200 mb-8 md:mb-0">
        <div className="flex flex-row items-start justify-start gap-[9px] shrink-0">
          <div className="relative leading-[32px] z-[1]">
            Already have account?
          </div>
          <div className="relative">
            <Link
              to="/login"
              className="leading-[32px] text-mediumturquoise inline-block min-w-[50px] z-[1] no-underline "
            >
              Login here
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden md:block self-stretch flex flex-row items-start justify-center pb-0 pt-[59px] pl-px pr-0 text-center text-sm text-gray-200">
        <div className="w-full relative leading-[22px] inline-block z-[3]">
          Produced by: Neuronus Computing
        </div>
      </div>
    </div>
  );
};

GroupComponent.propTypes = {
  className: PropTypes.string,
};

export default GroupComponent;
