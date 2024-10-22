
import './App.css';
import { useEffect, useState } from 'react'
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import {SignUp} from './pages/SignUp';
import {Login} from './pages/Login';

const API_URL = "http://localhost:3001/"
function App() {
  const [listItems, setListItems] = useState([])
  const [editItemId, setEditItemId] = useState(null)
  const [updatedItem, setUpdatedItem] = useState({title: '', description: ''})
  const [newTask, setNewTask] = useState({title: '', description: ''})



  const fetchList = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {  // Check if the response is OK (status in the range 200-299)
        const data = await response.json();  // Parse the JSON data
        setListItems(data);  // Set the data into state
      } else {
        console.error('Failed to fetch data');  // Log an error if the response is not OK
      }
    } catch (err) {
      console.error("Error when retrieving list", err);  // Catch and log any error
    }
  };

  const createToDo = async () => {
    // Check if the task title or description is empty
    if (newTask.title.trim() === "" || newTask.description.trim() === "") {
      alert("Task title and description cannot be empty");
      return;
    }
  
    try {
      const response = await fetch(`${API_URL}add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),  // Send the new task object directly
      });
  
      if (response.ok) {
        const addedTask = await response.json();
        setListItems([...listItems, addedTask]);  // Add the new task to the list
        setNewTask({ title: "", description: "" });
         // Clear the input fields after successful addition
      } 

      
    } catch (error) {
      console.error("There was an error adding the task", error);
    }
    window.location.reload(); 
  };

  const handleUpdate = (id) => {
    const itemToUpdate = listItems.find((item) => item._id === id);
    setEditItemId(id);
    setUpdatedItem({ title: itemToUpdate.title, description: itemToUpdate.description });
  };
  const handleUpdateSubmit = async (id) => {
      try {
        const updatedData = {title: updatedItem.title, description: updatedItem.description}
        const response = await fetch(`${API_URL}update/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify(updatedData)
        });
        console.log(`${API_URL}/update/${id}`, response)
        if (response.ok) {
          const updatedList = listItems.map(item =>
            item._id === id ? { ...item, ...updatedData } : item  // Update the item locally
          );
          setListItems(updatedList);
          setEditItemId(null);  // Exit edit mode
        } else {
          console.error('Failed to update the item');
        }
        window.location.reload(); 
        
      } catch (error) {
        console.error("Error updating the item", error);
      }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleDelete = async (id) => {
   try {
    const response = await fetch(`${API_URL}delete/${id}`,{
      method: 'Delete',
      headers: {
        'Content-Type' : 'application/json'
      }
    });
    if(response.ok){
      console.log("task has been deleted")
    }
    window.location.reload(); 
   } catch (error) {
    console.error("Error updating the item", error);

   }



  }

  useEffect(()=>{
    fetchList()
  }, [])

  return (
    <div className="App">
      
      <div className="list">
      <NavBar/>
      <Routes>
        <Route path="/" element=""/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>

        <section className='main'>
          
       <div className='title'> <h1>List of To Do's</h1>
       <button type="submit"onClick={createToDo}>Add Task</button>
       </div>
        
        <input
            type="text"
            className="inputTitle"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            placeholder="Enter the Task Name"
        />
        <input
            type="text"
            className="inputDesc"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            placeholder="Enter the Task Description"
        />


        <ul className='view'>
          {
            listItems.map((item) => (
              <li key={item._id}>
                {editItemId === item._id ? (
                  <div>
                    <input 
                      type="text" 
                      className="toDoTitle" 
                      value={updatedItem.title} 
                      onChange={handleInputChange} 
                    />
                    <input 
                      type="text" 
                      className="toDoDesc" 
                      value={updatedItem.description} 
                      onChange={handleInputChange} 
                    />
                    <button className="update" type="submit" onClick={() => handleUpdateSubmit(item._id)}>Save</button>
                    <button onClick={() => setEditItemId(null)}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    <div className='itemTitle'>
                    
                    <h2>{item.title} </h2>_<h3>{item.description}</h3>
                      <div className='itemButtons'>
                      <button className="delete" type="submit" onClick={() => handleDelete(item._id)}>Delete</button>
                      <button className="update" onClick={() => handleUpdate(item._id)}>Update</button>
                      </div>
                    </div>
                   
                  </div>
                )}
              </li>
            ))
          }
        </ul>
        </section>
      </div>
    </div>
  );
}

export default App;
