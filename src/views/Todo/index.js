import React, { useEffect, useState } from "react";
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
		console.log(todo);
	};
	const handleDelete = (id) => {
		let newTodo = JSON.parse(JSON.stringify(filters));
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
		setFilter(newTodo);
	};
	const [filters, setFilter] = useState(todo)
	useEffect(() => {
		setFilter(todo)
	},[todo])
	return (
		<div className="todo">
			<div className="todo__title">Todos</div>
			<div className="todo__add add">
				<div className="add__title">Add a task</div>
				<div className="add__content content">
					<p className="content__title">item</p>
					<input
						className="content__input-todo"
						placeholder="What do you wants to do?"
						name="inputItem"
						onChange={handleInput}
						value={input.inputItem}
					></input>
					
					<p className="content__note">
						Enter what you want to procastinate{" "}
					</p>
					<button
						className="content_submit btn btn--primary pointer"
						onClick={handleSubmit}
					>
						Submit
					</button>
				</div>
			</div>
			<div className="todo__task task">
				<div className="task__title">
					<p>Task</p>
					<input value={input.inputSearch} name="inputSearch" onChange={handleInput} />
					<select name="selectSearch" value={input.selectSearch} onChange={handleInput}>
					<option value="" >All</option>
						<option value="New">New</option>
						<option value="Depending">Depending</option>
						<option value="Completed">Completed</option>		
					</select>
				</div>
				<div className="task__content content">
					<table className="task__table table">
						<thead>
							<tr>
								<th>Id</th>
								<th>Items </th>
								<th>Status</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{filters.filter((e) => {
								return (
									e.item.includes(input.inputSearch) && e.status.includes(input.selectSearch)
								)
								})
								.map((element, index) => (
								<tr key={index} className={element.status}>
									<td>{element.id}</td>
									<td>{element.item}</td>
									<td>{element.status}</td>
									<td>
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
					<div className="todo__add add">
						<div className="add__title">Edit a task</div>
						<div className="add__content content">
							<p className="content__title">Edit input</p>
							<input
								className="content__input-todo"
								placeholder="What do you wants to do?"
								onChange={handleInput}
								name="inputEdit"
								value={input.inputEdit}
							></input>
							<button className="content_submit btn btn--primary pointer" onClick={handleSaveEdit}>
								Save Change
							</button>
							<button className="content_submit btn btn--primary pointer" onClick={handleCloseEdit}>
										Close
						</button>
						</div>
					</div>
				</>

			)}
		</div>
	);
}

export default Todo;
