import React, {useState } from "react";
import AddTask from "./component/AddTask";

import "./styles.scss";

function Todo() {
	const initTodo = [	
	];
	const [todo, setTodo] = useState(initTodo);
	const [input, setInput] = useState({
		inputItem: "",
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
	const handleSubmit = () => {
		let newItem = input.inputItem;
		let newTodo = JSON.parse(JSON.stringify(todo));
		newTodo.push({
			id: initId,
			item: newItem,
			status: "New",
		});
		setId(initId+1)
		setTodo(newTodo);
		input.inputItem = "";
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
							{todo.filter((e) => {
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
										<button
											className="btn btn--primary mr-15 pointer"
											onClick={() =>
												handleChangeStatus(element.id, "New")
											}
										>
											New
										</button>
										<button
											className="btn btn--primary mr-15 pointer"
											onClick={() =>
												handleChangeStatus(
													element.id,
													"Depending"
												)
											}
										>
											Depending
										</button>
										<button
											className="btn btn--primary mr-15 pointer"
											onClick={() =>
												handleChangeStatus(
													element.id,
													"Completed"
												)
											}
										>
											Complete
										</button>
										<button
											className="btn btn--primary mr-15 pointer"
											onClick={() => handleEdit(element.id)}
										>
											Edit
										</button>
										<button
											className="btn btn--secondary mr-15 pointer"
											onClick={() => handleDelete(element.id)}
										>
											Delete
										</button>
									</td>
								</tr>))}
						</tbody>
					</table>
				</div>
			</div>
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
