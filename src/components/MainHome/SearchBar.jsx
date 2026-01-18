import React from "react";
import { Field, Form, Formik } from "formik";

const SearchBar = ({ search, setSearch, openModalThree }) => {
  return (
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
      {/* <Search /> */}
      <button
        onClick={openModalThree}
        className="w-[212px] bg-[#57CBCC] hover:bg-[#43a5a7] text-white rounded-[4.38px]"
      >
        New Key Pair
      </button>
    </div>
  );
};

export default SearchBar;
