import { useState } from "react";
import "./Modal.css";
import { toast } from "react-toastify";

const Modal = ({ setModal, addSubject, subject, selectedSubject }) => {
  const [subjectName, setSubjectName] = useState("");
  const [error, setError] = useState(false);

  const findIndexOfSubject = (subjectArray, subjectDetails) => {
    let index = subjectArray.findIndex(
      (item) => item.subName === subjectDetails.subName
    );

    return index;
  };

  const handleSaveData = (subjectDetails) => {
    // if(subjectDetails.subName)
    console.log("subjectDetails.subName::", subjectDetails.subName.length);
    if (subjectDetails.subName.length === 0)
      return toast.error("Please Enter Subject Name", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    if (subject.length > 0) {
      let subjectIndex = findIndexOfSubject(subject, subjectDetails);
      let selectedSubjectIndex = findIndexOfSubject(
        selectedSubject,
        subjectDetails
      );

      if (subjectIndex >= 0 || selectedSubjectIndex >= 0) {
        toast.error("Subject Name Exist", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
    }
    addSubject([...subject, subjectDetails]);
    setModal(false);
  };

  return (
    <div className="modalContainer">
      <input
      type="text"
        className="textInput"
        placeholder="Enter Subject Name"
        value={subjectName}
        onChange={(e) => setSubjectName(e.target.value)}
      />
      <div className="modalBtnDiv">
        <button
          onClick={() => {
            handleSaveData({ subName: subjectName.trim(), isChecked: false });
          }}
        >
          Save
        </button>
        <button onClick={() => setModal(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default Modal;
