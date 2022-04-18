import axios from "axios";
import React, {useEffect, useState } from "react";
import AddTask from "./component/AddTask";
import EditTask from "./component/EditTask";
import Task from "./component/Task";

import "./styles.scss";

function Todo() {
	const url = `https://api-fake-todo.herokuapp.com/api/tasks`;
	const [todo, setTodo] = useState([]);
	useEffect(() => {
		axios.get(url).then(res => {
			setTodo(res.data)
		})
	})
	const handleSubmit = (value) => {
		const newItem = {
			name: value,
			status: "new",
		}
		axios.post(url, newItem)
	};
	const handleDelete = (id) => {
		axios.delete(`${url}/${id}`).then(res=> console.log(res.data))
	};
	const [isOpenEdit, setIsOpenEdit] = useState(false);
	const handleCloseEdit = () => {
		setIsOpenEdit(!isOpenEdit);
	};
	const [initValueEdit, setInitValueEdit] = useState("")
	const [idEdit,setIdEdit] = useState("")
	const handleEdit = (id) => {
		axios.get(`${url}/${id}`).then(res => {
			setInitValueEdit(res.data.name)
		})
		setIdEdit(id)
		setIsOpenEdit(!isOpenEdit);
	};
	const handleSaveEdit = (valueInput) => {
		let editItem = {
			name: valueInput
		}
		axios.patch(`${url}/${idEdit}`, editItem)
		setIsOpenEdit(!isOpenEdit)
	};
	const handleChangeStatus = (id, newStatus) => {
		const changeItem = {
			status: newStatus,
		}
		axios.patch(`${url}/${id}`,changeItem).then(res=> console.log(res.data))
	};
	const pagination = {
		_limit: 3,
		_page: 1,
		_totalRows: 10,
	}
	return (
		<div className="todo">
			<div className="todo__title">Todos</div>
			<AddTask handleSubmit={handleSubmit}/>
			<Task
				handleChangeStatus={handleChangeStatus}
				handleDelete={handleDelete}
				handleEdit={handleEdit}
				todo={todo}	
				pagination={pagination}
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
