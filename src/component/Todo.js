import React, { useState, useEffect } from 'react';
import './style.scss';
import { BsPatchCheckFill } from 'react-icons/bs'
import { MdOutlineRadioButtonUnchecked } from 'react-icons/md'
import { MdDelete } from 'react-icons/md'

function Todo() {
    const [data, setData] = useState([]);
    const [todo, settodo] = useState('');

    useEffect(() => {
        showTask();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!todo) {
            alert('Please fill the task...');
            return;
        }
        const newItem = { todo };
        const newData = [...data, newItem];
        setData(newData);
        settodo('');
        saveData(newData);
    };

    const handleDelete = (index) => {
        const newData = [...data];
        newData.splice(index, 1);
        setData(newData);
        saveData(newData);
    };

    const handleToggle = (index) => {
        const newData = [...data];
        newData[index].checked = !newData[index].checked;
        setData(newData);
        saveData(newData);
    };

    const saveData = (data) => {
        localStorage.setItem('data', JSON.stringify(data));
    };

    const showTask = () => {
        const savedData = JSON.parse(localStorage.getItem('data'));
        if (savedData) {
            setData(savedData);
        }
    };

    return (
        <div className="todoPage">
            <form className='form' onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="todo"
                    value={todo}
                    placeholder='Write Your Tesk...'
                    onChange={(e) => settodo(e.target.value)}
                />

                <button type="submit">Send</button>
            </form>
            <div className="todoList">
                <ul>
                    {data.map((item, index) => (
                        <li key={index} className={item.checked ? 'checked' : ''}>
                            <div className="task">
                                <span> {item.todo}</span>
                            </div>
                            <div className="btns">

                                {item.checked && (

                                    <span onClick={() => handleDelete(index)}><MdDelete /></span>
                                )}
                                <span onClick={() => handleToggle(index)}>{item.checked ? <BsPatchCheckFill /> : <MdOutlineRadioButtonUnchecked />}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Todo;
