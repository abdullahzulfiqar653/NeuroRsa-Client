import React from "react";
import { Link } from "react-router-dom";

function PriceLimit() {
  return (
    <section className="w-full overflow-y-scroll fixed inset-0 m-[19px] bg-[#031A30CC] flex flex-col gap-[65px] rounded-[48px] p-[44px] z-20">
      <section className="w-full flex gap-[30px] sm:justify-between sm:items-center flex-col sm:flex-row">
        <section className="w-full flex flex-col gap-[12px] justify-center">
          <h3 className="text-[#93A5AE] text-[22px] leading-[24px] font-[400] text-center">
            Increase File Limit
          </h3>
          <h2 className="text-white text-[48px] leading-[48px] font-[400] text-center">
            Pricing Plans
          </h2>
        </section>
      </section>
      <section className="bg-[#FFFFFF0D] rounded-[24px] p-[60px] flex gap-[8px] justify-center items-center flex-wrap">
        <section className="flex gap-[32px] flex-wrap max-w-[904px]">
          {[1, 2, 3, 4, 5, 6].map((value, index) => (
            <section
              key={index}
              className="w-full flex-1 sm:flex-1 sm:w-[200px] md:flex-auto md:w-[280px] bg-transparent border-[1px] border-[#2CB1EF] rounded-[24px] flex flex-col gap-[16px] p-[24px]"
            >
              <section className="flex flex-col gap-[36px]">
                <h5 className="text-white text-[18px] leading-[24px] font-[400]">
                  Professional
                </h5>
                <h2 className="text-[#2CB1EF] text-[48px] leading-[48px] font-[400]">
                  $40
                </h2>
              </section>
              <section className="flex gap-[4px]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.4902 2.22957L5.50016 4.10957C4.35016 4.53957 3.41016 5.89957 3.41016 7.11957V14.5496C3.41016 15.7296 4.19016 17.2796 5.14016 17.9896L9.44016 21.1996C10.8502 22.2596 13.1702 22.2596 14.5802 21.1996L18.8802 17.9896C19.8302 17.2796 20.6102 15.7296 20.6102 14.5496V7.11957C20.6102 5.88957 19.6702 4.52957 18.5202 4.09957L13.5302 2.22957C12.6802 1.91957 11.3202 1.91957 10.4902 2.22957Z"
                    stroke="#2CB1EF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9.0498 11.8697L10.6598 13.4797L14.9598 9.17969"
                    stroke="#2CB1EF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <p className="text-white text-[18px] leading-[24px] font-[400]">
                  For 40Mb secret file size
                </p>
              </section>
            </section>
          ))}
        </section>
      </section>
    </section>
  );
}

export default PriceLimit;
