import React, { Fragment, useEffect, useState } from "react";
import {v4 as uuidv4} from 'uuid';
enum ButtonText {
    ADD = "ADD",
    SAVE = "SAVE"
}

const NewToDo = (props: any) => {
  const [newInput, setNewInput] = useState("");
  const [buttonTxt, setButtonTxt] = useState(ButtonText.ADD);

  const onSubmitHandler = (event: any) => {
    event.preventDefault();
    console.log(newInput);
    if (buttonTxt === ButtonText.ADD) {
        props.onAddClicked({id: uuidv4(), title: newInput, completed: false });
        
    } else if (buttonTxt === ButtonText.SAVE) {
        props.onAddClicked({id: props.editTodo.id, title: newInput, completed: props.editTodo.completed });
        setButtonTxt(ButtonText.ADD);
    }
    setNewInput("");
  };

  useEffect(() => {
    if (props.editTodo?.title) {
      setNewInput(props.editTodo?.title);
    }
    
    if ( buttonTxt === ButtonText.ADD && props.editTodo) {
        setButtonTxt(ButtonText.SAVE);
    }
  }, [props.editTodo]);

  return (
    <Fragment>
      <input
        type={"text"}
        value={newInput}
        onChange={(e) => setNewInput(e.target.value)}
      ></input>
      <button onClick={onSubmitHandler}>{buttonTxt}</button>
    </Fragment>
  );
};

export default NewToDo;
