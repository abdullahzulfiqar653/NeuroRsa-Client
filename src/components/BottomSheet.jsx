import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import { useDrag } from "@use-gesture/react";

const BottomSheet = ({ visible, onDismiss, children }) => {
  const [isVisible, setIsVisible] = useState(visible);
  const sheetHeight = 246;

  const [{ y }, api] = useSpring(() => ({
    y: 100,
  }));

  useEffect(() => {
    setIsVisible(visible);
    if (visible) {
      api.start({ y: 0 });
    } else {
      api.start({ y: 100 });
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [visible, api]);

  const bind = useDrag(
    ({ down, movement: [, my], cancel }) => {
      if (my < 0) cancel();

      api.start({ y: down ? (my / sheetHeight) * 100 : 0 });

      if (!down && my > sheetHeight * 0.6) {
        onDismiss();
      }
    },
    { axis: "y" }
  );

  return isVisible ? (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        zIndex: 1000,
      }}
      onClick={onDismiss}
    >
      <animated.div
        className="bottom-sheet"
        style={{
          transform: y.to((val) => `translateY(${val}%)`),
          height: `${sheetHeight}px`,
          width: "100%",
          backgroundColor: "#1B3D4F",
          borderRadius: "32px 32px 0 0",
          touchAction: "none",
        }}
        {...bind()}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            width: "40px",
            height: "6px",
            backgroundColor: "#FFFFFF",
            borderRadius: "3px",
            margin: "0 auto 10px",
            marginTop: "16px",
          }}
        ></div>

        {children}
      </animated.div>
    </div>
  ) : null;
};

export default BottomSheet;
