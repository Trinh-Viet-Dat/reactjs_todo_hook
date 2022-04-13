import React, { useState } from "react";

function Task(props) {
    const { newTodo } = props;
    const [input, setInput] = useState({
		inputEdit: "",
		inputSearch: "",
		selectSearch: "",
    });
    const handleInput = (e) => {
		const { value, name } = e.target; 
		setInput({
			...input,
			[name]: value,
		});
    };
    const handleChangeStatus = (id,status) => {
        props.handleChangeStatus(id,status)
    }
    const handleEdit = (id) => {
        props.handleEdit(id)
    }
    const handleDelete = (id) => {
        props.handleDelete(id)
    }
    return (
        <div className="todo__task task">
        <div className="task__title">
            <p>Task</p>
            <div className="inputSearch">
                <input value={input.inputSearch} name="inputSearch" onChange={handleInput} />
                <select name="selectSearch" value={input.selectSearch} onChange={handleInput}>
                <option value="" >All</option>
                    <option value="New">New</option>
                    <option value="Depending">Depending</option>
                    <option value="Completed">Completed</option>		
                </select>
            </div>
        </div>
        <div className="task__content content">
            <table className="task__table table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Items </th>
                        <th>Status</th>
                        <th className="actions">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {newTodo?.filter((e) => {
                        return (
                            e.item.includes(input.inputSearch) && e.status.includes(input.selectSearch)
                        )
                        })
                        .map((element, index) => (
                        <tr key={index} className={element.status}>
                            <td>{index+1}</td>
                            <td>{element.item}</td>
                            <td>{element.status}</td>
                            <td className="action">
                                <button className="btn btn--primary mr-15 pointer" onClick={() =>handleChangeStatus(element.id, "New")}>
                                    New
                                </button>
                                <button className="btn btn--primary mr-15 pointer" onClick={() =>handleChangeStatus(element.id,"Depending")}>
                                    Depending
                                </button>
                                <button className="btn btn--primary mr-15 pointer" onClick={() =>handleChangeStatus(element.id,"Completed")}>
                                    Complete
                                </button>
                                <button className="btn btn--primary mr-15 pointer" onClick={() => handleEdit(element.id)}>
                                    Edit
                                </button>
                                <button className="btn btn--secondary mr-15 pointer" onClick={() => handleDelete(element.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>))}
                </tbody>
            </table>
        </div>
    </div>
    )
}
export default Task;