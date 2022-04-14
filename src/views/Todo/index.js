import axios from "axios";
import React, {useEffect, useState } from "react";
import AddTask from "./component/AddTask";
import EditTask from "./component/EditTask";
import Task from "./component/Task";

import "./styles.scss";

function Todo() {
	const [todo, setTodo] = useState([]);
	useEffect(() => {
		axios.get(`https://api-fake-todo.herokuapp.com/api/tasks`).then(res => {
			setTodo(res.data)
		}).catch(error=> console.log("error"))
	})
	const [input, setInput] = useState({
		inputSearch: "",
		selectSearch: "",
	});
	const handleSubmit = (value) => {
		const newItem = {
			name: value,
			status: "new",
		}
		axios.post(`https://api-fake-todo.herokuapp.com/api/tasks`, newItem)
	};
	const handleDelete = (id) => {
		axios.delete(`https://api-fake-todo.herokuapp.com/api/tasks/${id}`).then(res=> console.log(res.data))
	};
	const [isOpenEdit, setIsOpenEdit] = useState(false);
	const handleCloseEdit = () => {
		setIsOpenEdit(!isOpenEdit);
	};
	const [initValueEdit, setInitValueEdit] = useState("")
	const [idEdit,setIdEdit] = useState("")
	const handleEdit = (id) => {
		axios.get(`https://api-fake-todo.herokuapp.com/api/tasks/${id}`).then(res => {
		setInitValueEdit(res.data.name)
		})
		setIdEdit(id)
		setIsOpenEdit(!isOpenEdit);
	};
	const handleSaveEdit = (valueInput) => {
		let editItem = {
			name: valueInput
		}
		axios.patch(`https://api-fake-todo.herokuapp.com/api/tasks/${idEdit}`, editItem)
		setIsOpenEdit(!isOpenEdit)
	};
	const handleChangeStatus = (id, newStatus) => {
		const changeItem = {
			status: newStatus,
		}
		axios.patch(`https://api-fake-todo.herokuapp.com/api/tasks/${id}`,changeItem).then(res=> console.log(res.data))
	};
	return (
		<div className="todo">
			<div className="todo__title">Todos</div>
			<AddTask handleSubmit={handleSubmit}/>
			<Task
				handleChangeStatus={handleChangeStatus}
				handleDelete={handleDelete}
				handleEdit={handleEdit}
				todo={todo}	
			/>
			<EditTask 
				isOpenEdit={isOpenEdit}
				initValueEdit={initValueEdit}
				handleSaveEdit={handleSaveEdit}
				handleCloseEdit={handleCloseEdit}
			/>
		</div>
	);
}

export default Todo;
