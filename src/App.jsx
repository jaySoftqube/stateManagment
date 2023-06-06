import { useState } from "react";
import "./App.css";
import Modal from "./Modal";
import CheckBoxList from "./CheckBoxList";

function App() {
  const [subject, setSubject] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleCheckbox = (index, arrayName) => {
    let subjectArray = arrayName === "subject" ? subject : selectedSubject;

    let updatedSubjectData = subjectArray.map((item, itemIndex) => {
      if (index === itemIndex) {
        item.isChecked = !item.isChecked;
      }
      return item;
    });

    arrayName === "subject"
      ? setSubject(updatedSubjectData)
      : setSelectedSubject(updatedSubjectData);

    // if (arrayName === "subject") {
    //   let updateSubjectData = subject.map((item, itemIndex) => {
    //     if (index === itemIndex) {
    //       item.isChecked = !item.isChecked;
    //     }
    //     return item;
    //   });
    //   setSubject(updateSubjectData);
    // } else {
    // }
  };

  const moveAllSubjectToTheRight = () => {
    if (subject.length <= 0) return alert("No Subject Present At Left Side");
    setSelectedSubject([...selectedSubject, ...subject]);
    setSubject([]);
  };

  const moveAllSubjectToTheLeft = () => {
    if (selectedSubject <= 0) return alert("No Subject Present At Right Side");
    setSubject([...subject, ...selectedSubject]);
    setSelectedSubject([]);
  };

  const filterOutSelectedSubjects = (subjectArray) => {
    let subjectDetails = [];

    let filterSubjects = subjectArray.filter((item) => {
      if (!item.isChecked) {
        return item;
      }
      item.isChecked = false;
      subjectDetails.push(item);
    });
    return { subjectDetails, filterSubjects };
  };

  const moveSelectedSubjectToTheRight = () => {
    let subjectData = filterOutSelectedSubjects(subject);
    setSubject(subjectData.filterSubjects);
    setSelectedSubject([...selectedSubject, ...subjectData.subjectDetails]);
  };

  const moveSelectedSubjectToTheLeft = () => {
    let subjectData = filterOutSelectedSubjects(selectedSubject);
    setSelectedSubject(subjectData.filterSubjects);
    setSubject([...subject, ...subjectData.subjectDetails]);
  };

  return (
    <div>
      <div className="containerDiv">
        <div className="addSubjectDiv">
          <div className="addSubHeadingDiv">
            <p>Subject</p>
            <button
              onClick={() => {
                setShowModal(true);
              }}
            >
              Add
            </button>
          </div>
          {subject.length > 0 && (
            <div className="subjectDiv">
              {subject.map((item, index) => (
                <CheckBoxList
                  key={item.subName}
                  item={item}
                  handleCheckbox={handleCheckbox}
                  arrayName={"subject"}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
        <div className="actionsBtnDiv">
          <button
            onClick={() => {
              moveSelectedSubjectToTheRight();
            }}
          >
            {">"}
          </button>
          <button
            onClick={() => {
              moveAllSubjectToTheRight();
            }}
          >
            {">>"}
          </button>
          <button
            onClick={() => {
              moveSelectedSubjectToTheLeft();
            }}
          >
            {"<"}
          </button>
          <button
            onClick={() => {
              moveAllSubjectToTheLeft();
            }}
          >
            {"<<"}
          </button>
        </div>
        <div className="selectedSubjectDiv">
          <p>Selected Subject</p>
          {selectedSubject.length > 0 && (
            <div className="subjectDiv">
              {selectedSubject.map((item, index) => (
                <CheckBoxList
                  key={item.subName}
                  item={item}
                  handleCheckbox={handleCheckbox}
                  arrayName={"selectedSubject"}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {showModal && (
          <Modal
            setModal={setShowModal}
            addSubject={setSubject}
            subject={subject}
            selectedSubject={selectedSubject}
          />
        )}
      </div>
    </div>
  );
}

export default App;
