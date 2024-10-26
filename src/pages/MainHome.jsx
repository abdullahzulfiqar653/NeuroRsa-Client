import { Button, Modal, Table } from "flowbite-react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useAuth } from "../AuthContext";
import BottomSheet from "../components/BottomSheet";
import Header from "../components/Header";
import useDeleteKeyPairs from "../hooks/useDeleteKeyPairs";
import useGetKeyPairs from "../hooks/useGetKeyPairs";
import { debounce } from "lodash";
import useCreateKeypair from "../hooks/useCreateKeypair";

const MainHome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { search, setSearch } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTwo, setIsOpenTwo] = useState(false);
  const [copiedPublic, setCopiedPublic] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [privateKey, setPrivateKey] = useState(null);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { mutate: deleteKeyPair } = useDeleteKeyPairs();
  const [step, setStep] = useState(1);
  const { mutate } = useCreateKeypair();
  const [errors, setErrors] = useState({});
  const [isOpenThree, setIsOpenThree] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [keypair, setKeypair] = useState({});
  const [loading, setLoading] = useState(false);
  const { data, refetch } = useGetKeyPairs(search, currentPage, itemPerPage);
  const totalPages = Math.ceil(data?.count / itemPerPage);

  const debouncedRefetch = debounce(() => {
    refetch();
  }, 500);
  useEffect(() => {
    if (search) {
      debouncedRefetch();
    } else {
      refetch();
    }
    return () => {
      debouncedRefetch.cancel();
    };
  }, [search, debouncedRefetch]);

  useEffect(() => {
    refetch();
  }, [location, refetch, isOpenTwo, currentPage]);

  useEffect(() => {
    if (step === 2) {
      const timer = setTimeout(() => {
        setStep(3);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const closeModalThree = () => setIsOpenThree(false);
  const nextStep = () => setStep((prevStep) => Math.min(prevStep + 1, 4));
  const prevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 1));
  const openModalThree = () => {
    setIsOpenThree(true);
    setStep(1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoading(false);
    setFormValues((prevValues) => {
      let updatedValues = { ...prevValues, [name]: value };
      if (value === "") {
        delete updatedValues[name];
      }
      if (name === "confirmPassphrase" || name === "passphrase") {
        const { passphrase, confirmPassphrase } = updatedValues;
        if (!passphrase || !confirmPassphrase) {
          setErrors({ passphrase: "" });
        } else if (passphrase !== confirmPassphrase) {
          setErrors({ passphrase: "Passphrases do not match" });
        } else {
          setErrors({ passphrase: "" });
        }
      }
      return updatedValues;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValues?.passphrase && !formValues?.confirmPassphrase) {
      toast.error("Please confirm your passphrase.");
      return;
    }

    setLoading(true);
    if (!errors.passphrase) {
      mutate(formValues, {
        onSuccess: (response) => {
          setKeypair(response);
          setStep(4);
          setLoading(false);
          toast.success(`Keypair Created successfully.`);
        },
        onError: (error) => {
          setErrors(error.response.data);
          for (const [attribute, errors] of Object.entries(
            error.response.data
          )) {
            toast.error(errors[0]);
          }
        },
      });
      setFormValues({});
    } else {
      toast.error("Passphrases do not match! Please correct it.");
    }
  };

  const handleBackupOfKeypair = () => {
    const element = document.createElement("a");
    const file = new Blob(
      [`${keypair.public_key}\n\n\n\n${keypair.private_key}`],
      { type: "text/plain" }
    );
    element.href = URL.createObjectURL(file);
    element.download = "keypair_backup.txt";
    document.body.appendChild(element);
    element.click();
  };

  const handleShowPublicKey = (type, text) => {
    navigate("/key-display", {
      state: { keyType: type, keyText: text },
    });
  };

  const handleCopyPublic = (id) => {
    setCopiedPublic((prevState) => ({
      ...prevState,
      [id]: true,
    }));
    setTimeout(() => {
      setCopiedPublic((prevState) => ({
        ...prevState,
        [id]: false,
      }));
    }, 1000);
  };


  const closeModal = () => setIsOpen(false);
  const closeModalTwo = () => setIsOpenTwo(false);
  const openModal = (key) => {
    setPrivateKey(key);
    setIsOpen(true);
  };

  const openModalTwo = (id) => {
    setSelectedUserId(id);
    setIsOpenTwo(true);
  };

  const handleShowPrivateKey = () => {
    navigate("/key-display", {
      state: { keyType: "Private", keyText: privateKey },
    });
  };

  const handleDelete = () => {
    deleteKeyPair(selectedUserId, {
      onSuccess: (response) => {
        toast.success(`Keypair Deleted successfully.`);
        setIsOpenTwo(false);
        refetch();
      },
      onError: (error) => {
        setErrors(error.response.data);
        toast.error(
          error.response.data?.error
            ? error.response.data?.error[0]
            : "Something bad happend while deleting please try again.",
          {
            className: "toast-message",
          }
        );
      },
    });
  };

  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const [keyType, setKeyType] = useState("");
  const openSheet = (type) => {
    setKeyType(type);
    setIsSheetVisible(true);
  };

  const closeSheet = () => {
    setIsSheetVisible(false);
  };

  return (
    <div>
      <div className={`bg-[#0f2e3f] lg:h-[100vh]`}>
        <div className="bg-[#0B2837] w-full items-center">
          <Header />
        </div>
        <div className="overflow-x-auto px-[32px] bg-[#0f2e3f] pb-4 desktop-view-table xs:hidden sm:hidden md:block lg:block">
          <div className="flex justify-around w-full h-[53px] mb-[30px] mt-[40px]">
            <div className="w-[90%]">
            <Formik
              initialValues={{ search: "" }}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {() => (
                <Form className="relative">
                  <div className="flex items-center">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg
                        className="h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </span>
                    <Field
                      name="search"
                      type="text"
                      placeholder="Search..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full md:max-w-[500px] lg:max-w-[903px] h-[53px] input-field block  pl-10 pr-4 py-2 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </Form>
              )}
            </Formik>
            </div>
            <button
               onClick={() => {
                openModalThree();
                setFormValues({});
                setErrors({});
              }}
              className="w-[212px] bg-[#57CBCC] hover:bg-[#327C85] text-white rounded-[4.38px]"
            >
              New Key Pair
            </button>
          </div>
          <div className="border-[1px] border-[#1B3D4F] p-[24px] min-h-[450px] h-full overflow-y-auto">
            <Table className="bg-[#1c3d4f] rounded-t-[12px]">
              <Table.Head className="bg-[#0f2e3f]">
                <Table.HeadCell className="bg-[#1c3d4f] text-white border-r-[5px] border-[#0f2e3f] rounded-t-[12px]">
                  Name
                </Table.HeadCell>
                <Table.HeadCell className="bg-[#1c3d4f] text-white">
                  Key Type
                </Table.HeadCell>
                <Table.HeadCell className="bg-[#1c3d4f]"></Table.HeadCell>
                <Table.HeadCell className="bg-[#1c3d4f] rounded-tr-[12px]"></Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {data?.results?.map((item, index) => (
                  <Table.Row
                    key={index}
                    className="border-b-[5px] !border-t-[5px] border-[#0f2e3f] bg-[#1c3d4f]"
                  >
                    <Table.Cell className="text-white  border-r-[5px] border-[#0f2e3f]">
                      {item.name}
                    </Table.Cell>
                    <Table.Cell className="flex gap-[40px] justify-between text-white  border-r-[5px] border-[#0f2e3f]">
                      Public key
                      <div className="flex gap-[15px] items-center">
                        <img
                          src="/eye-icon.svg"
                          alt="copy-icon"
                          onClick={() =>
                            handleShowPublicKey("Public", item.public_key)
                          }
                          className="cursor-pointer"
                        />
                        <CopyToClipboard
                          text={item.public_key}
                          onCopy={() => handleCopyPublic(item.id)}
                        >
                          <div>
                            {copiedPublic[item.id] ? (
                              <TickIcon />
                            ) : (
                              <CopyIcon />
                            )}
                          </div>
                        </CopyToClipboard>
                        <Popup
                          trigger={
                            <div>
                              <Info />
                            </div>
                          }
                          position="bottom left"
                          arrowStyle={{
                            color: "#0F2E3F",
                            transform: "translateX(20px)",
                          }}
                          contentStyle={{
                            marginLeft: "-20px",
                            padding: "10px",
                            borderRadius: "8px",
                            backgroundColor: "#0F2E3F",
                            color: "white",
                            borderColor: "#0F2E3F",
                            border: "none",
                            width: "334px",
                          }}
                          arrowClassName="popup-arrow"
                          className="popup-content"
                        >
                          <div className="font-sans text-[14px]">
                            Your public key is safe to share with others. It
                            allows senders to encrypt messages that can only be
                            decrypted by you using your private key. You can
                            freely distribute your public key so others can send
                            you encrypted messages.
                          </div>
                        </Popup>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="text-white">
                      <div className="flex justify-between">Private key</div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex gap-[15px] justify-start">
                        <img
                          src="/eye-icon.svg"
                          alt="copy-icon"
                          className="cursor-pointer"
                          onClick={() => openModal(item.private_key)}
                        />
                        <Popup
                          trigger={
                            <div>
                              <Info />
                            </div>
                          }
                          position="bottom left"
                          arrowStyle={{
                            color: "#0F2E3F",
                            transform: "translateX(20px)",
                          }}
                          contentStyle={{
                            marginLeft: "-20px",
                            padding: "10px",
                            borderRadius: "8px",
                            backgroundColor: "#0F2E3F",
                            color: "white",
                            borderColor: "#0F2E3F",
                            border: "none",
                            width: "230px",
                          }}
                          arrowClassName="popup-arrow"
                          className="popup-content"
                        >
                          <div className="font-sans text-[14px]">
                            Your private key is the most important aspect of
                            your security. It must be kept secret – if someone
                            gains access to it, they will be able to decrypt all
                            of your messages. As long as your private key is in
                            your possession, your data remains safe. Never share
                            your private key with anyone.
                          </div>
                        </Popup>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <a href="#" className="flex justify-end">
                        <img
                          src="/delete-icon.svg"
                          alt="delete-icon"
                          onClick={() => openModalTwo(item.id)}
                        />
                      </a>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
          <div className="flex justify-between bg-[#0f2e3f] items-center space-x-4 mt-[64px] mb-[64px]">
            <div className="flex items-center space-x-2">
              <button
                disabled={data?.previous === null}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-3 py-1 bg-[#0B2837] text-white rounded-md hover:bg-[#1B3D4F]"
              >
                ← Prev
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === index + 1
                      ? "bg-teal-500 text-white"
                      : "bg-gray-700 text-white hover:bg-gray-600"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={data?.next === null}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-3 py-1 bg-[#0B2837] text-white rounded-md hover:bg-[#1B3D4F]"
              >
                Next →
              </button>
            </div>

            <div className="flex items-center space-x-2 text-white">
              <label htmlFor="per-page" className="text-sm">
                Per page:
              </label>
              <select
                value={itemPerPage}
                onChange={(e) => setItemPerPage(e.target.value)}
                id="per-page"
                className="px-2 py-1  bg-gray-700 text-white rounded-md hover:bg-gray-600 border-none focus:ring focus:ring-teal-500 input-field"
              >
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
                <option value={50}>50 per page</option>
                <option value={100}>100 per page</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mobile-view-table xs:block sm:block md:hidden lg:hidden px-[16px] pb-4">
          <div className="flex justify-around items-center w-full mb-[12px] mt-[14px]">
            <Formik
              initialValues={{ search: "" }}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {() => (
                <Form className="relative">
                  <div className="flex items-center">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg
                        className="h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </span>
                    <Field
                      name="search"
                      type="text"
                      placeholder="Search..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="input-field block w-full pl-10 pr-4 py-2 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </Form>
              )}
            </Formik>
            <button
              onClick={() => {
                openModalThree();
                setFormValues({});
                setErrors({});
              }}
              className="w-[130px] ml-1 text-[12px] bg-[#57CBCC] h-[30px] text-white rounded-[4.38px]"
            >
              New Key Pair
            </button>
          </div>

          <div className="border-[1px] border-[#1B3D4F] p-[12px]">
            <div className="text-white bg-[#1B3D4F] rounded-t-[8px] px-[16px] py-[8px] text-[12px] font-normal leading-[16.7px] mb-[15px]">
              Key Types
            </div>

            <div className="flex flex-col  w-full h-[530px] overflow-y-auto">
              {data?.results?.map((item, index) => (
                <div
                  key={index}
                  className="key-item bg-[#1B3D4F] px-[6px] pt-[11px] w-full mb-[6px]"
                >
                  <div className="flex justify-between border-b-[#0F2E3F] border-b-[1px] px-2 pb-[12px]">
                    <p className="text-white text-[14px] font-normal leading-[14px]">
                      {item.name}
                    </p>
                    <img
                      src="/delete-icon.svg"
                      alt="delete-icon"
                      className="key-icons cursor-pointer"
                      onClick={() => openModalTwo(item.id)}
                    />
                  </div>
                  <div className="flex justify-between ">
                    <div className="flex justify-between  py-[11px] ml-2 gap-[20px] items-center ">
                      <span className="text-white text-[12px]">Public key</span>
                      <div className="flex gap-[10px] items-center">
                        <img
                          src="/eye-icon.svg"
                          alt="copy-icon"
                          className="key-icons cursor-pointer"
                          onClick={() =>
                            handleShowPublicKey("Public", item.public_key)
                          }
                        />
                        <CopyToClipboard
                          text={item.public_key}
                          onCopy={() => handleCopyPublic(item.id)}
                        >
                          <div>
                            {copiedPublic[item.id] ? (
                              <TickIcon />
                            ) : (
                              <CopyIcon />
                            )}
                          </div>
                        </CopyToClipboard>
                        <span onClick={() => openSheet("Public")}>
                          <InfoMobile className={"cursor-pointer"} />
                        </span>
                      </div>
                    </div>
                    <div>
                      <VerticalLine />
                    </div>
                    <div className="flex justify-between  py-[11px] gap-[20px] mr-2 items-center">
                      <span className="text-white text-[12px]">
                        Private key
                      </span>
                      <div className="flex gap-[10px] items-center">
                        <img
                          src="/eye-icon.svg"
                          alt="copy-icon"
                          className="key-icons cursor-pointer"
                          onClick={() => openModal(item.private_key)}
                        />
                        <span onClick={() => openSheet("Private")}>
                          <InfoMobile className={"cursor-pointer"} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}{" "}
            </div>
          </div>
          <div className="flex justify-between items-center space-x-4 mt-[26px]">
            <div className="flex items-center space-x-1">
              <button
                disabled={data?.previous === null}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="text-[7.6px] px-1 py-1 bg-[#0B2837] text-white rounded-md hover:bg-[#1B3D4F]"
              >
                ← Prev
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`text-[7.6px] px-3 py-1 rounded-md ${
                    currentPage === index + 1
                      ? "bg-teal-500 text-white"
                      : "bg-gray-700 text-white hover:bg-gray-600"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={data?.next === null}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="text-[7.6px] px-1 py-1 bg-[#0B2837] text-white rounded-md hover:bg-[#1B3D4F]"
              >
                Next →
              </button>
            </div>

            <div className="flex items-center space-x-2 text-white">
              <select
                value={itemPerPage}
                onChange={(e) => setItemPerPage(e.target.value)}
                id="per-page"
                className="!px-2 py-1 text-[7.6px] bg-[#0B2837] text-white rounded-md hover:bg-gray-600 border-none focus:ring focus:ring-teal-500 input-field"
              >
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
                <option value={50}>50 per page</option>
                <option value={100}>100 per page</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <BottomSheet visible={isSheetVisible} onDismiss={closeSheet}>
        <div className="text-[#FFFFFF] flex flex-col justify-start text-start gap-5 pt-4">
          <h1 className="text-[15px] leading-[17.07px] flex gap-[10px] items-center pl-6 pr-6">
            <Info className="w-[21px] h-[21px]" />
            {keyType === "Public" ? "Public Key" : "Private Key"}
          </h1>
          <Line />
          <p className="text-[13px] leading-[20px] flex gap-[10px] items-center pl-6 pr-6 font-sans">
            {keyType === "Public"
              ? "Your public key is safe to share with others. It allows senders to encrypt messages that can only be decrypted by you using your private key. You can freely distribute your public key so others can send you encrypted messages."
              : "Your private key is the most important aspect of your security. It must be kept secret – if someone gains access to it, they will be able to decrypt all of your messages. As long as your private key is in your possession, your data remains safe. Never share your private key with anyone."}
          </p>
        </div>
      </BottomSheet>

      <Modal show={isOpen} onClose={closeModal} className="bg-black">
        <Modal.Header className="pt-[10px] !pl-[0px] !pb-[2px] bg-[#1B3D4F] border-none"></Modal.Header>

        <Modal.Body className="bg-[#1B3D4F] !pt-[0px] !pb-[50px]">
          <img
            src="/alert-icon.svg"
            alt="alert-icon"
            className="mx-auto mb-[30px]"
          />
          <p className="text-white text-center text-[16px] md:text-[22px] leading-[30px]">
            Please make sure no body around you, keep your private key save and
            confidential.
          </p>
          <button
            onClick={handleShowPrivateKey}
            className="bg-[#57CBCC] rounded-[4px] text-[12px] md:text-[16px] font-normal leading-[19.5px] w-full max-w-[250px] h-[47px] flex justify-center items-center text-white mt-[37px] mx-auto"
          >
            Show me Private Key
          </button>
        </Modal.Body>
      </Modal>

      <Modal show={isOpenTwo} onClose={closeModalTwo} className="bg-black">
        <Modal.Header className="pt-[10px] !pl-[0px] !pb-[2px] bg-[#1B3D4F] border-none"></Modal.Header>

        <Modal.Body className="bg-[#1B3D4F] !pt-[0px] !pb-[50px]">
          <img
            src="/alert-icon.svg"
            alt="alert-icon"
            className="mx-auto mb-[30px]"
          />
          <p className="text-white text-center text-[16px] md:text-[22px] leading-[30px] w-full max-w-[499px] mx-auto">
            Are you sure you want to delete this key passcode?
          </p>
          <div className="flex gap-[15px] mt-[37px] justify-center max-w-[328px] w-full mx-auto">
            <button
              className="bg-transparent rounded-[4px] text-[16px] font-normal leading-[19.5px] w-full max-w-[250px] h-[47px] flex justify-center items-center text-[#57CBCC] border-[1px] border-[#57CBCC]"
              onClick={() => closeModalTwo(false)}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="bg-[#57CBCC] rounded-[4px] text-[16px] font-normal leading-[19.5px] w-full max-w-[250px] h-[47px] flex justify-center items-center text-white"
            >
              Delete
            </button>
          </div>
        </Modal.Body>
      </Modal>
      
      <Modal show={isOpenThree} onClose={closeModalThree} className="bg-black">
        <Modal.Header className="justify-center items-center flex bg-[#0E2E3F] border-none modal-h3">
          <div className="text-white text-[16px] md:text-[24px]">
            {" "}
            Key Pair Creation Wizard - neuro.RSA{" "}
          </div>
        </Modal.Header>
        <Formik>
          <Form>
            <Modal.Body className="bg-[#1B3D4F]">
              {step === 1 && (
                <div>
                  <h3 className="text-white text-[16px] md:text-[24px] font-normal leading-[33px]">
                    Enter Details
                  </h3>
                  <p className="text-[#CCCCCC] text-[12px] md:text-[16px] font-normal leading-[19px] mt-2">
                    Please enter your personal details below. If you want more
                    control over the parameters, click on the advanced Settings
                    button.
                  </p>
                  <div className="block w-90% mx-auto h-[2px] bg-[#0E2E3F] mt-[32px]"></div>
                  <div className="mt-[32px]">
                    <div className="flex flex-col">
                      <div className="flex justify-between">
                        <label htmlFor="name" className="text-white mb-[6px]">
                          Name:
                        </label>
                        <span className="text-white">(optional)</span>
                      </div>
                      <Field
                        type="text"
                        id="name"
                        name="name"
                        className="!bg-[#0E2E3F] !rounded-[5px] border-[#0E2E3F] input-field text-white"
                        value={formValues.name}
                        onChange={handleChange}
                      />
                      <ErrorMessage name="name" component="div" />
                    </div>
                    <div className="flex flex-col mt-[24px]">
                      <div className="flex justify-between">
                        <label htmlFor="email" className="text-white mb-[6px]">
                          Email:
                        </label>
                        <span className="text-white">(optional)</span>
                      </div>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className="!bg-[#0E2E3F] !rounded-[5px] border-[#0E2E3F] input-field text-white"
                        value={formValues.email}
                        onChange={handleChange}
                      />
                      <ErrorMessage name="email" component="div" />
                    </div>
                  </div>
                  <div className="block w-[98%] mx-auto h-[2px] bg-[#0E2E3F] mt-[20px]"></div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 className="text-white text-[16px] md:text-[24px] font-normal leading-[33px]">
                    Creating Key Pair...
                  </h3>
                  <p className="text-[#CCCCCC]  text-[12px] md:text-[16px] font-normal leading-[19px] mt-2">
                    The process of creating a key requires large amounts of
                    random numbers. This may require several minutes...
                  </p>
                  <div className="mt-4 flex justify-center h-[250px]">
                    <img
                      src="/loader.svg" // Update path as necessary
                      alt="Loading..."
                      width={50} // Adjust size as needed
                      height={50}
                      className="animate-spin"
                      style={{ animationDuration: "2s" }} // Set spin duration to 2 seconds
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <div className="flex gap-[18px]">
                    <img
                      src="./Group-1261153253.svg"
                      className="w-[35px] h-[24px] object-contain object-top mt-[10px]"
                    />
                    <div className="">
                      <h3 className="text-white text-[16px] md:text-[24px] font-normal leading-[33px]">
                        Creating Key Pair...
                      </h3>
                      <p className="text-[#CCCCCC] text-[13px] md:text-[16px] font-normal leading-[19px] mt-2">
                        Please enter the passphrase to protect your new key.
                      </p>
                    </div>
                  </div>
                  <div className="block w-90% mx-auto h-[2px] bg-[#0E2E3F] mt-[32px]"></div>
                  <div className="mt-[46px]">
                    <div className="flex flex-col">
                      <div className="">
                        <label
                          htmlFor="passphrase"
                          className="text-white mb-[6px] flex w-full"
                        >
                          Passphrase (Optional):
                        </label>
                      </div>
                      <Field
                        type="password"
                        id="passphrase"
                        name="passphrase"
                        className="!bg-[#0E2E3F] !rounded-[5px] border-[#0E2E3F] input-field text-white"
                        value={formValues.passphrase}
                        onChange={handleChange}
                      />
                      {errors.passphrase && (
                        <div className="text-red-500">{errors.passphrase}</div>
                      )}
                    </div>
                    <div className="flex flex-col mt-[24px]">
                      <label
                        htmlFor="confirmPassphrase"
                        className="text-white mb-[6px] flex w-full"
                      >
                        Repeat Passphrase:
                      </label>
                      <Field
                        type="password"
                        id="confirmPassphrase"
                        name="confirmPassphrase"
                        className="!bg-[#0E2E3F] !rounded-[5px] border-[#0E2E3F] input-field text-white"
                        value={formValues.confirmPassphrase}
                        onChange={handleChange}
                      />
                      {errors.passphrase && (
                        <div className="text-red-500">{errors.passphrase}</div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <div className="flex gap-[18px]">
                    <img
                      src="./Group-1261153253.svg"
                      className="w-[35px] h-[24px] object-contain object-top mt-[10px]"
                    />
                    <div className="">
                      <h3 className="text-white text-[16px] md:text-[24px] font-normal leading-[33px]">
                        Key Pair Successfully Created
                      </h3>
                      <p className="text-[#CCCCCC] text-[12px] md:text-[16px] font-normal leading-[19px] mt-2">
                        You new key pair was created successfully. Please find
                        details on this result and some suggested next steps
                        below.
                      </p>
                    </div>
                  </div>
                  <div className="block w-90% mx-auto h-[2px] bg-[#0E2E3F] my-[32px]"></div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="message"
                      className="text-white text-[16px] md:text-[24px] font-normal leading-[33px] mb-[6px] flex w-full"
                    >
                      Result
                    </label>
                    <Field
                      as="textarea"
                      name="message"
                      className="!bg-[#0E2E3F] !rounded-[5px] text-[12px] md:text-[16px] text-white input-field"
                      rows="6"
                      col="40"
                      disabled
                      value={`Key Pair created successfully. Fingerprint: ${Array(
                        5
                      )
                        .fill()
                        .map(() => Math.random().toString(36).substring(2, 15))
                        .join("")
                        .toUpperCase()}`}
                    />
                    <label
                      htmlFor="NextSteps"
                      className="text-white text-[16px] md:text-[24px] font-normal leading-[20px] md:leading-[33px] mt-[5px] md:mt-[32px] mb-[6px] flex w-full"
                    >
                      Next Steps
                    </label>
                    <Button
                      type="button"
                      id="passphrase"
                      name="passphrase"
                      className="!bg-[#0E2E3F] !rounded-[5px] text-[12px] md:text-[16px] border-[#0E2E3F] text-white input-field input-field"
                      onClick={handleBackupOfKeypair}
                    >
                      Make a Backup Of Your Key Pair...
                    </Button>
                  </div>
                </div>
              )}
            </Modal.Body>

            <Modal.Footer className="bg-[#1B3D4F] justify-end border-[0px] pt-0 footer-btn">
              {step === 1 && (
                <>
                  <Button
                    onClick={nextStep}
                    className="!bg-[#57CBCC] hover:bg-red-700 text-white font-sans font-bold py-2 px-4 rounded-[5px] modal-btn"
                  >
                    Next
                  </Button>
                  <Button
                    onClick={closeModalThree}
                    className="bg-[#0E2E3F] border-[#345360] hover:bg-[#345360] font-sans text-white font-bold py-2 px-4 rounded-[5px] modal-btn"
                  >
                    Cancel
                  </Button>
                </>
              )}

              {step === 2 && (
                <>
                  <Button
                    onClick={closeModalThree}
                    className="bg-[#0E2E3F] border-[#345360] hover:bg-[#345360] text-white font-bold py-2 px-4 rounded-[5px] modal-btn"
                  >
                    Cancel
                  </Button>
                </>
              )}

              {step === 3 && (
                <>
                  <Button
                    onClick={() => {
                      closeModalThree();
                      setLoading(false);
                    }}
                    className="bg-[#0E2E3F] border-[#345360] hover:bg-[#345360] font-sans text-white font-bold py-2 px-4 rounded-[5px] modal-btn"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-[#13425c] border-[#345360] hover:bg-[#345360] font-sans text-white font-bold py-2 px-4 rounded-[5px] modal-btn"
                  >
                    OK
                  </Button>
                </>
              )}

              {step === 4 && (
                <>
                  <Button
                    onClick={() => {
                      closeModalThree();
                    }}
                    className="!bg-[#57CBCC] hover:bg-red-700 text-white font-sans font-bold py-2 px-4 rounded-[5px]"
                  >
                    Finish
                  </Button>
                  <Button
                    onClick={closeModalThree}
                    className="bg-[#0E2E3F] border-[#345360] hover:bg-[#345360] font-sans text-white font-bold py-2 px-4 rounded-[5px]"
                  >
                    Cancel
                  </Button>
                </>
              )}
            </Modal.Footer>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default MainHome;

const Line = () => (
  <svg
    width="389"
    height="2"
    viewBox="0 0 389 2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1 1H389" stroke="#0F2E3F" stroke-linecap="round" />
  </svg>
);
const VerticalLine = () => (
  <svg
    width="8"
    height="42"
    viewBox="0 0 2 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1 41L1 0.999998" stroke="#0F2E3F" stroke-linecap="round" />
  </svg>
);
const TickIcon = () => (
  <img
    src="/tick-icon.svg"
    alt="tick-icon"
    className="w-[17px] h-[17px] md:w-[24px] md:h-[24px]"
  />
);

const CopyIcon = () => (
  <img
    src="/copy-icon.svg"
    alt="copy-icon"
    className="cursor-pointer w-[15px] h-[15px] md:w-[20px] md:h-[22px]"
  />
);

const Info = () => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="cursor-pointer"
  >
    <path
      d="M11.25 15V9H8.25V10.5H9.75V15H7.5V16.5H13.5V15H11.25ZM10.5 4.5C10.2775 4.5 10.06 4.56598 9.87498 4.6896C9.68998 4.81321 9.54578 4.98891 9.46063 5.19448C9.37549 5.40005 9.35321 5.62625 9.39662 5.84448C9.44002 6.06271 9.54717 6.26316 9.7045 6.42049C9.86184 6.57783 10.0623 6.68497 10.2805 6.72838C10.4988 6.77179 10.725 6.74951 10.9305 6.66436C11.1361 6.57922 11.3118 6.43502 11.4354 6.25002C11.559 6.06501 11.625 5.8475 11.625 5.625C11.625 5.32663 11.5065 5.04048 11.2955 4.8295C11.0845 4.61853 10.7984 4.5 10.5 4.5Z"
      fill="white"
    />
    <path
      d="M10.5 21C8.4233 21 6.39323 20.3842 4.66652 19.2304C2.9398 18.0767 1.59399 16.4368 0.799269 14.5182C0.00454947 12.5996 -0.203385 10.4884 0.201759 8.45156C0.606904 6.41475 1.60693 4.54383 3.07538 3.07538C4.54383 1.60693 6.41475 0.606904 8.45156 0.201759C10.4884 -0.203385 12.5996 0.00454947 14.5182 0.799269C16.4368 1.59399 18.0767 2.9398 19.2304 4.66652C20.3842 6.39323 21 8.4233 21 10.5C21 13.2848 19.8938 15.9555 17.9246 17.9246C15.9555 19.8938 13.2848 21 10.5 21ZM10.5 1.5C8.71997 1.5 6.97991 2.02784 5.49987 3.01678C4.01983 4.00571 2.86628 5.41132 2.18509 7.05585C1.5039 8.70039 1.32567 10.51 1.67294 12.2558C2.0202 14.0016 2.87737 15.6053 4.13604 16.864C5.39471 18.1226 6.99836 18.9798 8.74419 19.3271C10.49 19.6743 12.2996 19.4961 13.9442 18.8149C15.5887 18.1337 16.9943 16.9802 17.9832 15.5001C18.9722 14.0201 19.5 12.28 19.5 10.5C19.5 8.11305 18.5518 5.82387 16.864 4.13604C15.1761 2.44822 12.887 1.5 10.5 1.5Z"
      fill="white"
    />
  </svg>
);

const InfoMobile = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="cursor-pointer"
  >
    <path
      d="M11.25 15V9H8.25V10.5H9.75V15H7.5V16.5H13.5V15H11.25ZM10.5 4.5C10.2775 4.5 10.06 4.56598 9.87498 4.6896C9.68998 4.81321 9.54578 4.98891 9.46063 5.19448C9.37549 5.40005 9.35321 5.62625 9.39662 5.84448C9.44002 6.06271 9.54717 6.26316 9.7045 6.42049C9.86184 6.57783 10.0623 6.68497 10.2805 6.72838C10.4988 6.77179 10.725 6.74951 10.9305 6.66436C11.1361 6.57922 11.3118 6.43502 11.4354 6.25002C11.559 6.06501 11.625 5.8475 11.625 5.625C11.625 5.32663 11.5065 5.04048 11.2955 4.8295C11.0845 4.61853 10.7984 4.5 10.5 4.5Z"
      fill="white"
    />
    <path
      d="M10.5 21C8.4233 21 6.39323 20.3842 4.66652 19.2304C2.9398 18.0767 1.59399 16.4368 0.799269 14.5182C0.00454947 12.5996 -0.203385 10.4884 0.201759 8.45156C0.606904 6.41475 1.60693 4.54383 3.07538 3.07538C4.54383 1.60693 6.41475 0.606904 8.45156 0.201759C10.4884 -0.203385 12.5996 0.00454947 14.5182 0.799269C16.4368 1.59399 18.0767 2.9398 19.2304 4.66652C20.3842 6.39323 21 8.4233 21 10.5C21 13.2848 19.8938 15.9555 17.9246 17.9246C15.9555 19.8938 13.2848 21 10.5 21ZM10.5 1.5C8.71997 1.5 6.97991 2.02784 5.49987 3.01678C4.01983 4.00571 2.86628 5.41132 2.18509 7.05585C1.5039 8.70039 1.32567 10.51 1.67294 12.2558C2.0202 14.0016 2.87737 15.6053 4.13604 16.864C5.39471 18.1226 6.99836 18.9798 8.74419 19.3271C10.49 19.6743 12.2996 19.4961 13.9442 18.8149C15.5887 18.1337 16.9943 16.9802 17.9832 15.5001C18.9722 14.0201 19.5 12.28 19.5 10.5C19.5 8.11305 18.5518 5.82387 16.864 4.13604C15.1761 2.44822 12.887 1.5 10.5 1.5Z"
      fill="white"
    />
  </svg>
);
