import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ThreeCircles, ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import { useAuth } from "../AuthContext";
import useCreateToken from "../hooks/useCreateToken";
import { TfiReload } from "react-icons/tfi";
import useRegisterSeeds from "../hooks/useRegisterSeeds";
import {
  deriveSeedsHash,
  generateSeedPhrase,
  performSignup,
  handleSuccessfulLogin,
} from "../utils/cryptoOperations";

const GroupComponent = () => {
  const { signup } = useAuth();
  const retryAttempt = useRef(0);
  const { mutate: createToken, isPending: isCreatingToken } = useCreateToken();
  const { mutate: registerSeeds, isPending: isRegistering } =
    useRegisterSeeds();
  const [copytext, setCopyText] = useState(false);
  const [seedsData, setSeedsData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [triggerReload, setTriggerReload] = useState(0);

  // Effect to generate seed phrase and crypto payload

  useEffect(() => {
    async function registerCryptoData() {
      setIsGenerating(true);
      try {
        const seedPhrase = await generateSeedPhrase();

        const cryptoData = await performSignup(seedPhrase);
        const payload = {
          enc_salt: cryptoData.encSalt,
          encrypted_private_key: cryptoData.encryptedPrivateKey,
          encrypted_private_key_iv: cryptoData.encryptedPrivateKeyIV,
          encrypted_private_key_tag: cryptoData.encryptedPrivateKeyTag,
          pass_phrase: cryptoData.loginHash,
          public_key: cryptoData.publicKey,
        };

        registerSeeds(payload, {
          onSuccess: () => {
            setSeedsData(seedPhrase);
            setIsGenerating(false);
          },
          onError: (error) => {
            const errorMessage =
              error.response.data[0] || "Registration failed.Please try again.";
            if (retryAttempt.current === 0) {
              retryAttempt.current = 1;
              registerCryptoData();
            } else {
              toast.error(errorMessage);
              setIsGenerating(false);
            }
          },
        });
      } catch (error) {
        console.error("Crypto error:", error);
        if (retryAttempt.current === 0) {
          retryAttempt.current = 1;
          registerCryptoData();
        } else {
          toast.error("Failed to generate credentials. Please refresh.");
          setIsGenerating(false);
        }
      }
    }

    registerCryptoData();
  }, [triggerReload]);

  const copyToClipBoard = () => {
    setCopyText(true);
    navigator.clipboard.writeText(seedsData);
    setTimeout(() => {
      setCopyText(false);
    }, [700]);
  };

  const handleLogin = async () => {
    const seedsHash = await deriveSeedsHash(seedsData);
    const payload = {
      pass_phrase: seedsHash.loginHash,
    };
    createToken(payload, {
      onSuccess: async (response) => {
        await handleSuccessfulLogin(response, seedsData);
        toast.success("Logged In Successfully.");
        signup();
      },
      onError: (error) => {
        toast.error("Login failed. Please try logging in manually.",);
      },
    });
  };

  return (
    <>
      <h2 className="text-white text-[22px] leading-[64px] font-normal text-center w-full mb-[5px] mt-[0px]">
        Your Seed{" "}
      </h2>
      <div className="self-stretch flex flex-col items-start justify-start gap-[5px] text-mini-1 font-montserrat">
        <div className="flex flex-row w-full items-center justify-between py-0 px-px">
          <div
            className={`text-[12px] justify-center items-center relative leading-[22px] font-medium flex  z-[1] ${
              isGenerating || isRegistering ? "min-w-[106px]" : "min-w-[66px]"
            }`}
          >
            Key Seed{" "}
            {(isGenerating || isRegistering) && (
              <ThreeCircles
                color="white"
                height={15}
                width={35}
                ariaLabel="loading"
                wrapperStyle={{ marginLeft: "5%" }}
              />
            )}
          </div>
          <div
            onClick={() => setTriggerReload((prev) => prev + 1)}
            className="cursor-pointer pb-2 pr-2 "
          >
            <TfiReload className="text-white text-[16px] hover:text-[17px] font-[800]" />
          </div>
        </div>
        <div className="bg-darkslategray-200 w-full py-[10px] md:py-[21px] pb-0 md:pb-[10px] px-[5px] md:px-[19px] rounded-borderradius-large box-border  custom-tab-box">
          {/* <TagsInput value={selected} name='tags' placeHolder='Enter your Key Seed...' /> */}
          <div className="flex md:gap-[8px] gap-[5px] flex-wrap">
            {seedsData?.split(" ").map((seed, index) => (
              <span
                key={index}
                className="dm-sans border-mediumturquoise border-[1px] px-[8px] text-[14px] md:text-[16px] leading-[20px] md:leading-[20px] font-[400] text-white rounded-[6px]"
              >
                {seed}
              </span>
            ))}
          </div>
          <div className="flex justify-end gap-[26px] items-center mt-[20px]">
            <span
              onClick={copyToClipBoard}
              className="dm-sans cursor-pointer flex gap-[4.96px] text-[#FFFFFFA1] text-[16px] font-[400] leading-[27px]"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {copytext ? (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 11L8 17L20 3"
                      stroke="white"
                      strokeOpacity="0.63"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />{" "}
                  </svg>
                ) : (
                  <>
                    <path
                      d="M18.2606 4.84595H7.58793C6.07452 4.84595 4.84766 6.07281 4.84766 7.58622V18.2589C4.84766 19.7723 6.07452 20.9991 7.58793 20.9991H18.2606C19.774 20.9991 21.0008 19.7723 21.0008 18.2589V7.58622C21.0008 6.07281 19.774 4.84595 18.2606 4.84595Z"
                      stroke="white"
                      strokeOpacity="0.63"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.1291 4.84599L17.1532 3.6922C17.1511 2.97881 16.8669 2.29521 16.3624 1.79077C15.858 1.28632 15.1744 1.00203 14.461 1H4.0768C3.26152 1.00241 2.48032 1.32734 1.90383 1.90383C1.32734 2.48032 1.00241 3.26152 1 4.0768V14.461C1.00203 15.1744 1.28632 15.858 1.79077 16.3624C2.29521 16.8669 2.97881 17.1511 3.6922 17.1532H4.84599"
                      stroke="white"
                      strokeOpacity="0.63"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </>
                )}
              </svg>
              {copytext ? "Copied" : "Copy"}
            </span>
          </div>
        </div>
        <p className="text-[12px] font-normal leading-[27px] my-[0px]">
          Please write these down incase you lose your seed
        </p>
      </div>
      <div className="w-full max-w-[223px] mx-auto mt-4 md:mt-[68px] flex flex-col items-center justify-center pt-0 px-0 text-center text-base font-montserrat">
        <div className="w-full flex flex-col items-start justify-start gap-[10.8px] mb-[1px]">
          <button
            disabled={isCreatingToken}
            onClick={handleLogin}
            className={`self-stretch h-[25px] rounded-[4.38px]   ${
              isCreatingToken
                ? "cursor-not-allowed"
                : "bg-mediumturquoise cursor-pointer"
            } bg-mediumturquoise flex flex-row items-start justify-center pt-1 pb-7 md:pb-[2rem] md:pl-[50px] md:pr-[49px] shrink-0 z-[1]`}
          >
            {/* <div className="h-[47.2px] w-full relative rounded-[4.38px] bg-mediumturquoise hidden" /> */}
            <div className="flex items-center justify-center gap-2 relative z-[1]">
              Next
              {isCreatingToken && (
                <ThreeDots
                  color="white"
                  height={10}
                  width={35}
                  ariaLabel="loading"
                  wrapperStyle={{ marginLeft: "5%" }}
                />
              )}
            </div>
          </button>
        </div>
      </div>
    </>
  );
};
export default GroupComponent;
GroupComponent.propTypes = {
  className: PropTypes.string,
  seedsData: PropTypes.string,
};
