import React from "react";
import Popup from "reactjs-popup";
import { Info, TickIcon, CopyIcon } from "../../assets/Icons";
import CopyToClipboard from "react-copy-to-clipboard";
import { Table } from "flowbite-react";

const KeyPairTable = ({
  data,
  handleShowPublicKey,
  handleCopyPublic,
  openModal,
  openModalTwo,
  copiedPublic,
}) => {
  return (
    <div className="border-[1px] border-[#1B3D4F] p-[24px] min-h-[450px] h-full overflow-y-auto">
      <Table className="bg-[#1c3d4f] rounded-t-[12px]">
        <Table.Head className="bg-[#0f2e3f]">
          <Table.HeadCell className="bg-[#1c3d4f] normal-case text-[22px] text-white border-r-[5px] border-[#0f2e3f] rounded-t-[12px]">
            Name
          </Table.HeadCell>
          <Table.HeadCell className="bg-[#1c3d4f] normal-case text-[22px] text-white">
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
                      {copiedPublic[item.id] ? <TickIcon /> : <CopyIcon />}
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
                      Your public key is safe to share with others. It allows
                      senders to encrypt messages that can only be decrypted by
                      you using your private key. You can freely distribute your
                      public key so others can send you encrypted messages.
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
                      Your private key is the most important aspect of your
                      security. It must be kept secret – if someone gains access
                      to it, they will be able to decrypt all of your messages.
                      As long as your private key is in your possession, your
                      data remains safe. Never share your private key with
                      anyone.
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
  );
};

export default KeyPairTable;
