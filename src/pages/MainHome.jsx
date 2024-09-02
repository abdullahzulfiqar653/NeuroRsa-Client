import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Header from "../components/Header";
import { Formik, Form, Field } from "formik";
import { Table, Modal } from "flowbite-react";
import { useNavigate, useLocation } from "react-router-dom";
import useGetKeyPairs from "../hooks/useGetKeyPairs";
import CopyToClipboard from "react-copy-to-clipboard";
import useDeleteKeyPairs from "../hooks/useDeleteKeyPairs";

const MainHome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTwo, setIsOpenTwo] = useState(false);
  const [copiedPublic, setCopiedPublic] = useState(false);
  const [copiedPrivate, setCopiedPrivate] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [privateKey, setPrivateKey] = useState(null);

  const [itemPerPage, setItemPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { mutate: deleteKeyPair } = useDeleteKeyPairs();
  const { data, refetch } = useGetKeyPairs(currentPage, itemPerPage);
  const totalPages = Math.ceil(data?.count / itemPerPage);
  useEffect(() => {
    refetch();
  }, [location, refetch, isOpenTwo, currentPage]);

  const handleShowPublicKey = (type, text) => {
    navigate("/key-display", {
      state: { keyType: type, keyText: text },
    });
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
        toast.success(`Keypair Deleted successfully.`, {
          className: "toast-message",
        });
        setIsOpenTwo(false);
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

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredData = data?.results.filter((item) => {
    const email = item.email?.toLowerCase() || "";
    const name = item.name?.toLowerCase() || "";
    return email.includes(search) || name.includes(search);
  });

  return (
    <div>
      <div className={`bg-[#0f2e3f] h-[100vh]`}>
        <div className="bg-[#0B2837] w-full items-center">
          <Header />
        </div>
        <div className="overflow-x-auto px-[32px] desktop-view-table xs:hidden sm:hidden md:block lg:block">
          <div className="mb-[30px] mt-[40px]">
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
                      onChange={handleSearchChange}
                      className="w-full md:max-w-[500px] lg:max-w-[903px] h-[53px] input-field block  pl-10 pr-4 py-2 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="border-[1px] border-[#1B3D4F] p-[24px] h-[450px] overflow-y-scroll">
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
                {filteredData?.map((item, index) => (
                  <Table.Row
                    key={index}
                    className="border-b-[5px] !border-t-[5px] border-[#0f2e3f] bg-[#1c3d4f]"
                  >
                    <Table.Cell className="text-white  border-r-[5px] border-[#0f2e3f]">
                      {item.name}
                    </Table.Cell>
                    <Table.Cell className="flex gap-[40px] justify-between text-white  border-r-[5px] border-[#0f2e3f]">
                      Public key
                      <div className="flex gap-[10px] items-center">
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
                          onCopy={() => setCopiedPublic(true)}
                        >
                          <div>
                            {copiedPublic ? <TickIcon /> : <CopyIcon />}
                          </div>
                        </CopyToClipboard>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="text-white">
                      <div className="flex justify-between">
                        Private key
                        <div className="flex gap-[10px] items-center">
                          <img
                            src="/eye-icon.svg"
                            alt="copy-icon"
                            className="cursor-pointer"
                            onClick={() => openModal(item.private_key)}
                          />

                          <CopyToClipboard
                            text={item.private_key}
                            onCopy={() => setCopiedPrivate(true)}
                          >
                            <div>
                              {copiedPrivate ? <TickIcon /> : <CopyIcon />}
                            </div>
                          </CopyToClipboard>
                        </div>
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
          <div className="flex justify-between items-center space-x-4 mt-[64px]">
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
        <div className="mobile-view-table xs:block sm:block md:hidden lg:hidden px-[16px]">
          <div className="mb-[12px] mt-[14px]">
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
                      onChange={handleSearchChange}
                      className="input-field block w-full pl-10 pr-4 py-2 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="border-[1px] border-[#1B3D4F] p-[12px]">
            <div className="text-white bg-[#1B3D4F] rounded-t-[8px] px-[16px] py-[8px] text-[12px] font-normal leading-[16.7px] mb-[15px]">
              Key Types
            </div>

            <div className="flex flex-col  w-full h-[320px] overflow-y-scroll">
              {filteredData?.map((item, index) => (
                <div
                  key={index}
                  className="key-item bg-[#1B3D4F] px-[6px] py-[11px] w-full mb-[6px]"
                >
                  <div className="flex justify-between border-b-[#0F2E3F] border-b-[1px] pb-[9px]">
                    <p className="text-white text-[14px] font-normal leading-[17px]">
                      {item.email}
                    </p>
                    <img
                      src="/delete-icon.svg"
                      alt="delete-icon"
                      className="key-icons cursor-pointer"
                      onClick={() => openModalTwo(item.id)}
                    />
                  </div>
                  <div className="flex pt-[14px] justify-between">
                    <div className="flex justify-between gap-[20px] items-center">
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
                          onCopy={() => setCopiedPublic(true)}
                        >
                          <img
                            src="/copy-icon.svg"
                            alt="copy-icon"
                            className="key-icons"
                          />
                        </CopyToClipboard>
                      </div>
                    </div>
                    <div className="flex justify-between gap-[20px] items-center">
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
                        <CopyToClipboard
                          text={item.public_key}
                          onCopy={() => setCopiedPublic(true)}
                        >
                          <img
                            src="/copy-icon.svg"
                            alt="copy-icon"
                            className="key-icons"
                          />
                        </CopyToClipboard>
                      </div>
                    </div>
                  </div>
                </div>
              ))}{" "}
            </div>
          </div>
          <div className="flex justify-between items-center space-x-4 mt-[64px]">
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
                className="!px-2 py-1 text-[7.6px] bg-gray-700 text-white rounded-md hover:bg-gray-600 border-none focus:ring focus:ring-teal-500 input-field"
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
      <Modal show={isOpen} onClose={closeModal} className="bg-black">
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
          <button
            onClick={handleShowPrivateKey}
            className="bg-[#57CBCC] rounded-[4px] text-[16px] font-normal leading-[19.5px] w-full max-w-[250px] h-[47px] flex justify-center items-center text-white mt-[37px] mx-auto"
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
          <p className="text-white text-center text-[22px] leading-[30px] w-full max-w-[499px] mx-auto">
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
    </div>
  );
};

export default MainHome;

const TickIcon = () => <img src="/tick-icon.svg" alt="tick-icon" />;

const CopyIcon = () => (
  <img src="/copy-icon.svg" alt="copy-icon" className="cursor-pointer" />
);
