import React from "react";

const BottomSheet = () => {
  return (
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
  );
};

export default BottomSheet;
