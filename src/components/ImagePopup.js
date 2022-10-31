import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useEffect } from "react";
import Modal from "react-modal";
import crossSvg from "../assets/svg/Cross.svg";
import { app } from "../auth/firebase-credential";
function Popup({ openModal, close }) {
  const auth = getAuth();
  const [User, setUser] = React.useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
  });
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

  const [modalIsOpen, setIsOpen] = React.useState(true);
  const [picure, setPicture] = React.useState(null);
  const [pictureUrl, setPictureUrl] = React.useState(null);
  const [Submit, setSubmit] = React.useState(false);
  const ProfilePicture = (e) => {
    // setPicture();
    const file = e.target.files[0];
    setPictureUrl(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setPicture(e.target.result);
    };
  };
  function closeModal() {
    setIsOpen(false);
    close();
  }
  const SetasProfile = (e) => {
    e.preventDefault();
    setSubmit(true);
    // change file to bs64
    const file = pictureUrl;

    const storage = getStorage(app);
    const profileRef = ref(storage, `profile/${User.uid}.jpg`);
    uploadBytes(profileRef, file).then((snap) => {
      getDownloadURL(profileRef).then((url) => {
        const id = auth.currentUser.uid;
        updateProfile(auth.currentUser, {
          photoURL: url,
        });
        closeModal();
      });
    });
  };

  return (
    <div>
      <button onClick={openModal} hidden>
        Open Modal
      </button>
      <Modal
        isOpen={openModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div style={{}}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <div>Upload a Profile Photo</div>
            <img
              src={crossSvg}
              style={{
                cursor: "pointer",
              }}
              alt="cross"
              onClick={() => {
                closeModal();
              }}
            />
          </div>

          {/* Show an image */}
          <input
            file
            type="file"
            id="file"
            multiple={false}
            onInput={(e) => {
              ProfilePicture(e);
            }}
          />
          {picure && (
            <img
              src={picure}
              alt="profile"
              style={{
                maxWidth: "100%",
              }}
            />
          )}

          <br />
          <input type="submit" onClick={SetasProfile} />
          {Submit && (
            <div
              style={{
                fontSize: "12px",
              }}
            >
              {" "}
              It will take 15-20 Seconds to change (Then it will automatically
              close).
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default Popup;
