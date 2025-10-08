import React from "react";
import {
  Info,
  InfoMobile,
  VerticalLine,
  TickIcon,
  Line,
  CopyIcon,
} from "../../assets/Icons";
import { Field, Form, Formik } from "formik";
import CopyToClipboard from "react-copy-to-clipboard";

const MobileViewTable = ({
  data,
  search,
  setSearch,
  openModalThree,
  handleShowPublicKey,
  handleCopyPublic,
  openModal,
  openModalTwo,
  copiedPublic,
  currentPage,
  totalPages,
  setCurrentPage,
  itemPerPage,
  setItemPerPage,
  openSheet,
}) => {
  return (
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
          onClick={openModalThree}
          className="w-[130px] ml-1 text-[12px] bg-[#57CBCC] hover:bg-[#43a5a7] h-[30px] text-white rounded-[4.38px]"
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
                        {copiedPublic[item.id] ? <TickIcon /> : <CopyIcon />}
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
                  <span className="text-white text-[12px]">Private key</span>
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
            className="text-[9px] px-1 py-1 bg-[#0B2837] text-white rounded-md hover:bg-[#1B3D4F]"
          >
            ← Prev
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`text-[9px] px-3 py-1 rounded-md ${
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
            className="text-[9px] px-1 py-1 bg-[#0B2837] text-white rounded-md hover:bg-[#1B3D4F]"
          >
            Next →
          </button>
        </div>

        <div className="flex items-center space-x-2 text-white">
          <select
            value={itemPerPage}
            onChange={(e) => setItemPerPage(e.target.value)}
            id="per-page"
            className="!px-4 py-1 text-[9px] bg-[#0B2837] text-white rounded-md border-none focus:ring focus:ring-teal-500 input-field"
          >
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
            <option value={100}>100 per page</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default MobileViewTable;
