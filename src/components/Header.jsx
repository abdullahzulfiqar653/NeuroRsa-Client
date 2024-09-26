import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Button, Modal } from "flowbite-react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../AuthContext";
import useCreateKeypair from "../hooks/useCreateKeypair";

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [step, setStep] = useState(1);
  const { isAuthenticated } = useAuth();
  const { mutate } = useCreateKeypair();
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [keypair, setKeypair] = useState({});
  const [loading, setLoading] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenFile, setIsDropdownOpenFile] = useState(false);

  useEffect(() => {
    if (step === 2) {
      const timer = setTimeout(() => {
        setStep(3);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const closeModal = () => setIsOpen(false);
  const nextStep = () => setStep((prevStep) => Math.min(prevStep + 1, 4));
  const prevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 1));
  const openModal = () => {
    setIsOpen(true);
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

  // Handle Dropdown
  const handleMouseEnterDropdown = () => {
    setIsDropdownOpen(true);
  };
  const handleMouseLeaveDropdown = () => {
    setIsDropdownOpen(false);
  };
  const handleMouseEnterDropdownFile = () => {
    setIsDropdownOpenFile(true);
  };
  const handleMouseLeaveDropdownFile = () => {
    setIsDropdownOpenFile(false);
  };

  return (
    <div className="w-full">
      <div className="w-full bg-[#1b3d4f] flex justify-center font-bold text-white py-[0.6rem]">
        <svg
          width="25.6"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.5516 7.62063V0L25.1033 8.96545V16.5861L12.5516 7.62063ZM0 16.586V8.96534L12.5516 17.9308V25.5514L0 16.586ZM0 0.448385V7.62075L25.1033 25.5516V17.931L0 0.448385Z"
            fill="white"
          />
        </svg>
        <h1
          onClick={() => navigate("/")}
          className="ml-2 text-[22px] leading-[30.62px] cursor-pointer"
        >
          neuro.RSA
        </h1>
      </div>
      <div className=" w-full z-20 self-stretch flex flex-row xs:justify-between sm:justify-start items-center   xs:px-4 md:px-8 lg:px-8  box-border xs:gap-[15px] sm:gap-[73px] md:gap-[73px] lg:gap-[73px]  max-w-full mq750:gap-9 mq450:flex-wrap">
        <div
          className="relative inline-block text-left"
          onMouseEnter={handleMouseEnterDropdownFile}
          onMouseLeave={handleMouseLeaveDropdownFile}
        >
          <Link className="py-[10px] cursor-pointer [text-decoration:none] text-white  relative text-[inherit] inline-block max-w-[121px] z-[1] font-sans leading-[24.38px]  xs:text-[10px] sm:text-[10px] md:text-[20px] lg:text-[20px] opacity-[72%]">
            File
          </Link>

          {isDropdownOpenFile && (
           <div className="origin-top-right top-9 absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-[#1c3d4f] ring-1 ring-[#345360] ring-opacity-5 focus:outline-none z-20 
           transition-opacity duration-300 hover:opacity-100 hover:delay-300">
              <div className="py-4">
                {isAuthenticated && (
                  <div className="relative group hover:bg-[#327C85] border-l-[2px] border-l-[#1c3d4f] hover:border-l-[#57CACC]">
                    <button
                      className="block px-4 py-2 text-sm font-sans text-[10px] md:text-[20px] text-white w-full text-left hover-btn"
                      onClick={() => {
                        openModal();
                        setFormValues({});
                        setErrors({});
                      }}
                    >
                      New Key Pair
                    </button>
                  </div>
                )}

                {/* <button className="block px-4 py-2 text-sm text-white w-full text-left z-20 hover:bg-[#327C85] border-l-[2px] border-l-[#1c3d4f] hover:border-l-[#57CACC]">
                  Import
                </button>
                <button className="block px-4 py-2 text-sm text-white w-full text-left hover:bg-[#327C85] border-l-[2px] border-l-[#1c3d4f] hover:border-l-[#57CACC]">
                  Decrypt
                </button>
                <button className="block px-4 py-2 text-sm text-white w-full text-left hover:bg-[#327C85] border-l-[2px] border-l-[#1c3d4f] hover:border-l-[#57CACC]">
                  Encrypt
                </button> */}
                {isAuthenticated && (
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-white font-sans text-[10px] md:text-[20px] w-full text-left hover:bg-[#327C85] border-l-[2px] border-l-[#1c3d4f] hover:border-l-[#57CACC]"
                    onClick={logout}
                  >
                    Logout
                  </Link>
                )}
                {!isAuthenticated && (
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-white font-sans text-[10px] md:text-[20px] w-full text-left hover:bg-[#327C85] border-l-[2px] border-l-[#1c3d4f] hover:border-l-[#57CACC]"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col items-start justify-start pt-px px-0 pb-0">
          <NavLink
            to="/main-home"
            className={({ isActive }) =>
              `py-[10px] cursor-pointer [text-decoration:none] relative text-[inherit]  text-white inline-block max-w-[121px] z-[1] font-sans leading-[21.94px]  xs:text-[10px] sm:text-[10px] md:text-[18px] lg:text-[18px] opacity-[72%] 
                 ${isActive ? "border-b-2 border-mediumturquoise" : ""}`
            }
          >
            My KeyPairs
          </NavLink>
        </div>
        <div className="flex flex-col items-start justify-start pt-px px-0 pb-0">
          <div
            className="relative inline-block text-left"
            onMouseEnter={handleMouseEnterDropdown}
            onMouseLeave={handleMouseLeaveDropdown}
          >
            <NavLink
              to="/my-recipients"
              className={({ isActive }) =>
                `py-[10px] cursor-pointer [text-decoration:none] relative text-[inherit] text-white inline-block max-w-[121px] z-[1] font-sans leading-[21.94px] xs:text-[10px] sm:text-[10px] md:text-[18px] lg:text-[18px] opacity-[72%] 
                 ${isActive ? "border-b-2 border-mediumturquoise" : ""}`
              }
            >
              My Recipients
            </NavLink>

            {/* {isDropdownOpen && (
              <div className="origin-top-right top-10  absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-[#1c3d4f]  ring-1 ring-[#345360] ring-opacity-5 focus:outline-none z-20">
                <div className="py-4">
                  <div className="relative group hover:bg-[#327C85] border-l-[2px] border-l-[#1c3d4f] hover:border-l-[#57CACC]">
                    <button className="block px-4 py-2 text-sm text-white w-full text-left hover-btn">
                      Recipient Name1
                      <div className="sub-menu absolute top-0 left-full mt-0 ml-1 w-48 rounded-md shadow-lg bg-[#1c3d4f] ring-1 ring-black ring-opacity-5 z-20">
                        <button className="block px-4 py-2 text-sm text-white w-full text-left hover:bg-[#327C85] border-l-[2px] border-l-[#1c3d4f] hover:border-l-[#57CACC]">
                          Add
                        </button>
                        <button className="block px-4 py-2 text-sm text-white w-full text-left hover:bg-[#327C85] border-l-[2px] border-l-[#1c3d4f] hover:border-l-[#57CACC]">
                          Edit
                        </button>
                        <button className="block px-4 py-2 text-sm text-white w-full text-left hover:bg-[#327C85] border-l-[2px] border-l-[#1c3d4f] hover:border-l-[#57CACC]">
                          Delete
                        </button>
                      </div>
                    </button>
                  </div>

                  <button className="block px-4 py-2 text-sm text-white w-full text-left z-20 hover:bg-[#327C85] border-l-[2px] border-l-[#1c3d4f] hover:border-l-[#57CACC]">
                    Michael X
                  </button>
                  <button className="block px-4 py-2 text-sm text-white w-full text-left hover:bg-[#327C85] border-l-[2px] border-l-[#1c3d4f] hover:border-l-[#57CACC]">
                    Kevin Kozi
                  </button>
                  <button className="block px-4 py-2 text-sm text-white w-full text-left hover:bg-[#327C85] border-l-[2px] border-l-[#1c3d4f] hover:border-l-[#57CACC]">
                    Alexander Kooi
                  </button>
                  <button className="block px-4 py-2 text-sm text-white w-full text-left hover:bg-[#327C85] border-l-[2px] border-l-[#1c3d4f] hover:border-l-[#57CACC]">
                    Recipient Name5
                  </button>
                  <button className="block px-4 py-2 text-sm text-white w-full text-left hover:bg-[#327C85] border-l-[2px] border-l-[#1c3d4f] hover:border-l-[#57CACC]">
                    Recipient Name6
                  </button>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>
      <Modal show={isOpen} onClose={closeModal} className="bg-black">
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
                    onClick={closeModal}
                    className="bg-[#0E2E3F] border-[#345360] hover:bg-[#345360] font-sans text-white font-bold py-2 px-4 rounded-[5px] modal-btn"
                  >
                    Cancel
                  </Button>
                </>
              )}

              {step === 2 && (
                <>
                  <Button
                    onClick={closeModal}
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
                      closeModal();
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
                      navigate(-1);
                      closeModal();
                    }}
                    className="!bg-[#57CBCC] hover:bg-red-700 text-white font-sans font-bold py-2 px-4 rounded-[5px]"
                  >
                    Finish
                  </Button>
                  <Button
                    onClick={closeModal}
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

export default Header;
