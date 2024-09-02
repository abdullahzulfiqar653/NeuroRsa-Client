import React, { useState } from "react";
import Header from "../components/Header";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Formik, Form, Field } from "formik";
import { useLocation } from "react-router-dom";
const KeyDisplay = () => {
  const location = useLocation();
  const { keyType, keyText } = location.state || {};
  const [copied, setCopied] = useState(false);
  const [text, setText] = useState(keyText || "");

  function handleHideKey() {
    setText("");
    navigator.clipboard.writeText("");
    setCopied(false);
  }

  function sharePublicKey() {
    navigator.clipboard.writeText(text);
    //  Add Popup message of "Public Key copied to clipboard!"
  }
  return (
    <div>
      <div className="bg-[#0f2e3f] h-[100vh]">
        <div className="bg-[#0B2837] w-full items-center">
          <Header />
        </div>
        <main>
          <div className=" w-full">
            <div className="overflow-y-auto  bg-[#0f2e3f] self-stretch border-[#1B3D4F] border-[1px] border-solid box-border flex flex-col items-start justify-start  pb-[18px] pl-3 pr-[11px] gap-[17px] max-w-full mq800:pt-[23px] mq800:pb-5 mq800:box-border">
              <div className="w-full py-0 px-2.5 box-border">
                <div className="flex justify-between gap-[10px] bg-[#1B3D4F] p-[15px]">
                  <p className="text-[18px] leading-[30px] font-normal text-white">
                    ----- BEGIN PGP {keyType} KEY BLOCK -----
                  </p>
                  <div className="flex gap-[10px] items-center">
                    {copied && (
                      <span style={{ color: "white", fontSize: "12px" }}>
                        Copied!
                      </span>
                    )}
                    <CopyToClipboard text={text} onCopy={() => setCopied(true)}>
                      <img
                        src="/copy-icon.svg"
                        alt="copy-icon"
                        className="cursor-pointer"
                      />
                    </CopyToClipboard>
                  </div>
                </div>

                <Formik>
                  <Form>
                    <Field
                      as="textarea"
                      id="textarea"
                      name="textarea"
                      rows="20"
                      value={text}
                      readOnly
                      className="w-full text-[#fff] bg-[#0B2837] border-none focus:outline-none focus:ring-0 border-[1px] border-[#1B3D4F]"
                    />
                  </Form>
                </Formik>
              </div>
            </div>
            <div className="items-center flex flex-row justify-start gap-5 px-[32px] bg-[#0f2e3f]">
              <CopyToClipboard text={text} onCopy={() => setCopied(true)}>
                <button className="w-[100%] max-w-[151px] h-[47px] items-center cursor-pointer border-[#57CBCC] border-[1px] border-solid bg-transparent flex-1 rounded-[4.38px] flex  justify-center  text-[#57CBCC]">
                  Copy
                </button>
              </CopyToClipboard>
              <button
                onClick={handleHideKey}
                className="md:text-[16px] text-[14px] font-normal leading-[19px] text-white w-[100%] max-w-[151px] h-[47px] items-center cursor-pointer border-[#57CBCC] border-[1px] border-solid  bg-[#57CBCC] hover:bg-[#47b0b2] flex-1 rounded-[4.38px] flex  justify-center"
              >
                Hide
              </button>
              {keyType === "Public" && (
                <button
                  onClick={sharePublicKey}
                  className="w-[100%] max-w-[151px] h-[47px] items-center cursor-pointer border-darkslategray-100 border-[1px] border-solid  bg-mediumturquoise hover:bg-[#47b0b2]  flex-1 rounded-[4.38px] flex  justify-center"
                >
                  <div className="md:text-[16px] text-[14px] whitespace-nowrap font-normal leading-[19px] text-white">
                    {" "}
                    Share Public Key
                  </div>
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default KeyDisplay;
