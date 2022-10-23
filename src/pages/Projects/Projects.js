import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import filterSvg from "../../assets/svg/filter.svg";
import "./Projects.css";
import Sidebar from "../../components/Sidebar.js";
import ProfileSvg from "../../assets/svg/profile.svg";
import searchSvg from "../../assets/svg/search.svg";
import plusSvg from "../../assets/svg/plus.svg";
import sendSvg from "../../assets/svg/send.svg";
import firebase from "../../auth/firebase-credential.js";
import { set, ref, getDatabase, get } from "firebase/database";
// Test Profiles images

import profile1 from "../../assets/svg/Ellipse 31.svg";
import profile2 from "../../assets/svg/Ellipse 32.svg";
import profile3 from "../../assets/svg/Ellipse 33.svg";
import profile4 from "../../assets/svg/Ellipse 34.svg";
import profile5 from "../../assets/svg/Ellipse 35.svg";
import Popup from "../../components/Popup";
import ImagePropup from "../../components/ImagePopup";
function object_equals(x, y) {
  if (x === y) return true;
  // if both x and y are null or undefined and exactly the same

  if (!(x instanceof Object) || !(y instanceof Object)) return false;
  // if they are not strictly equal, they both need to be Objects

  if (x.constructor !== y.constructor) return false;
  // they must have the exact same prototype chain, the closest we can do is
  // test there constructor.

  for (var p in x) {
    if (!x.hasOwnProperty(p)) continue;
    // other properties were tested using x.constructor === y.constructor

    if (!y.hasOwnProperty(p)) return false;
    // allows to compare x[ p ] and y[ p ] when set to undefined

    if (x[p] === y[p]) continue;
    // if they have the same strict value or identity then they are equal

    if (typeof x[p] !== "object") return false;
    // Numbers, Strings, Functions, Booleans must be strictly equal

    if (!object_equals(x[p], y[p])) return false;
    // Objects and Arrays must be tested recursively
  }

  for (p in y) if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) return false;
  // allows x[ p ] to be set to undefined

  return true;
}
function Projects() {
  const [AddTask, setAddTask] = useState(false);
  const [AddProgress, setAddProgress] = useState(false);
  const [AddCompleted, setAddCompleted] = useState(false);
  const [User, setUser] = useState(null);
  const [ProfilePopup, setProfilePopup] = useState(false);
  const navigate = useNavigate();
  const [tasks, setTasks] = React.useState([
    {
      id: "1",
      title: "Design- App",
      uprofile: ProfileSvg,
      description:
        "Modifying Career, Scholarship and Entrance exam screen Acc to new design pattern ",
    },
    {
      id: "2",
      title: "Second task",
      uprofile: ProfileSvg,
      description: "This tasks is abcd.",
    },
    {
      id: "3",
      title: "Third task",
      uprofile: ProfileSvg,
      description: "This tasks is abcd.",
    },
    {
      id: "4",
      title: "Fourth task",
      uprofile: ProfileSvg,
      description: "This tasks is abcd.",
    },
    {
      id: "5",
      title: "Fifth task",
      uprofile: ProfileSvg,
      description: "This tasks is abcd.",
    },
  ]);
  const Auth = getAuth();
  const [OpenModal, setOpenModal] = useState(false);
  useEffect(() => {
    if (Auth.currentUser != null) {
      // User is logged in
      navigate("/projects");
      setUser(Auth.currentUser);
      document.getElementById("loader")?.remove();
    } else {
      // User is not logged in
      navigate("/auth");
    }
  }, [Auth.currentUser]);
  const AddNewTask = (e) => {
    e.preventDefault();
    // generate a randome string as id
    const id = Math.random() * 100000;
    const newTask = {
      id: id.toString(),
      title: e.target.elements.title.value,
      description: e.target.elements.description.value,
      uprofile: User.photoURL
        ? User.photoURL
        : "https://firebasestorage.googleapis.com/v0/b/taskez-youshd.appspot.com/o/profile.svg?alt=media&token=59975eaa-749c-4895-aed2-e8061b021308",
      name: User.displayName,
      email: User.email,
    };
    setTasks([...tasks, newTask]);
    const AllTask = columns;

    if (e.target.id == 0) {
      AllTask.toDo.items.push(newTask);
      setAddTask(false);
    } else if (e.target.id == 1) {
      AllTask.inProgress.items.push(newTask);
      setAddProgress(false);
    } else if (e.target.id == 2) {
      AllTask.completed.items.push(newTask);
      setAddCompleted(false);
    }

    setColumns(AllTask);
    const db = getDatabase();
    set(ref(db, "columns"), columns)
      .then(() => {
        console.log("Columns saved");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  useEffect(() => {
    const db = getDatabase();

    get(ref(db, "columns"))
      .then((snapshot) => {
        let column = {
          toDo: {
            name: "To do",
            items: snapshot.val().toDo.items ? snapshot.val().toDo.items : [],
          },
          inProgress: {
            name: "In Progress",
            items: snapshot.val().inProgress.items
              ? snapshot.val().inProgress.items
              : [],
          },
          completed: {
            name: "Completed",
            items: snapshot.val().completed.items
              ? snapshot.val().completed.items
              : [],
          },
        };

        setColumns(column);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [columns, setColumns] = useState({
    toDo: {
      name: "To do",
      items: [],
    },
    inProgress: {
      name: "In Progress",
      items: [],
    },
    completed: {
      name: "Completed",
      items: [],
    },
  });

  useEffect(() => {
    const db = getDatabase();

    const TempColumn = {
      toDo: {
        name: "To do",
        items: [],
      },
      inProgress: {
        name: "In Progress",
        items: [],
      },
      completed: {
        name: "Completed",
        items: [],
      },
    };

    if (!object_equals(columns, TempColumn)) {
      set(ref(db, "columns"), columns)
        .then(() => {
          console.log("Columns saved");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [columns]);

  return (
    <DragDropContext>
      <Popup
        openModal={OpenModal}
        close={() => {
          setOpenModal(false);
        }}
      />
      <ImagePropup
        openModal={ProfilePopup}
        close={() => {
          setProfilePopup(false);
        }}
      />
      <div className="MainWrappers">
        <Sidebar />
        <div className="TodoWrapper">
          <div className="navBar">
            <div className="navBar__left">
              <img src={searchSvg} alt="search" />
              <input
                type={"text"}
                style={{
                  border: "none",
                  outline: "none",
                  background: "none",
                  fontWeight: "400",
                }}
                placeholder="Search"
              />
            </div>
            <div
              className="navBar__middle"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              <img src={profile1} alt="filter" />
              <img src={profile2} alt="filter" />
              <img src={profile3} alt="filter" />
              <img src={profile4} alt="filter" />
              <img src={profile5} alt="filter" />
            </div>
            <div className="navBar__right">
              <div className="user_name">{User?.displayName}</div>
              <img
                onClick={() => {
                  setProfilePopup(true);
                }}
                src={User?.photoURL ? User?.photoURL : ProfileSvg}
                style={{
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
          <div className="TitleWrapper">
            <div className="title">Projects</div>
            <div className="filter">
              <img
                src={filterSvg}
                style={{ paddingRight: "12px" }}
                alt="filter"
              />
              <div>Filter</div>
            </div>
          </div>
          <div>
            <div
              className="MainColumnWrapper"
              style={{
                display: "flex",
              }}
            >
              <DragDropContext
                onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
              >
                {Object.entries(columns).map(([columnId, column], index) => {
                  return (
                    <div className="ColumnWrapper" key={columnId}>
                      <div className="ColumnTitle">
                        <div>{column.name}</div>
                        <div className="Count">{column.items.length}</div>
                      </div>
                      <div
                        className="AddNewTask"
                        onClick={() => {
                          if (index === 0) setAddTask(!AddTask);
                          if (index === 1) setAddProgress(!AddProgress);
                          if (index === 2) setAddCompleted(!AddCompleted);
                        }}
                      >
                        <img src={plusSvg} alt="plus" />
                      </div>
                      <div
                        style={{
                          width: "85%",
                        }}
                      >
                        <Droppable droppableId={columnId} key={columnId}>
                          {(provided, snapshot) => {
                            return (
                              <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                  padding: 4,
                                  minHeight: 500,
                                }}
                              >
                                <div>
                                  {(index == 0 && AddTask) ||
                                  (index == 1 && AddProgress) ||
                                  (index == 2 && AddCompleted) ? (
                                    <div
                                      style={{
                                        padding: 16,
                                        minHeight: "50px",
                                        backgroundColor: "#ffff",
                                        borderRadius: "7px",
                                        marginBottom: "25px",
                                        transform: snapshot.isDragging
                                          ? "rotate(-12deg)"
                                          : "rotate(0deg)",
                                        transition: "all 0.3s",
                                      }}
                                    >
                                      <form onSubmit={AddNewTask} id={index}>
                                        <div
                                          style={{
                                            color: "black",
                                            fontWeight: 500,
                                            fontSize: "14px",
                                            marginBottom: "14px",
                                          }}
                                        >
                                          <textarea
                                            required
                                            type={"text"}
                                            id={"title"}
                                            placeholder="Give your task a title "
                                            style={{
                                              border: "none",
                                              outline: "none",
                                              width: "100%",
                                              fontSize: "14px",
                                              fontWeight: 500,
                                              resize: "none",
                                              height: "20px",
                                              // change design of scroll bar

                                              // set height to auto to make it dynamic

                                              // color: "#A4ABB3",
                                            }}
                                          />
                                        </div>
                                        <div
                                          style={{
                                            color: "#6B6B6B",
                                            fontSize: "12px",
                                            marginBottom: "25px",
                                            paddingRight: "23px",
                                          }}
                                        >
                                          <textarea
                                            className="description"
                                            required
                                            id={"description"}
                                            type={"text"}
                                            placeholder="Description.."
                                            style={{
                                              border: "none",
                                              outline: "none",
                                              width: "100%",
                                              resize: "none",
                                              height: "46px",
                                              fontSize: "12px",
                                              fontWeight: 400,
                                            }}
                                          />
                                        </div>
                                        <div
                                          style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            width: "100%",
                                          }}
                                        >
                                          <img
                                            src={
                                              User?.photoURL
                                                ? User?.photoURL
                                                : ProfileSvg
                                            }
                                            style={{
                                              width: "25px",
                                              height: "25px",
                                              borderRadius: "50%",
                                            }}
                                          />
                                          <button
                                            style={{
                                              backgroundColor: "#ffff",
                                              border: "none",
                                              outline: "none",
                                              borderRadius: "7px",
                                            }}
                                          >
                                            <img
                                              src={sendSvg}
                                              style={{
                                                width: "20px",
                                                height: "20px",
                                                cursor: "pointer",
                                              }}
                                            />
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  ) : (
                                    <>{AddTask[index]}</>
                                  )}
                                </div>
                                {column.items.map((item, index) => {
                                  return (
                                    <Draggable
                                      key={item.id}
                                      draggableId={item.id}
                                      index={index}
                                    >
                                      {(provided, snapshot) => {
                                        return (
                                          <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                              userSelect: "none",

                                              width: "100%",
                                              transition: "all 0.3s",
                                              color: "white",
                                              ...provided.draggableProps.style,
                                              marginBottom: "30px",
                                            }}
                                          >
                                            <div
                                              style={{
                                                padding: 16,
                                                minHeight: "50px",
                                                backgroundColor: "#ffff",
                                                borderRadius: "7px",
                                                transform: snapshot.isDragging
                                                  ? "rotate(-6deg)"
                                                  : "rotate(0deg)",
                                                transition: "all 0.3s",
                                              }}
                                            >
                                              <div
                                                style={{
                                                  color: "black",
                                                  fontWeight: 500,
                                                  fontSize: "14px",
                                                  marginBottom: "14px",
                                                }}
                                              >
                                                {item.title}
                                              </div>
                                              <div
                                                style={{
                                                  color: "#6B6B6B",
                                                  fontSize: "12px",
                                                  marginBottom: "25px",
                                                  paddingRight: "23px",
                                                }}
                                              >
                                                {item.description}
                                              </div>
                                              <img
                                                src={item.uprofile}
                                                style={{
                                                  width: "25px",
                                                  height: "25px",
                                                  borderRadius: "50%",
                                                }}
                                              />
                                            </div>
                                          </div>
                                        );
                                      }}
                                    </Draggable>
                                  );
                                })}
                                {provided.placeholder}
                              </div>
                            );
                          }}
                        </Droppable>
                      </div>
                    </div>
                  );
                })}
              </DragDropContext>
            </div>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default Projects;
