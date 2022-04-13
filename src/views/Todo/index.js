import React, {useState } from "react";
import AddTask from "./component/AddTask";
import Task from "./component/Task";

import "./styles.scss";

function Todo() {
	const initTodo = [	
	];
	const [todo, setTodo] = useState(initTodo);
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
	const [initId,setId]= useState(1)
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
	const handleSaveEdit = () => {
		let newTodo = JSON.parse(JSON.stringify(todo));
		let newIndex = input.indexEdit;
		newTodo[newIndex].item = input.inputEdit;
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
				handleEdit={handleEdit}/>
			{isOpenEdit && (
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
										value={input.inputEdit}
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

			)}
		</div>
	);
}

export default Todo;
