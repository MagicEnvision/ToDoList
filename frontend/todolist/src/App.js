
import './App.css';
import { useEffect, useState } from 'react'

const GET_API = "http://localhost:3001/"
function App() {
  const [listItems, setListItems] = useState([])
  const fetchList = async () => {
    try {
      const response = await fetch(GET_API);
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
  useEffect(()=>{
    fetchList()
  }, [])
  return (
    <div className="App">
      <div className="list">
        <h1>List of To Do's</h1>
          <ul>
          {
            listItems.map((item, index) => (
              <li key={index}>
                <strong>{item.title}</strong> - {item.description} <button>Delete</button><button>Update</button>
              </li>
            ))
          }
          </ul>
      </div>
    </div>
  );
}

export default App;
