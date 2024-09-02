import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Formik, Form, Field } from "formik";
import "react-toastify/dist/ReactToastify.css";
import { Tabs, Modal, Button } from "flowbite-react";
import useGetKeyPairs from "../hooks/useGetKeyPairs";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useGetRecipients from "../hooks/useGetRecipients";
import useCreateRecipient from "../hooks/useCreateRecipient";

const Recipients = () => {
  const location = useLocation();

  const { mutate } = useCreateRecipient();
  const { data: keypairs, refetch: refetchKeypairs } = useGetKeyPairs();
  const { data: recipients, refetch: refetchRecipients } = useGetRecipients();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTwo, setIsOpenTwo] = useState(false);
  const [decryptMessageData, setDecryptMessageData] = useState({});
  const [encryptMessageData, setencryptMessageData] = useState({
    message: "string",
    recipient_ids: [],
  });

  useEffect(() => {
    refetchKeypairs();
    refetchRecipients();
  }, [location, refetchKeypairs, refetchRecipients, isOpen]);

  const handleSubmit = (values) => {
    mutate(values, {
      onSuccess: () => {
        toast.success(`Recipient Created successfully.`);
        setIsOpen(false);
      },
      onError: (error) => {
        toast.error(
          error.response.data?.error
            ? error.response.data?.error[0]
            : "Something bad happend while creating recipient please try again."
        );
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

  const openModal = () => {
    setIsOpen(true);
  };
  const openModalTwo = () => {
    setIsOpenTwo(true);
  };
  const closeModal = () => setIsOpen(false);
  const closeModalTwo = () => setIsOpenTwo(false);
  const CloseButton = ({ closeToast }) => (
    <button
      onClick={() => {
        closeToast();
      }}
      className="alert-btn"
    >
      <img src="/close-btn.svg" className="w-4 h-4" /> Close
    </button>
  );

  const notify = () =>
    toast.success(
      "Note: You cannot be sure who encrypted this message as it is not signed.",
      {
        position: "bottom-right",
        className: "bg-[#345360] text-white",
        autoClose: false,
      }
    );

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
                className="w-full max-w-[177px] flex flex-row items-start justify-start gap-2.5 text-center text-xs cursor-pointer"
                onClick={openModal}
              >
                <div className="flex flex-col items-start justify-start pt-[11px] px-0 pb-0">
                  <div className="relative z-[1]">Create New Recipient</div>
                </div>
                <div className=" relative text-5xl">
                  <div className="h-9 w-9 rounded-[50%] border-white border-[1px] border-solid box-border flex justify-center items-center">
                    <div className="text-[24px]">+</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch  flex-row items-start justify-start relative max-w-full xs:hidden sm:hidden md:flex lg:flex">
              <div className="flex-1 flex flex-row items-start justify-start flex-wrap content-start gap-6 w-full">
                <div className="flex-1 flex flex-col items-start justify-start gap-[25px] min-w-[463px] w-full">
                  <div className="overflow-y-auto bg-vector-img  md:h-[calc(100vh-35vh)] lg:h-[calc(100vh-35vh)] bg-[#0f2e3f] self-stretch border-[#1B3D4F] border-[1px] border-solid box-border flex flex-col items-start justify-start pt-9 pb-[18px] pl-3 pr-[11px] gap-[17px] max-w-full mq800:pt-[23px] mq800:pb-5 mq800:box-border">
                    <div className="w-full max-w-[569px] flex flex-row items-start justify-start py-0 px-2.5 box-border">
                      <div className="flex-1 relative leading-[30px] inline-block max-w-full z-[1] mq450:text-lg mq450:leading-[24px]">
                        <p className="m-0">Hello,</p>
                        <p className="m-0">
                          You will receive 1.000.000 USD for tomorrow
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-[304px] flex flex-row items-start justify-start gap-5">
                    <button className="cursor-pointer border-darkslategray-100 border-[0.7px] border-solid py-[13px] pl-8 pr-[31px] bg-mediumturquoise flex-1 rounded-[4.38px] flex flex-row items-start justify-start hover:bg-darkcyan hover:border-slategray-100 hover:border-[0.7px] hover:border-solid hover:box-border">
                      <div className="h-[47.2px] w-[142px] relative rounded-[4.38px] bg-mediumturquoise border-darkslategray-100 border-[0.7px] border-solid box-border hidden" />
                      <div className="flex-1 relative text-base  text-white text-center z-[1]">
                        Encrypt
                      </div>
                    </button>
                    <button
                      onClick={notify}
                      className="cursor-pointer border-darkslategray-100 border-[0.7px] border-solid py-[13px] pl-8 pr-[31px] bg-mediumturquoise flex-1 rounded-[4.38px] flex flex-row items-start justify-start whitespace-nowrap hover:bg-darkcyan hover:border-slategray-100 hover:border-[0.7px] hover:border-solid hover:box-border"
                    >
                      <div className="h-[47.2px] w-[142px] relative rounded-[4.38px] bg-mediumturquoise border-darkslategray-100 border-[0.7px] border-solid box-border hidden" />
                      <div className="flex-1 relative text-base  text-white text-center z-[1]">
                        {" "}
                        Decrypt
                      </div>
                    </button>
                  </div>
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
                                    <div className="flex items-center justify-center relative z-[2] text-[#175C83]">{`S`}</div>
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
                  <div className="xs:hidden sm:hidden md:flex lg:flex bg-[#0f2e3f] self-stretch border-[#1B3D4F] border-[1px] border-solid box-border  flex-col items-start justify-start pt-[21px] px-[19px] pb-[18px] gap-[21.1px] max-w-full z-[1] text-left text-3xl text-white font-neue-plak">
                    <div className=" relative font-black inline-block text-[22px]">
                      Select Keypair for Decryption
                    </div>
                    <div className="w-[712px] h-[402px] relative border-[#1B3D4F] border-[1px] border-solid box-border hidden max-w-full" />
                    <div className="flex gap-[20px] w-full flex-wrap">
                      {keypairs?.results?.map((item) => (
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
        <main className="mobile-View w-full md:hidden lg:hidden">
          <div className="bg-[#1B3D4F] py-[7px] px-[28px] text-[14px] font-normal">
            Notepad
          </div>
          <div className="overflow-y-auto xs:min-h-[353px] md:min-h-[400px] lg:min-h-[663px] bg-[#0f2e3f] self-stretch border-[#1B3D4F] border-[1px] border-solid box-border flex flex-col items-start justify-start pt-9 pb-[18px] pl-3 pr-[11px] gap-[17px] max-w-full mq800:pt-[23px] mq800:pb-5 mq800:box-border">
            <div className="w-full max-w-[569px] flex flex-row items-start justify-start py-0 px-2.5 box-border">
              <div className="flex-1 relative leading-[30px] inline-block max-w-full z-[1] mq450:text-lg mq450:leading-[24px]">
                <p className="m-0">Hello,</p>
                <p className="m-0">
                  You will receive 1.000.000 USD for tomorrow
                </p>
              </div>
            </div>
          </div>
          <section className="w-full mobile-view-tab">
            <Tabs
              aria-label="Default tabs"
              variant="default"
              className="justify-center  border-none"
            >
              <Tabs.Item active title="Recipients">
                <div className="bg-[#0f2e3f] self-stretch border-[#1B3D4F] border-[1px] border-solid box-border flex flex-row items-start justify-start pt-[19px] px-[17px] gap-[19px] max-w-full mq800:flex-wrap h-[338px] overflow-auto">
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
                                  <div className="flex items-center justify-center relative z-[2] text-[#175C83]">{`K`}</div>
                                </div>
                                <p className=" text-[19.06px] text-white font-normal leading-[23px] break-all">
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
              <Tabs.Item title="Keypair">
                <div className="flex gap-[20px] w-full flex-wrap xs:px-[16px] sm:px-[16px]">
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
                    );
                  })}
                </div>
              </Tabs.Item>
            </Tabs>
            <div className="w-[245px] mx-auto flex-row items-start justify-start gap-5 xs:flex sm:flex md:hidden lg:hidden mt-[23px]">
              <button className="cursor-pointer border-darkslategray-100 border-[0.7px] border-solid py-[13px] pl-8 pr-[31px] bg-mediumturquoise flex-1 rounded-[4.38px] flex flex-row items-start justify-start hover:bg-darkcyan hover:border-slategray-100 hover:border-[0.7px] hover:border-solid hover:box-border">
                <div className="h-[47.2px] w-[142px] relative rounded-[4.38px] bg-mediumturquoise border-darkslategray-100 border-[0.7px] border-solid box-border hidden" />
                <div className="flex-1 relative text-base  text-white text-center z-[1]">
                  Encrypt
                </div>
              </button>
              <button
                onClick={notify}
                className="cursor-pointer border-darkslategray-100 border-[0.7px] border-solid py-[13px] pl-8 pr-[31px] bg-mediumturquoise flex-1 rounded-[4.38px] flex flex-row items-start justify-start whitespace-nowrap hover:bg-darkcyan hover:border-slategray-100 hover:border-[0.7px] hover:border-solid hover:box-border"
              >
                <div className="h-[47.2px] w-[142px] relative rounded-[4.38px] bg-mediumturquoise border-darkslategray-100 border-[0.7px] border-solid box-border hidden" />
                <div className="flex-1 relative text-base  text-white text-center z-[1]">
                  {" "}
                  Decrypt
                </div>
              </button>
            </div>
          </section>
        </main>
      </div>
      <ToastContainer
        closeButton={CloseButton}
        className="w-full max-w-[1000px] left-auto xs:right-0 sm:right-0 lg:!right-[1%] items-center"
      />
      <Modal show={isOpen} onClose={closeModal} className="bg-black">
        <Modal.Header className="justify-center items-center flex bg-[#0E2E3F] border-none modal-h3">
          <div className="text-white"> Create New Recipients </div>
        </Modal.Header>
        <Formik
          initialValues={{ name: "", public_key: "" }}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Modal.Body className="bg-[#1B3D4F]">
                <div className="flex flex-col">
                  <div className="flex">
                    <label htmlFor="name" className="text-white mb-[6px]">
                      Enter Nickname
                    </label>
                  </div>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="!bg-[#0E2E3F] !rounded-[5px] border-[#0E2E3F] text-white focus:ring-[#57CACC] input-field"
                  />
                </div>
                <div className="flex flex-col mt-[28px]">
                  <div className="flex">
                    <label htmlFor="textarea" className="text-white mb-[6px]">
                      Enter Public Key
                    </label>
                  </div>
                  <Field
                    as="textarea"
                    id="public_key"
                    name="public_key"
                    rows="4"
                    cols="50"
                    className="!bg-[#0E2E3F] !rounded-[5px] border-[#0E2E3F]  focus:ring-[#57CACC] input-field"
                  />
                </div>
              </Modal.Body>

              <Modal.Footer className="bg-[#1B3D4F] justify-center border-[0px] pt-0">
                <Button
                  type="submit"
                  className="!bg-[#57CBCC] hover:bg-red-700 text-white font-bold py-2 px-4 rounded-[5px] save-btn"
                >
                  Save
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>

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
