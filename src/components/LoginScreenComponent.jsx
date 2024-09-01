import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TagsInput } from 'react-tag-input-component';
import { Link, useNavigate } from 'react-router-dom';
import useCreateToken from '../hooks/useCreateToken';
import Words from "../data/Seeds"
const GroupComponent = ({ className = '' }) => {
  const navigate = useNavigate();
  const { mutate } = useCreateToken();
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [seedsValue, setSeedsValue] = useState([]);

  const handleSubmit = () => {
    mutate(seedsValue.join(" "), {
      onSuccess: () => {
        login();
        navigate("/main-home");
      },
      onError: (error) => {
        setError("Login failed. Please check your credentials.", error);
      },
    });
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "Enter":
        const filteredSuggestions = Words.filter((word) =>
          word.toLowerCase().startsWith(inputValue.toLowerCase())
        );
        setSeedsValue([...seedsValue, filteredSuggestions[0]]);
        setInputValue("");
        setSuggestions([]);
        break;
      case "Backspace":
        if (inputValue === "") {
          setSeedsValue(seedsValue.slice(0, seedsValue.length - 1));
        }
        break;
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.trim();
    setInputValue(value);

    if (value.split(" ").length > 1) {
      setSeedsValue(value.split(" "));
      setInputValue("");
    }
    if (value.length > 0) {
      const filteredSuggestions = Words.filter((word) =>
        word.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue("");
    setSeedsValue([...seedsValue, suggestion]);
    setSuggestions([]);
  };

  const removeSeed = (indexToRemove) => {
    setSeedsValue(seedsValue.filter((_, index) => index !== indexToRemove));
  };
  return (
    <div
      className={`w-[458px] sm:w-[458px] md:w-[458px] lg:w-[458px]   rounded-[32px] [background:linear-gradient(180deg,_#1f729d,_#0b2837)] border-darkslategray-100 border-[1px] border-solid box-border flex flex-col items-end justify-start pt-[67px] pb-3.5 pl-[18px] pr-[19px] gap-[68px] max-w-full z-[2] text-left text-9xl text-white font-neue-plak mq450:gap-[34px] mq725:pt-11 mq725:pb-5 mq725:box-border ${className}`}
    >
      <div className='w-[458px]  h-[732px] relative rounded-[32px] [background:linear-gradient(180deg,_#1f729d,_#0b2837)] border-darkslategray-100 border-[1px] border-solid box-border hidden max-w-full' />
      <div className='self-stretch flex flex-row items-start justify-end pt-0 pb-2 pl-10 pr-[38px] box-border max-w-full'>
        <div className='flex-1 flex flex-col items-start justify-start gap-[23px] max-w-full'>
          <div className='self-stretch flex flex-row  py-0 items-center justify-center mq450:pl-5 mq450:pr-5 mq450:box-border'>
            <div className='flex flex-row items-center justify-center gap-3 mq450:flex-wrap'>
              <img className='h-[31.6px] w-[31px] relative z-[1]' loading='lazy' alt='' src='/union.svg' />
              <h1 className='m-0 relative  text-white text-[30px] inline-block z-[1] mq450:text-3xl'>neuro.RSA</h1>
            </div>
          </div>
          <h3 className='m-0 self-stretch relative text-lg leading-[22px] font-normal font-[inherit] text-center z-[1]'>
            Welcome back! Login to your account
          </h3>
        </div>
      </div>
      <div className='self-stretch flex flex-col items-start justify-start gap-[5px] text-mini-1 font-montserrat'>
        <div className='flex flex-row items-start justify-start py-0 px-px'>
          <div className='text-[14px] relative leading-[22px] font-medium inline-block min-w-[66px] z-[1] text-[14px]'>
            Key Seed
          </div>
        </div>
        <div className='bg-darkslategray-200 flex gap-[8px] py-[15px] px-[19px] flex-wrap w-full rounded-borderradius-large box-border overflow-y-auto overflow-x-hidden custom-tab-box'>
        {seedsValue?.map((seed, index) => (
                <span
                  key={index}
                  className="group cursor-pointer dm-sans border-mediumturquoise border-[1px] px-[8px] text-[16px] leading-[27px] font-[400] text-white rounded-[6px]"
                >
                  {seed}
                  <span
                    className="cursor-pointer ml-1 text-[#ab1c1c] text-xl hidden group-hover:inline"
                    onClick={() => removeSeed(index)}
                  >
                    x
                  </span>
                </span>
              ))}
              {seedsValue.length < 16 && (
                <input
                  className="dm-sans outline-none bg-darkslategray-200 placeholder:text-[#DFDFDF36] text-white text-[16px] leading-[32px] font-[400]"
                  placeholder="Enter your key seed..."
                  value={inputValue}
                  onChange={(e) => handleInputChange(e)}
                  onKeyDown={handleKeyDown}
                />
              )}
        </div>
         <div className="flex gap-[8px] mt-[11px] flex-wrap">
              {suggestions.map((seed, index) => (
                <span
                  onClick={() => handleSuggestionClick(seed)}
                  key={index}
                  className="dm-sans cursor-pointer border-mediumturquoise border-[1px] px-[8px] text-[16px] leading-[27px] font-[400] text-white rounded-[6px]"
                >
                  {seed}
                </span>
              ))}
            </div>
      </div>
      <div className='self-stretch flex flex-row items-start justify-center pt-0 px-0 pb-[59px] text-center text-base font-montserrat'>
        <div className='w-[223px] flex flex-col items-start justify-start gap-[10.8px]'>
          {/* <Link to='/VerifyLoginScreen' className='text-white no-underline w-full'> */}
            <div onClick={handleSubmit} className='cursor-pointer self-stretch rounded-[4.38px] bg-mediumturquoise flex flex-row items-start justify-start pt-3.5 pb-[13.9px] pl-[50px] pr-[49px] shrink-0 z-[1]'>
              <div className='h-[47.2px] w-[223px] relative rounded-[4.38px] bg-mediumturquoise hidden' />
              <div className='flex-1 relative z-[1]'>Next</div>
            </div>
          {/* </Link> */}
          <div className='flex flex-row items-start justify-start py-0 px-[15px] text-xs text-gainsboro-200'>
            <div className='flex flex-row items-start justify-start gap-[9px] shrink-0'>
              <div className='relative leading-[32px] z-[1]'>Don’t have your seed?</div>
              <div className='relative'>
                <Link
                  to='/register-seed'
                  className='leading-[32px] text-mediumturquoise inline-block min-w-[50px] z-[1] no-underline'
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='self-stretch flex flex-row items-start justify-center py-0 pl-px pr-0 text-center text-sm text-gray-200'>
        <div className='w-full relative leading-[22px] inline-block z-[3]'>Produced by: Neuronus Computing</div>
      </div>
    </div>
  );
};

GroupComponent.propTypes = {
  className: PropTypes.string,
};

export default GroupComponent;
