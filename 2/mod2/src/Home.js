import React, { useEffect, useState } from 'react'

const Task = () => {
    const [task_name, setTask_name] = useState("");
    const [listData, setListData] = useState([]);

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { task_name };
            await fetch("http://localhost:5000/task", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location = "/Task";
            setTask_name("");
        } catch (err) {
            console.error(err.message);
        }
    }

    const getData = async () => {
        try {
            const tasks = await fetch("http://localhost:5000/getTask");
            const data = await tasks.json();
            setListData(data);
            console.log(data);
        } catch (error) {
            console.error("Error", error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className='body'>
            <div className="Design">
                <div className="p-5">
                    <h1>To Do List App <span><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Microsoft_To-Do_icon.svg/2515px-Microsoft_To-Do_icon.svg.png' alt='pic' /></span> </h1>
                    <form onSubmit={onSubmitForm}>
                        <label>Enter The Task:-</label>
                        <input placeholder="Add a Task🫡" value={task_name} onChange={e => setTask_name(e.target.value)} className="Search" />
                        <button className="btn btn-success" type='submit'>Add Task </button>
                    </form>
                </div>
                {listData.map((task, index) => (
                    <div key={index}>
                        <div className="Tasks">
                            <h3 className="Fst">{task}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Task;