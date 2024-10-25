import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Formik, Form, Field } from "formik";
import { Tabs, Modal, Button } from "flowbite-react";
import useGetKeyPairs from "../hooks/useGetKeyPairs";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useGetRecipients from "../hooks/useGetRecipients";
import useCreateEncryptedMessage from "../hooks/useCreateEncryptedMessage";
import useCreateDecryptedMessage from "../hooks/useCreateDecryptedMessage";
import CreateRecipientModal from "../components/CreateRecipientModal";
import { useAuth } from "../AuthContext";
import Lottie from "lottie-react";
import keyRotation from "../animations/keyRotation.json";
import addDocumentAnimation from "../animations/addDocument.json";

const Recipients = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isOpen, handleModal } = useAuth();
  const { data: keypairs, refetch: refetchKeypairs } = useGetKeyPairs();
  const { data: recipients, refetch: refetchRecipients } = useGetRecipients();
  const { mutate: mutateCreateEncryptedMessage } = useCreateEncryptedMessage();
  const { mutate: mutateCreateDecryptedMessage } = useCreateDecryptedMessage();

  const [isOpenTwo, setIsOpenTwo] = useState(false);
  const [decryptMessageData, setDecryptMessageData] = useState({
    keypair_id: "",
    message: "",
    passphrase: null,
  });
  const [encryptMessageData, setencryptMessageData] = useState({
    message: "",
    recipient_ids: [],
  });

  useEffect(() => {
    refetchKeypairs();
    refetchRecipients();
  }, [location, refetchKeypairs, refetchRecipients, isOpen]);

  const handleEncryption = () => {
    mutateCreateEncryptedMessage(encryptMessageData, {
      onSuccess: (res) => {
        toast.success(`Message Encrypted successfully.`);
        navigate("/key-display", {
          state: { keyType: "Message", keyText: res.message },
        });
      },
      onError: (error) => {
        Object.values(error.response.data).forEach((errorArray) => {
          toast.error(errorArray[0]);
        });
      },
    });
  };
  const handleDecryption = () => {
    mutateCreateDecryptedMessage(decryptMessageData, {
      onSuccess: (res) => {
        setDecryptMessageData((prevState) => ({
          ...prevState,
          message: res.message,
        }));
        setencryptMessageData((prevState) => ({
          ...prevState,
          message: res.message,
        }));
        toast.success(`Message Decrypted successfully.`);
      },
      onError: (error) => {
        Object.values(error.response.data).forEach((errorArray) => {
          toast.error(errorArray[0]);
        });
      },
    });
  };

  const handleRecipientClick = (id) => {
    setencryptMessageData((prevState) => ({
      ...prevState,
      recipient_ids: prevState.recipient_ids.includes(id)
        ? prevState.recipient_ids.filter((recipientId) => recipientId !== id)
        : [...prevState.recipient_ids, id],
    }));
  };

  const openModalTwo = () => {
    setIsOpenTwo(true);
  };
  const closeModalTwo = () => setIsOpenTwo(false);

  // const notify = () =>
  //   toast.success(
  //     "Note: You cannot be sure who encrypted this message as it is not signed.",
  //     {
  //       position: "bottom-right",
  //       className: "bg-[#345360] text-white",
  //       autoClose: false,
  //     }
  //   );

  return (
    <div>
      <div
        className={`bg-[#0f2e3f] h-[100vh] max-w-full overflow-x-hidden flex flex-col items-start justify-start pt-0 px-0 pb-[21px] box-border leading-[normal] tracking-[normal] text-left text-lg text-gray-200 `}
      >
        <div className="bg-[#0B2837] w-full items-center">
          <Header />
        </div>
        <main className="self-stretch flex flex-row items-start justify-start py-0 xs:px-0 sm:px-0 md:px-8 lg:px-8 box-border max-w-full">
          <section className="flex-1 flex flex-col items-center justify-center gap-[9px] max-w-full text-left text-3xl text-white font-neue-plak">
            <div className="xs:hidden sm:hidden md:flex lg:flex self-stretch bg-[#1B3D4F] flex-row items-center justify-between pt-[14px]  pb-[10px] pl-0 pr-[9px] box-border max-w-full gap-5 mq1300:flex-wrap mq1300:pl-[9px] mq1300:pb-[9px] mq1300:box-border">
              <div className="w-full flex flex-col items-center justify-start  px-0 pb-0 box-border max-w-full h-full">
                <div className="flex justify-center items-center h-full w-full">
                  <div className="w-full flex flex-row items-start justify-center py-0 px-5 box-border">
                    <a className="[text-decoration:none] h-[31px] relative font-black text-[inherit] inline-block min-w-[89px] z-[1] mq450:text-lg">
                      Notepad
                    </a>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-[712px] flex flex-col items-center justify-center  text-gray-300">
                <a className="[text-decoration:none] h-[31px] relative font-black text-[inherit] inline-block min-w-[108px] z-[1] mq450:text-lg">
                  Recipients
                </a>
              </div>
              <div
                className="w-full max-w-[207px] flex flex-row items-start justify-start gap-3 text-center text-xs cursor-pointer"
                onClick={() => handleModal()}
              >
                <div className="flex flex-col items-start justify-start pt-[11px] px-0 pb-0">
                  <div className="relative z-[1] text-[14px]">
                    Create New Recipient
                  </div>
                </div>
                <PlusWeb className={"mt-3"} />
              </div>
            </div>
            {/* For Web */}
            <div className="self-stretch  flex-row items-start justify-start relative max-w-full xs:hidden sm:hidden md:flex lg:flex">
              <div className="flex-1 flex flex-row items-start justify-start flex-wrap content-start gap-6 w-full">
                <div className="flex-1 flex flex-col items-start justify-start gap-[25px] min-w-[463px] w-full">
                  <div className="overflow-y-auto bg-vector-img  md:h-[calc(100vh-35vh)] lg:h-[calc(100vh-35vh)] bg-[#0f2e3f] self-stretch border-[#1B3D4F] border-[1px] border-solid box-border flex flex-col items-start justify-start pt-9 pb-[18px] pl-3 pr-[11px] gap-[17px] max-w-full mq800:pt-[23px] mq800:pb-5 mq800:box-border">
                    {/* <div className="w-full max-w-[569px] flex flex-row items-start justify-start bg-[#587481]  py-0 px-2.5 box-border"> */}
                    {/* <div className="flex-1 relative leading-[30px] inline-block max-w-full z-[1] bg-[#869399] mq450:text-lg mq450:leading-[24px]"> */}
                    <textarea
                      value={
                        decryptMessageData["message"] ||
                        encryptMessageData["message"]
                      }
                      onChange={(e) => {
                        setDecryptMessageData((prevState) => ({
                          ...prevState,
                          message: e.target.value,
                        }));
                        setencryptMessageData((prevState) => ({
                          ...prevState,
                          message: e.target.value,
                        }));
                      }}
                      className="w-full max-w-3xl h-full p-4 text-white bg-transparent border-none resize-none text-xl outline-none focus:outline-none focus:ring-0"
                    ></textarea>
                    {/* </div>
                    </div> */}
                  </div>
                  {(decryptMessageData.message ||
                    encryptMessageData.message) && (
                    <div className="w-[304px] flex flex-row items-start justify-start gap-5">
                      <button className="cursor-pointer border-darkslategray-100 border-[0.7px] border-solid py-[13px] pl-8 pr-[31px] bg-mediumturquoise flex-1 rounded-[4.38px] flex flex-row items-start justify-start hover:bg-darkcyan hover:border-slategray-100 hover:border-[0.7px] hover:border-solid hover:box-border">
                        <div className="h-[47.2px] w-[142px] relative rounded-[4.38px] bg-mediumturquoise border-darkslategray-100 border-[0.7px] border-solid box-border hidden" />
                        <div
                          onClick={handleEncryption}
                          className="flex-1 relative text-base  text-white text-center z-[1]"
                        >
                          Encrypt
                        </div>
                      </button>
                      <button
                        onClick={handleDecryption}
                        className="cursor-pointer border-darkslategray-100 border-[0.7px] border-solid py-[13px] pl-8 pr-[31px] bg-mediumturquoise flex-1 rounded-[4.38px] flex flex-row items-start justify-start whitespace-nowrap hover:bg-darkcyan hover:border-slategray-100 hover:border-[0.7px] hover:border-solid hover:box-border"
                      >
                        <div className="h-[47.2px] w-[142px] relative rounded-[4.38px] bg-mediumturquoise border-darkslategray-100 border-[0.7px] border-solid box-border hidden" />
                        <div className="flex-1 relative text-base  text-white text-center z-[1]">
                          {" "}
                          Decrypt
                        </div>
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col items-start justify-start gap-[11px] max-w-[7123px] w-full text-center text-lgi-1 text-steelblue-300">
                  <div className="xs:hidden sm:hidden md:flex lg:flex bg-[#0f2e3f] self-stretch border-[#1B3D4F] border-[1px] border-solid box-border  flex-row items-start justify-start pt-[19px] px-[17px] gap-[19px] max-w-full mq800:flex-wrap h-[338px] overflow-auto">
                    <div className="h-[338px] w-[712px] relative border-[#1B3D4F] border-[1px] border-solid box-border hidden max-w-full" />
                    <div className="flex-1 flex flex-col items-start justify-end pt-0 px-0 pb-[5px] box-border max-w-full mq800:min-w-full">
                      <div className="self-stretch flex flex-col items-start justify-start gap-4 max-w-full">
                        {recipients?.results?.map((item) => {
                          return (
                            <div
                              key={item.id}
                              onClick={() => handleRecipientClick(item.id)}
                              className="self-stretch shadow-[0px_3.8px_11.44px_rgba(0,_0,_0,_0.32)] rounded-[11.44px] bg-[#113C53] flex flex-row items-center justify-between pt-[5.8px] pb-[6.7px] pl-[5px] pr-3.5 box-border max-w-full gap-5 z-[1]"
                            >
                              <div className="w-full flex flex-row  max-w-full mq800:flex-wrap">
                                <div className="flex gap-[23.8px] items-center w-full">
                                  <div className="w-[59.1px] h-[51px] rounded-[11.44px] bg-[#0F2E3F] flex items-center justify-center  pt-[14.3px] px-[15px] pb-[14.2px] box-border z-[1]">
                                    <div className="flex items-center justify-center relative z-[2] text-[#175C83]">
                                      {item.emoji
                                        ? String.fromCodePoint(
                                            parseInt(item.emoji, 16)
                                          )
                                        : item.name[0].toUpperCase()}
                                    </div>
                                  </div>
                                  <p className=" text-[19.06px] text-white font-normal leading-[23px]">
                                    {item.name}
                                  </p>
                                </div>
                              </div>
                              {encryptMessageData?.recipient_ids?.includes(
                                item.id
                              ) && (
                                <div className="w-[34.3px] h-[34.3px] flex">
                                  <img
                                    className="w-[34.3px] h-[34.3px] relative z-[3] flex"
                                    alt=""
                                    src="/group-1261153225.svg"
                                  />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="xs:hidden sm:hidden overflow-y-auto h-[300px] md:flex lg:flex bg-[#0f2e3f] self-stretch border-[#1B3D4F] border-[1px] border-solid box-border  flex-col items-start justify-start pt-[21px] px-[19px] pb-[18px] gap-[21.1px] max-w-full z-[1] text-left text-3xl text-white font-neue-plak">
                    <div className=" relative font-black inline-block text-[22px]">
                      Select Keypair for Decryption
                    </div>
                    <div className="w-[712px] h-[402px] relative border-[#1B3D4F] border-[1px] border-solid box-border hidden max-w-full" />
                    <div className="flex gap-[15px] w-full flex-wrap">
                      {keypairs?.results?.map((item) => (
                        <div
                          key={item.id}
                          className="key-pair xs:w-[46%] sm:w-[173px] md:w-[200px] lg:w-[200px]"
                        >
                          <label className="relative inline-flex items-center w-full">
                            <input
                              type="radio"
                              className="hidden peer"
                              name="key-pair"
                              onClick={() =>
                                setDecryptMessageData((prevState) => ({
                                  ...prevState,
                                  keypair_id: item.id,
                                }))
                              }
                            />
                            <span className="w-full max-w-full h-[47px] flex justify-center items-center px-2 py-2 bg-[#113C53] text-white text-[20.24px] border-[#05496D] border-[1px] border-solid rounded-md cursor-pointer peer-checked:bg-[#57CBCC] peer-checked:text-white transition-colors duration-200">
                              {item.name}
                            </span>
                            <span className="hidden peer-checked:block absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                              <img
                                className="h-[20.2px] w-[20.2px] z-[3]"
                                alt=""
                                src="/group-1261153226.svg"
                              />
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        {/* Mobile View */}
        <main className="mobile-View h-[100vh] w-full md:hidden lg:hidden">
          <div className="bg-[#1B3D4F] py-[7px] px-[28px] text-[14px] md:font-normal font-semibold">
            Notepad
          </div>
          <div className="overflow-y-auto bg-vector-img xs:min-h-[300px] bg-[#0f2e3f] self-stretch border-[#1B3D4F] border-[1px] border-solid box-border flex flex-col items-start justify-start pt-1 pb-[18px] pl-3 pr-[11px] gap-[17px] max-w-full mq800:pt-[23px] mq800:pb-5 mq800:box-border">
            <textarea
              placeholder="Enter your message here..."
              value={
                decryptMessageData["message"] || encryptMessageData["message"]
              }
              onChange={(e) => {
                setDecryptMessageData((prevState) => ({
                  ...prevState,
                  message: e.target.value,
                }));
                setencryptMessageData((prevState) => ({
                  ...prevState,
                  message: e.target.value,
                }));
              }}
              className="w-full max-w-3xl h-[280px] text-[14px] p-4 text-white bg-transparent border-none resize-none outline-none focus:outline-none focus:ring-0"
            ></textarea>
          </div>
          <section className="w-full mobile-view-tab">
            <div className="w-full relative">
              <Tabs
                aria-label="Default tabs"
                variant="default"
                className="justify-arround gap-6 border-none"
              >
                <Tabs.Item
                  active
                  title={<p className="font-semibold">Recipients</p>}
                >
                  <div className="custom-scrollbar bg-[#0f2e3f] overflow-y-scroll h-[220px] self-stretch border-[#1B3D4F] border-[1px] border-solid box-border flex flex-row items-start justify-start pt-2 px-[17px] gap-[19px] max-w-full mq800:flex-wrap md:h-[338px] overflow-auto">
                    <div className="h-[220px] w-[712px] relative border-[#1B3D4F] border-[1px] border-solid box-border hidden max-w-full" />
                    <div className="flex-1 flex flex-col items-start justify-end pt-0 px-0 pb-[5px] box-border max-w-full mq800:min-w-full">
                      <div className="self-stretch flex flex-col items-start justify-start gap-4 max-w-full">
                        {recipients?.count === 0 && (
                          <div className="flex flex-col justify-center items-center w-full h-[130px]">
                            <div style={{ width: 90, height: 90 }}>
                              <Lottie
                                animationData={addDocumentAnimation}
                                loop={true}
                              />
                            </div>
                            <p className="text-[12px] font-sans mt-3">
                              You have no recipient yet, create New Recipient
                            </p>
                          </div>
                        )}
                        {recipients?.results?.map((item) => {
                          return (
                            <div
                              key={item.id}
                              onClick={() => handleRecipientClick(item.id)}
                              className="self-stretch shadow-[0px_3.8px_11.44px_rgba(0,_0,_0,_0.32)] rounded-[11.44px] bg-[#113C53] flex flex-row items-center justify-between pt-[5.8px] pb-[6.7px] pl-[5px] pr-3.5 box-border max-w-full gap-5 z-[1]"
                            >
                              <div className="w-full flex flex-row  max-w-full mq800:flex-wrap">
                                <div className="flex gap-[23.8px] items-center w-full">
                                  <div className="w-[59.1px] h-[40px] rounded-[11.44px] bg-[#0F2E3F] flex items-center justify-center  pt-[14.3px] px-[15px] pb-[14.2px] box-border z-[1]">
                                    <div className="flex items-center justify-center relative z-[2] text-[#175C83]">
                                      {item.emoji
                                        ? String.fromCodePoint(
                                            parseInt(item.emoji, 16)
                                          )
                                        : item.name[0].toUpperCase()}
                                    </div>
                                  </div>
                                  <p className=" text-[13.69px] text-white font-normal leading-[23px] break-all">
                                    {item.name}
                                  </p>
                                </div>
                              </div>
                              {encryptMessageData?.recipient_ids?.includes(
                                item.id
                              ) && (
                                <div className="w-[34.3px] h-[34.3px] flex">
                                  <img
                                    className="w-[34.3px] h-[34.3px] relative z-[3] flex"
                                    alt=""
                                    src="/group-1261153225.svg"
                                  />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </Tabs.Item>
                <Tabs.Item title={<p className="font-semibold">Keypair</p>}>
                  <div className="flex gap-[10px] h-[220px] pt-2 overflow-y-scroll w-full flex-wrap xs:px-[16px] sm:px-[16px]">
                    {keypairs?.count === 0 && (
                      <div className="flex flex-col justify-center items-center w-full h-[130px]">
                        <div style={{ width: 100, height: 100 }}>
                          <Lottie animationData={keyRotation} loop={true} />
                        </div>
                        <p className="text-[12px] font-sans mt-3">
                          You have no keypair yet, create New Keypair
                        </p>
                      </div>
                    )}
                    {keypairs?.results?.map((item) => {
                      return (
                        <div
                          key={item.id}
                          className="key-pair xs:w-[46%] sm:w-[173px] md:w-[212px] lg:w-[212px]"
                        >
                          <label className="relative inline-flex items-center w-full">
                            <input
                              type="radio"
                              className="hidden peer"
                              name="key-pair"
                              onClick={() =>
                                setDecryptMessageData((prevState) => ({
                                  ...prevState,
                                  keypair_id: item.id,
                                }))
                              }
                            />
                            <span className="w-full max-w-full h-[32px] md:h-[37px] flex justify-center items-center px-2 py-2 bg-[#113C53] text-white text-[13.69px] overflow-hidden md:text-[20.24px] border-[#05496D] border-[1px] border-solid rounded-md cursor-pointer peer-checked:bg-[#57CBCC] peer-checked:text-white transition-colors duration-200">
                              {item.name}
                            </span>
                            <span className="hidden peer-checked:block absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                              <img
                                className="h-[20.2px] w-[20.2px] z-[3]"
                                alt=""
                                src="/group-1261153226.svg"
                              />
                            </span>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </Tabs.Item>
              </Tabs>
              <div
                onClick={() => handleModal()}
                className="cursor-pointer flex-row absolute bottom-[267px] right-5 mq400:right-3 ml-auto text-white text-[12px] font-sans" // Styled to look clickable
              >
                <div className="flex items-center">
                  Create Recipient
                  <Plus className={" ml-[3px]"} />
                </div>
              </div>{" "}
            </div>
            {(decryptMessageData.message || encryptMessageData.message) && (
              <div className="w-[245px] mx-auto flex-row items-start justify-start gap-3 xs:flex sm:flex md:hidden lg:hidden mt-[7px]">
                <button className="cursor-pointer border-darkslategray-100 border-[0.7px] border-solid py-[10px] pl-8 pr-10 bg-mediumturquoise flex-1 rounded-[4.38px] flex flex-row items-start justify-start hover:bg-darkcyan hover:border-slategray-100 hover:border-[0.7px] hover:border-solid hover:box-border">
                  <div className="h-[47.2px] w-[142px] relative rounded-[4.38px] bg-mediumturquoise border-darkslategray-100 border-[0.7px] border-solid box-border hidden" />
                  <div
                    onClick={handleEncryption}
                    className="flex-1 relative text-base  text-white text-center z-[1]"
                  >
                    Encrypt
                  </div>
                </button>
                <button className="cursor-pointer border-darkslategray-100 border-[0.7px] border-solid py-[10px] pl-8 pr-10 bg-mediumturquoise flex-1 rounded-[4.38px] flex flex-row items-start justify-start whitespace-nowrap hover:bg-darkcyan hover:border-slategray-100 hover:border-[0.7px] hover:border-solid hover:box-border">
                  <div className="h-[47.2px] w-[142px] relative rounded-[4.38px] bg-mediumturquoise border-darkslategray-100 border-[0.7px] border-solid box-border hidden" />
                  <div
                    onClick={handleDecryption}
                    className="flex-1 relative text-base  text-white text-center z-[1]"
                  >
                    Decrypt
                  </div>
                </button>
              </div>
            )}
          </section>
        </main>
      </div>
      <CreateRecipientModal />
      <Modal show={isOpenTwo} onClose={closeModalTwo} className="bg-black">
        <Modal.Header className="pt-[10px] !pl-[0px] !pb-[2px] bg-[#1B3D4F] border-none"></Modal.Header>

        <Modal.Body className="bg-[#1B3D4F] !pt-[0px] !pb-[50px]">
          <img
            src="/alert-icon.svg"
            alt="alert-icon"
            className="mx-auto mb-[30px]"
          />
          <p className="text-white text-center text-[22px] leading-[30px]">
            Please make sure no body around you, keep your private key save and
            confidential.
          </p>
          <button className="bg-[#57CBCC] rounded-[4px] text-[16px] font-normal leading-[19.5px] w-full max-w-[250px] h-[47px] flex justify-center items-center text-white mt-[37px] mx-auto">
            Show me Private Key
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Recipients;

const Plus = ({ className }) => (
  <svg
    width="20"
    height="19"
    viewBox="0 0 20 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle
      cx="9.79984"
      cy="9.37357"
      r="9.1132"
      stroke="white"
      stroke-width="0.520754"
    />
    <path
      d="M9.12083 12.344V7.256H9.87683V12.344H9.12083ZM6.88883 10.16V9.452H12.1088V10.16H6.88883Z"
      fill="white"
    />
  </svg>
);

const PlusWeb = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="18" cy="18" r="17.5" stroke="white" />
    <path
      d="M17.2417 23.688V13.512H18.7537V23.688H17.2417ZM12.7777 19.32V17.904H23.2177V19.32H12.7777Z"
      fill="white"
    />
  </svg>
);
