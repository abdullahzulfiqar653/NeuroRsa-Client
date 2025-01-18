import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "reactjs-popup/dist/index.css";
import { useAuth } from "../AuthContext";
import BottomSheet from "../components/BottomSheet";
import Header from "../components/Header";
import useDeleteKeyPairs from "../hooks/useDeleteKeyPairs";
import useGetKeyPairs from "../hooks/useGetKeyPairs";
import { debounce } from "lodash";
import CreateKeypairModal from "../components/CreateKeypairModal";
import SearchBar from "../components/MainHone/SearchBar";
import KeyPairTable from "../components/MainHone/KeyPairTable";
import Pagination from "../components/MainHone/Pagination";
import MobileViewTable from "../components/MainHone/MobileViewTable";
import PrivateKeyModal from "../components/MainHone/PrivateKeyModal";
import DeleteKeyModal from "../components/MainHone/DeleteKeyModal";

const MainHome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { search, setSearch, openModal: openModalThree } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTwo, setIsOpenTwo] = useState(false);
  const [copiedPublic, setCopiedPublic] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [privateKey, setPrivateKey] = useState(null);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { mutate: deleteKeyPair, isPending } = useDeleteKeyPairs();
  const { data, refetch } = useGetKeyPairs(search, currentPage, itemPerPage);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(data?.count / itemPerPage)
  );

  const debouncedRefetch = debounce(() => {
    refetch();
  }, 500);
  useEffect(() => {
    setTotalPages(Math.ceil(data?.count / itemPerPage));
    if (search) {
      setCurrentPage(1);
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
      onSuccess: () => {
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
          <SearchBar
            search={search}
            setSearch={setSearch}
            openModalThree={openModalThree}
          />

          <KeyPairTable
            data={data}
            handleShowPublicKey={handleShowPublicKey}
            handleCopyPublic={handleCopyPublic}
            openModal={openModal}
            openModalTwo={openModalTwo}
            copiedPublic={copiedPublic}
          />

          <Pagination
            data={data}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            itemPerPage={itemPerPage}
            setItemPerPage={setItemPerPage}
          />
        </div>

        {/* For moblie view */}
        <MobileViewTable
          data={data}
          search={search}
          setSearch={setSearch}
          openModalThree={openModalThree}
          handleShowPublicKey={handleShowPublicKey}
          handleCopyPublic={handleCopyPublic}
          openModal={openModal}
          openModalTwo={openModalTwo}
          copiedPublic={copiedPublic}
          currentPage={currentPage}
          totalPages={totalPages}
          openSheet={openSheet}
          setCurrentPage={setCurrentPage}
          itemPerPage={itemPerPage}
          setItemPerPage={setItemPerPage}
        />
      </div>

      <CreateKeypairModal />

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

      <PrivateKeyModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        privateKey={privateKey}
        handleShowPrivateKey={handleShowPrivateKey}
      />

      <DeleteKeyModal
        isOpen={isOpenTwo}
        loading={isPending}
        closeModal={closeModal}
        closeModalTwo={closeModalTwo}
        handleDelete={handleDelete}
      />
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
