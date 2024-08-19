import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="w-full min-h-dvh flex items-center">
      <section className="container flex flex-col gap-[64px]">
        <section className="flex flex-col gap-[32px]">
          <h2 className="text-[#93A5AE] text-[64px] font-[400] leading-[64px]">
            Welcome to
          </h2>
          <h1 className="text-white text-[42px] sm:text-[64px] lg:text-[128px] font-[400] leading-[42px] sm:leading-[64px] lg:leading-[128px]">
            Quantumography
          </h1>
          <div>
            <p className="text-[#93A5AE] text-[16px] font-[400] leading-[24px]">
              Welcome to Quantumography, a revolutionary encryption project
              merging security and user experience.{" "}
            </p>
            <p className="text-[#93A5AE] text-[16px] font-[400] leading-[24px]">
              Users can seamlessly hide files within images, customising the
              degree of deformation for optimal security.
              <Link className="text-[#2CB1EF]"> How it works?</Link>
            </p>
          </div>
        </section>
        <section className="flex gap-[32px] flex-wrap">
          <section className="cursor-pointer flex-1 w-full bg-[#041F39] p-[32px] rounded-[40px] flex gap-[32px] items-center">
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
                d="M44.0006 56.4831C46.1011 56.4831 47.8039 54.7803 47.8039 52.6798C47.8039 50.5793 46.1011 48.8765 44.0006 48.8765C41.9001 48.8765 40.1973 50.5793 40.1973 52.6798C40.1973 54.7803 41.9001 56.4831 44.0006 56.4831Z"
                fill="#2CB1EF"
              />
              <path
                d="M54.8493 38.0269H33.1493C23.5827 38.0269 20.666 40.9435 20.666 50.5102V54.8502C20.666 64.4169 23.5827 67.3335 33.1493 67.3335H54.8493C64.416 67.3335 67.3327 64.4169 67.3327 54.8502V50.5102C67.3327 40.9435 64.416 38.0269 54.8493 38.0269ZM43.9993 59.7269C40.1027 59.7269 36.9527 56.5535 36.9527 52.6802C36.9527 48.8069 40.1027 45.6335 43.9993 45.6335C47.896 45.6335 51.046 48.8069 51.046 52.6802C51.046 56.5535 47.896 59.7269 43.9993 59.7269Z"
                fill="#2CB1EF"
              />
              <path
                opacity="0.4"
                d="M32.6124 38.0498V35.3198C32.6124 28.4832 34.549 23.9332 43.999 23.9332C53.449 23.9332 55.3857 28.4832 55.3857 35.3198V38.0498C56.5757 38.0732 57.649 38.1198 58.6524 38.2598V35.3198C58.6524 29.0198 57.1357 20.6665 43.999 20.6665C30.8624 20.6665 29.3457 29.0198 29.3457 35.3198V38.2365C30.3257 38.1198 31.4224 38.0498 32.6124 38.0498Z"
                fill="#2CB1EF"
              />
            </svg>
            <div className="flex flex-col gap-[4px]">
              <h3 className="text-white text-[36px] font-[400] leading-[48px]">
                Encrypt File
              </h3>
              <h5 className="text-[#93A5AE] text-[16px] font-[400] leading-[24px]">
                Hide in Plain Sight: Securely Embed and Send Your Secrets with
                Image Encryption
              </h5>
            </div>
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 12C0 5.37258 5.37258 0 12 0H36C42.6274 0 48 5.37258 48 12V36C48 42.6274 42.6274 48 36 48H12C5.37258 48 0 42.6274 0 36V12Z"
                fill="#2CB1EF"
              />
              <path
                opacity="0.4"
                d="M20 17.5998V30.3865C20 34.6665 22.6667 37.3332 26.9333 37.3332H30.3867C34.6533 37.3332 37.32 34.6665 37.32 30.3998V17.5998C37.3333 13.3332 34.6667 10.6665 30.4 10.6665H26.9333C22.6667 10.6665 20 13.3332 20 17.5998Z"
                fill="#032230"
              />
              <path
                d="M24.5737 18.8269L29.0403 23.2935C29.427 23.6802 29.427 24.3202 29.0403 24.7069L24.5737 29.1735C24.187 29.5602 23.547 29.5602 23.1603 29.1735C22.7737 28.7869 22.7737 28.1469 23.1603 27.7602L25.9203 25.0002H11.667C11.1203 25.0002 10.667 24.5469 10.667 24.0002C10.667 23.4535 11.1203 23.0002 11.667 23.0002H25.9203L23.1603 20.2402C22.9603 20.0402 22.867 19.7869 22.867 19.5335C22.867 19.2802 22.9603 19.0269 23.1603 18.8269C23.547 18.4269 24.1737 18.4269 24.5737 18.8269Z"
                fill="#032230"
              />
            </svg>
          </section>
          <section className="cursor-pointer flex-1 w-full bg-[#041F39] p-[32px] rounded-[40px] flex gap-[32px] items-center">
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
                d="M43.212 39.1349V36.2345C43.212 28.9711 41.3617 24.1371 32.333 24.1371C22.6801 24.1371 21.454 29.3677 21.454 33.929C21.454 34.8958 20.7629 35.6643 19.8935 35.6643C19.0241 35.6643 18.333 34.8958 18.333 33.929C18.333 25.1287 23.0368 20.6665 32.333 20.6665C44.884 20.6665 46.333 29.5412 46.333 36.2345V39.3332C45.3967 39.2092 44.3489 39.1349 43.212 39.1349Z"
                fill="#2CB1EF"
              />
            </svg>

            <div className="flex flex-col gap-[4px]">
              <h3 className="text-white text-[36px] font-[400] leading-[48px]">
                Decode File
              </h3>
              <h5 className="text-[#93A5AE] text-[16px] font-[400] leading-[24px]">
                Reveal the Invisible: Uncover Hidden Files with Image-Based
                Decryption
              </h5>
            </div>
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 12C0 5.37258 5.37258 0 12 0H36C42.6274 0 48 5.37258 48 12V36C48 42.6274 42.6274 48 36 48H12C5.37258 48 0 42.6274 0 36V12Z"
                fill="#2CB1EF"
              />
              <path
                opacity="0.4"
                d="M20 17.5998V30.3865C20 34.6665 22.6667 37.3332 26.9333 37.3332H30.3867C34.6533 37.3332 37.32 34.6665 37.32 30.3998V17.5998C37.3333 13.3332 34.6667 10.6665 30.4 10.6665H26.9333C22.6667 10.6665 20 13.3332 20 17.5998Z"
                fill="#032230"
              />
              <path
                d="M24.5737 18.8269L29.0403 23.2935C29.427 23.6802 29.427 24.3202 29.0403 24.7069L24.5737 29.1735C24.187 29.5602 23.547 29.5602 23.1603 29.1735C22.7737 28.7869 22.7737 28.1469 23.1603 27.7602L25.9203 25.0002H11.667C11.1203 25.0002 10.667 24.5469 10.667 24.0002C10.667 23.4535 11.1203 23.0002 11.667 23.0002H25.9203L23.1603 20.2402C22.9603 20.0402 22.867 19.7869 22.867 19.5335C22.867 19.2802 22.9603 19.0269 23.1603 18.8269C23.547 18.4269 24.1737 18.4269 24.5737 18.8269Z"
                fill="#032230"
              />
            </svg>
          </section>
        </section>
      </section>
    </section>
  );
}

export default Home;
