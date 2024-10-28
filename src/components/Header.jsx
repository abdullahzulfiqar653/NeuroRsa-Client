import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isAuthenticated, setSearch } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenFile, setIsDropdownOpenFile] = useState(false);

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
            <div
              className="origin-top-right top-9 absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-[#1c3d4f] ring-1 ring-[#345360] ring-opacity-5 focus:outline-none z-20 
           transition-opacity duration-300 hover:opacity-100 hover:delay-300"
            >
              <div className="py-4">
                {isAuthenticated && (
                  <>
                    <div className="relative group hover:bg-[#327C85] border-l-[2px] border-l-[#1c3d4f] hover:border-l-[#57CACC]">
                      <Link
                        to={"/what-is-this?"}
                        className="block px-4 py-2 text-sm font-sans text-[10px] md:text-[20px] text-white w-full text-left hover-btn"
                      >
                        What is this?
                      </Link>
                    </div>{" "}
                  </>
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
                    onClick={() => {
                      logout();
                      setSearch("");
                    }}
                  >
                    Logout
                  </Link>
                )}
                {!isAuthenticated && (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm text-white font-sans text-[10px] md:text-[20px] w-full text-left hover:bg-[#327C85] border-l-[2px] border-l-[#1c3d4f] hover:border-l-[#57CACC]"
                    >
                      Login
                    </Link>
                    <Link
                      to={"/what-is-this?"}
                      className="block px-4 py-2 text-sm font-sans text-[10px] md:text-[20px] text-white w-full text-left hover-btn"
                    >
                      What is this?
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <div
          onClick={() => setSearch("")}
          className="flex flex-col items-start justify-start pt-px px-0 pb-0"
        >
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
        <div
          onClick={() => setSearch("")}
          className="flex flex-col items-start justify-start pt-px px-0 pb-0"
        >
          <NavLink
            to="/recipients-list"
            className={({ isActive }) =>
              `py-[10px] cursor-pointer [text-decoration:none] relative text-[inherit]  text-white inline-block max-w-[121px] z-[1] font-sans leading-[21.94px]  xs:text-[10px] sm:text-[10px] md:text-[18px] lg:text-[18px] opacity-[72%] 
                 ${isActive ? "border-b-2 border-mediumturquoise" : ""}`
            }
          >
            My Recipients
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
              Notepad
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
    </div>
  );
};

export default Header;
