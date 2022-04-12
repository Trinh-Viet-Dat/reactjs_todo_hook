import React, { useState } from "react";
function AddTask(props) {
    const [input, setInput] = useState({
		inputItem: "",
	});
	const handleInput = (e) => {
		const { value, name } = e.target;
		setInput({
			...input,
			[name]: value,
		});
    };
    const handleSubmit = () => {
        props.handleSubmit(input)
    }
    return (
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
    )
}
export default AddTask;