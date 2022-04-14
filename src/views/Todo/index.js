import React, {useState } from "react";
import AddTask from "./component/AddTask";
import EditTask from "./component/EditTask";
import Task from "./component/Task";

import "./styles.scss";

function Todo() {
	const initTodo = [
		{
			id:1,
			item: "sdvscd",
			status:"New",
		},
		{
			id:2,
			item: "ssa",
			status:"New",
		},
		{
			id:3,
			item: "yj",
			status:"New",
		},
	];
	const [todo, setTodo] = useState(initTodo);
	const [input, setInput] = useState({
		inputEdit: "",
		inputSearch: "",
		selectSearch: "",
	});
	const [initId,setId]= useState(todo.length+2)
	const handleSubmit = (e) => {
		let newItem = e.inputItem;
		let newTodo = JSON.parse(JSON.stringify(todo));
		newTodo.push({
			id: initId,
			item: newItem,
			status: "New",
		});
		setId(initId+1)
		setTodo(newTodo);
		e.inputItem = "";
		console.log(todo);
	};
	const handleDelete = (id) => {
		let newTodo = JSON.parse(JSON.stringify(todo));
		let index =newTodo.findIndex(e=> e.id===id);
		newTodo.splice(index , 1);
		setTodo(newTodo);
	};
	const [isOpenEdit, setIsOpenEdit] = useState(false);
	const handleCloseEdit = () => {
		setIsOpenEdit(!isOpenEdit);
	};
	const handleEdit = (id) => {
		let index =todo.findIndex(e=> e.id===id);
		setInput({
			...input,
			inputEdit: todo[index].item,
			indexEdit: index,
		});
		setIsOpenEdit(!isOpenEdit);
	};
	const handleSaveEdit = (valueInput) => {
		let newTodo = JSON.parse(JSON.stringify(todo));
		let newIndex = input.indexEdit;
		newTodo[newIndex].item = valueInput;
		setTodo(newTodo);
		setIsOpenEdit(!isOpenEdit);
	};
	const handleChangeStatus = (id, status) => {
		let newTodo = [...todo];
		let index = newTodo.findIndex(e => e.id === id);
		newTodo[index].status = status;
		setTodo(newTodo);
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
				inputEdits={input.inputEdit}
				handleSaveEdit={handleSaveEdit}
				handleCloseEdit={handleCloseEdit}
			/>
		</div>
	);
}

export default Todo;
