import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className="bg-[#041F39B2] min-h-[152px] p-[32px] rounded-[40px_40px_0_0] flex-col sm:flex-row flex gap-[48px]">
      <section className="flex gap-[32px]">
        <svg
          width="88"
          height="88"
          viewBox="0 0 88 88"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 24C0 10.7452 10.7452 0 24 0H64C77.2548 0 88 10.7452 88 24V64C88 77.2548 77.2548 88 64 88H24C10.7452 88 0 77.2548 0 64V24Z"
            fill="#07345F"
          />
          <path
            opacity="0.4"
            d="M43.9996 56.4831C46.1001 56.4831 47.803 54.7803 47.803 52.6798C47.803 50.5793 46.1001 48.8765 43.9996 48.8765C41.8991 48.8765 40.1963 50.5793 40.1963 52.6798C40.1963 54.7803 41.8991 56.4831 43.9996 56.4831Z"
            fill="#2CB1EF"
          />
          <path
            d="M54.8503 38.0269H33.1503C23.5837 38.0269 20.667 40.9435 20.667 50.5102V54.8502C20.667 64.4169 23.5837 67.3335 33.1503 67.3335H54.8503C64.417 67.3335 67.3337 64.4169 67.3337 54.8502V50.5102C67.3337 40.9435 64.417 38.0269 54.8503 38.0269ZM44.0003 59.7269C40.1037 59.7269 36.9537 56.5535 36.9537 52.6802C36.9537 48.8069 40.1037 45.6335 44.0003 45.6335C47.897 45.6335 51.047 48.8069 51.047 52.6802C51.047 56.5535 47.897 59.7269 44.0003 59.7269Z"
            fill="#2CB1EF"
          />
          <path
            opacity="0.4"
            d="M32.6133 38.0498V35.3198C32.6133 28.4832 34.55 23.9332 44 23.9332C53.45 23.9332 55.3867 28.4832 55.3867 35.3198V38.0498C56.5767 38.0732 57.65 38.1198 58.6533 38.2598V35.3198C58.6533 29.0198 57.1367 20.6665 44 20.6665C30.8633 20.6665 29.3467 29.0198 29.3467 35.3198V38.2365C30.3267 38.1198 31.4233 38.0498 32.6133 38.0498Z"
            fill="#2CB1EF"
          />
        </svg>
        <div className="flex flex-col gap-[4px]">
          <h2 className="text-white text-[36px] leading-[48px] font-[400]">
            Encrypt File
          </h2>
          <p className="text-[#93A5AE] text-[16px] leading-[24px] font-[400]">
            Current secret file limit: 2Mb.{" "}
            <Link className="text-[#2CB1EF] text-[18px]">Buy More</Link>
          </p>
        </div>
      </section>
      <section className="flex-1 flex gap-[4px] items-center">
        {[true, false, false, false].map((value, index) => (
          <div
            key={index}
            className="flex-1 flex flex-col gap-[4px] items-center"
          >
            <div
              className={`w-full min-h-[4px] rounded-[100px] ${
                value ? "bg-[#2CB1EF]" : "bg-[#036C9B]"
              }`}
            ></div>
            <div className="w-full flex gap-[4px] items-center">
              {value ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 0.25C3.71978 0.25 0.25 3.71978 0.25 8C0.25 12.2802 3.71978 15.75 8 15.75C12.2802 15.75 15.75 12.2802 15.75 8C15.75 3.71978 12.2802 0.25 8 0.25ZM10.5 8C10.5 9.3785 9.3785 10.5 8 10.5C6.6215 10.5 5.5 9.3785 5.5 8C5.5 6.6215 6.6215 5.5 8 5.5C9.3785 5.5 10.5 6.6215 10.5 8Z"
                    fill="#2CB1EF"
                  />
                </svg>
              ) : (
                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.75 0.25C4.46875 0.25 1 3.71875 1 8C1 12.2812 4.46875 15.75 8.75 15.75C13.0312 15.75 16.5 12.2812 16.5 8C16.5 3.71875 13.0312 0.25 8.75 0.25ZM8.75 14.25C5.29688 14.25 2.5 11.4531 2.5 8C2.5 4.54688 5.29688 1.75 8.75 1.75C12.2031 1.75 15 4.54688 15 8C15 11.4531 12.2031 14.25 8.75 14.25Z"
                    fill="#036C9B"
                  />
                </svg>
              )}
              <span className="text-[14px] font-[500] leading-[20px] text-[#036C9B]">
                Upload Secret File
              </span>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
};

export default Footer;
