import React from "react";

import Modal from "react-modal";
import crossSvg from "../assets/svg/Cross.svg";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "557px",
    width: "524px",

    borderRadius: "22px",
  },
};

function Popup({ openModal, close }) {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(true);

  //   function openModal() {
  //     setIsOpen(true);
  //   }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    close();
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal} hidden>
        Open Modal
      </button>
      <Modal
        isOpen={openModal}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            // width: "100%",
            justifyContent: "space-between",
            padding: "25px",
          }}
        >
          <div
            style={{
              fontWeight: "500",
              fontSize: "18px",
            }}
          >
            Project Members
          </div>
          <img
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              closeModal();
            }}
            src={crossSvg}
          />
        </div>
      </Modal>
    </div>
  );
}

export default Popup;
