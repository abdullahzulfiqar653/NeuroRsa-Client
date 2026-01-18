import React from "react";
import Header from "../components/Header";

function PrivacyPolicy() {
  return (
    <div>
      {" "}
      <div className={`bg-[#0f2e3f] lg:h-[100vh]`}>
        <div className="bg-[#0B2837] w-full items-center">
          <Header />
          <div className="flex flex-col relative justify-center items-center text-center  bg-[#0f2e3f] w-full h-full">
            <div className="text-[#E5E5E5B8] relative z-10 flex flex-col justify-start text-start items-start px-[16px] py-5 sm:px-24 sm:py-16">
              <h1 className="text-[#f7f7f7] text-[22px] leading-[30.73px]">
                Privacy Policy
              </h1>
              <p className="leading-[19.08px] text-[13px] sm:text-[14px] text-[#E5E5E5B8]">
                NeuroRSA is designed to provide secure and private communication
                using RSA encryption. We respect your privacy and do not
                collect, store, or share any personal information.
              </p>
              <div className="w-full h-full flex flex-col text-[13px] sm:text-[16px] text-start items-start bg-[#0B2837] px-6 py-4 mt-9">
                <p className="text-white text-[16px] sm:text-[18px] mb-3">
                  1. No Data Collection
                </p>
                <p>
                  NeuroRSA does not collect any personal data, usage data,
                  device identifiers, IP addresses, or any information that can
                  identify you.
                </p>
                <p className="mt-2">
                  All text encryption and decryption processes occur locally on
                  your device.
                </p>
                <p className="mt-2">
                  We never send your data to external servers.
                </p>
              </div>
              <div className="w-full h-full flex flex-col text-[13px] sm:text-[16px] text-start items-start bg-[#0B2837] px-6 py-4 mt-5">
                <p className="text-white text-[16px] sm:text-[18px] mb-3">
                  2. No Accounts or Identity
                </p>
                <p>NeuroRSA does not require:</p>
                <ul className="list-disc list-inside mt-2 ml-2">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Login account</li>
                  <li>Any personal identifiers</li>
                </ul>
                <p className="mt-2">
                  You remain fully anonymous while using the app.
                </p>
              </div>
              <div className="w-full h-full flex flex-col text-[13px] sm:text-[16px] text-start items-start bg-[#0B2837] px-6 py-4 mt-5">
                <p className="text-white text-[16px] sm:text-[18px] mb-3">
                  3. No Storage of Messages or Keys
                </p>
                <p>
                  Your encryption keys and encrypted messages are stored only on
                  your device, under your control.
                </p>
                <p className="mt-2">We do not have access to them.</p>
                <p className="mt-2">
                  If you uninstall the app or reset your device, your data will
                  be permanently removed.
                </p>
              </div>
              <div className="w-full h-full flex flex-col text-[13px] sm:text-[16px] text-start items-start bg-[#0B2837] px-6 py-4 mt-5">
                <p className="text-white text-[16px] sm:text-[18px] mb-3">
                  4. No Third-Party Services
                </p>
                <p>NeuroRSA does not use:</p>
                <ul className="list-disc list-inside mt-2 ml-2">
                  <li>Analytics services</li>
                  <li>Cloud storage</li>
                  <li>Advertising systems</li>
                  <li>Tracking frameworks</li>
                  <li>Cookies</li>
                </ul>
                <p className="mt-2">
                  We do not share any data with third parties.
                </p>
              </div>
              <div className="w-full h-full flex flex-col text-[13px] sm:text-[16px] text-start items-start bg-[#0B2837] px-6 py-4 mt-5">
                <p className="text-white text-[16px] sm:text-[18px] mb-3">
                  5. Security
                </p>
                <p>Encryption is performed using RSA protocol.</p>
                <p className="mt-2">
                  The privacy and confidentiality of your messages depend on the
                  security of your private key, which remains solely on your
                  device.
                </p>
              </div>
              <div className="w-full h-full flex flex-col text-[13px] sm:text-[16px] text-start items-start bg-[#0B2837] px-6 py-4 mt-5">
                <p className="text-white text-[16px] sm:text-[18px] mb-3">
                  6. Contact
                </p>
                <p>
                  If you have any questions regarding this Privacy Policy, you
                  may contact us at:
                </p>
                <p className="mt-2">
                  Email:{" "}
                  <a
                    href="mailto:contact@neuronus.net"
                    className="text-white hover:underline"
                  >
                    contact@neuronus.net
                  </a>
                </p>
              </div>
            </div>
            <img
              src="/InfoBg.svg"
              className="absolute hidden sm:block bottom-[10px] z-0"
            />
            <img
              src="/InfoBgMobile.svg"
              className="absolute sm:hidden  bottom-[10px] right-4 z-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
