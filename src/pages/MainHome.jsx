import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "reactjs-popup/dist/index.css";
import { Info, Line } from "../assets/Icons";
import { debounce } from "lodash";
import { useAuth } from "../AuthContext";
import BottomSheet from "../components/BottomSheet";
import Header from "../components/Header";
import useDeleteKeyPairs from "../hooks/useDeleteKeyPairs";
import useGetKeyPairs from "../hooks/useGetKeyPairs";
import CreateKeypairModal from "../components/CreateKeypairModal";
import SearchBar from "../components/MainHome/SearchBar";
import KeyPairTable from "../components/MainHome/KeyPairTable";
import Pagination from "../components/MainHome/Pagination";
import MobileViewTable from "../components/MainHome/MobileViewTable";
import PrivateKeyModal from "../components/MainHome/PrivateKeyModal";
import DeleteKeyModal from "../components/MainHome/DeleteKeyModal";

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
