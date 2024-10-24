import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Header from "../components/Header";
import { Formik, Form, Field } from "formik";
import { Table, Modal } from "flowbite-react";
import useGetRecipients from "../hooks/useGetRecipients";
import { useAuth } from "../AuthContext";
import { useLocation } from "react-router-dom";
import useDeleteRecipients from "../hooks/useDeleteRecipients";
import CreateRecipientModal from "../components/CreateRecipientModal";

const RecipentsList = () => {
  const { search, setSearch, handleModal } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const { data: recipients, refetch: refetchRecipients } = useGetRecipients(
    search,
    currentPage
  );
  const location = useLocation();

  const [isOpenTwo, setIsOpenTwo] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { mutate: deleteKeyPair } = useDeleteRecipients();

  const totalPages = Math.ceil(recipients?.count / 10);
  useEffect(() => {
    refetchRecipients();
  }, [location, refetchRecipients, isOpenTwo, currentPage]);

  const closeModalTwo = () => setIsOpenTwo(false);
  const openModalTwo = (id) => {
    setSelectedUserId(id);
    setIsOpenTwo(true);
  };

  const handleDelete = () => {
    deleteKeyPair(selectedUserId, {
      onSuccess: (response) => {
        toast.success(`Recipient Deleted successfully.`);
        setIsOpenTwo(false);
        refetchRecipients();
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

  return (
    <div>
      <div className={`bg-[#0f2e3f] md:h-[100vh]`}>
        <div className="bg-[#0B2837] w-full items-center">
          <Header />
        </div>
        <div className="overflow-x-auto px-[32px] bg-[#0f2e3f] desktop-view-table xs:hidden sm:hidden md:block lg:block">
          <div className="flex justify-around w-full mb-[30px]  mt-[25px] h-[53px]">
            {" "}
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
              onClick={handleModal}
              className="w-[212px] bg-[#57CBCC] text-white rounded-[4.38px]"
            >
              Create New Recipient
            </button>
          </div>
          <div className="border-[1px] relative border-[#1B3D4F] p-[24px] h-[450px] overflow-y-auto">
            <Table className="bg-[#1c3d4f] rounded-t-[12px] w-[750px] relative z-10">
              <Table.Head className="bg-[#0f2e3f]">
                <Table.HeadCell className="bg-[#1c3d4f] normal-case text w-[575px] text-white border-r-[5px] border-[#0f2e3f] rounded-t-[12px]">
                  Recipient Names
                </Table.HeadCell>
                <Table.HeadCell className="bg-[#1c3d4f] normal-case text-white w-[95px]">
                  Actions
                </Table.HeadCell>
                <Table.HeadCell className="bg-[#1c3d4f]"></Table.HeadCell>
                <Table.HeadCell className="bg-[#1c3d4f] rounded-tr-[12px]"></Table.HeadCell>
              </Table.Head>
              <Table.Body className="">
                {recipients?.results?.map((item, index) => (
                  <Table.Row
                    key={index}
                    className="border-b-[5px] !border-t-[5px] border-[#0f2e3f] bg-[#1c3d4f]"
                  >
                    <Table.Cell className="text-white  border-r-[5px] border-[#0f2e3f]">
                      {item.name}
                    </Table.Cell>
                    <Table.Cell className="text-white">
                      <div className="flex justify-between">
                        <div className="flex gap-[20px] items-center">
                          <img
                            src="/editBtn.svg"
                            alt="copy-icon"
                            className="cursor-pointer"
                            onClick={() => handleModal(item)}
                          />

                          <img
                            src="/delete-icon.svg"
                            alt="delete-icon"
                            onClick={() => openModalTwo(item.id)}
                          />
                        </div>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            <img
              src="/bg-vector-bkp.png"
              className="absolute top-9 right-1 opacity-40"
            />
          </div>
          <div className="flex justify-between items-center space-x-4 mt-[64px] mb-[150px]">
            <div className="flex items-center space-x-2">
              <button
                disabled={recipients?.previous === null}
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
                disabled={recipients?.next === null}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-3 py-1 bg-[#0B2837] text-white rounded-md hover:bg-[#1B3D4F]"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
        <div className="mobile-view-table h-full pb-7 xs:block sm:block md:hidden lg:hidden px-[16px]">
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
              onClick={handleModal}
              className="w-[130px] ml-1 text-[12px] bg-[#57CBCC] h-[30px] text-white rounded-[4.38px]"
            >
              Create New Recipient
            </button>
          </div>
          <div className="border-[1px] border-[#1B3D4F] p-[12px]">
            <div className="flex w-full gap-1">
              <div className="text-white w-[75%] bg-[#1B3D4F] rounded-t-[8px] px-[16px] py-[8px] text-[12px] font-normal leading-[16.7px] mb-[15px]">
                Name
              </div>
              <div className="text-white w-[25%] bg-[#1B3D4F] rounded-t-[8px] px-[16px] py-[8px] text-[12px] font-normal leading-[16.7px] mb-[15px]">
                Actions
              </div>
            </div>
            <div className="flex flex-col  w-full h-[430px] overflow-y-auto">
              {recipients?.results?.map((item, index) => (
                <div
                  key={index}
                  className="key-item flex gap-1 w-full h-[40px] mb-[6px]"
                >
                  <div className="flex w-[75%] bg-[#1B3D4F] items-center pl-3 ">
                    <p className="text-white text-[14px] font-normal leading-[14px]">
                      {item.name}
                    </p>
                  </div>
                  <div className="flex w-[25%] bg-[#1B3D4F] items-center pl-3 ">
                    <div className="flex gap-[10px] items-center">
                      <img
                        src="/editBtn.svg"
                        alt="copy-icon"
                        className="key-icons cursor-pointer"
                      />
                      <img
                        src="/delete-icon.svg"
                        alt="delete-icon"
                        className="key-icons cursor-pointer"
                        onClick={() => openModalTwo(item.id)}
                      />
                    </div>
                  </div>
                </div>
              ))}{" "}
            </div>
          </div>
          <div className="flex justify-between items-center space-x-4 mt-[26px]">
            <div className="flex items-center space-x-1">
              <button
                disabled={recipients?.previous === null}
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
                disabled={recipients?.next === null}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="text-[7.6px] px-1 py-1 bg-[#0B2837] text-white rounded-md hover:bg-[#1B3D4F]"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
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
         <p className="text-white text-center text-[16px] md:text-[22px] leading-[30px] w-full max-w-[499px] mx-auto">
           Are you sure you want to delete this recipient?
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

export default RecipentsList;
