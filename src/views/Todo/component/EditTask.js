import React, { useEffect, useState } from "react";

function EditTask(props) {
    const { isOpenEdit , inputEdits} = props
    const [valueInput,setValueInput]=useState("")
    useEffect(() => {
        setValueInput(inputEdits)
    },[inputEdits])
	const handleInput = (e) => {
		setValueInput(e.target.value)
	};
    const handleSaveEdit = () => {
        props.handleSaveEdit(valueInput)
    }
    const handleCloseEdit = () => {
        props.handleCloseEdit()
    }
    return (
        isOpenEdit &&(
            <>
                <div class="modal" tabindex="-1" >
                      <div class="modal-dialog" >
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Modal title</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" onClick={handleCloseEdit} aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p>Edit</p>
                                <input
                                    className="content__input-todo"
                                    placeholder="What do you wants to do?"
                                    onChange={handleInput}
                                    name="inputEdit"
                                    value={valueInput}
                                ></input>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" onClick={handleSaveEdit} data-bs-dismiss="modal">Save Change</button>
                                <button type="button" class="btn btn-primary" onClick={handleCloseEdit}>Exit</button>
                            </div>
                            </div>
                      </div>
                </div>
            </>

        )
    )
}
export default EditTask;