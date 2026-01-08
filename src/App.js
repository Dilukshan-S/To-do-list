import { useState, useEffect } from 'react';
import AddItem from './AddItem';
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import SearchItem from './SearchItem';

function App() 
{
  const API_URL = 'http://localhost:3500/items';
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    /*const savedItems = JSON.parse(localStorage.getItem('todo_list'));
    if (savedItems) {
      setItems(savedItems);
    }*/
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        console.log(response)
        const listItems = await response.json();
        console.log(listItems)
        setItems(listItems);
      }catch (err) {
        console.log(err.stack)
      }
    }

    (async () => await fetchItems())()
  }, [])

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id+1 : 1
    const addNewItem = {id, checked:false, item}
    const listItems =[...items, addNewItem] //... used to keep the existing items of the array.
    setItems(listItems)
    //below code to store/save changes
    //localStorage.setItem("todo_list", JSON.stringify(listItems))
  }

  //function to check and uncheck tasks.
  const handleCheck = (id) => 
  {
   const listItems = items.map((item) => 
    item.id===id ? {...item, checked:!item.checked} : item)
    setItems(listItems)
    //below code to store/save changes
    //localStorage.setItem("todo_list", JSON.stringify(listItems))
  }

  //function to delete tasks.
  const handleDelete = (id) => 
  {
   const listItems = items.filter((item) => 
   item.id!==id)
    setItems(listItems)
   //below code to store/save changes
   //localStorage.setItem("todo_list", JSON.stringify(listItems))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addItem(newItem)
    setNewItem('')
  }
  
  return (
    <div className = "App">
      <Header title="To-do"/>
      <AddItem 
        newItem = {newItem}
        setNewItem = {setNewItem}
        handleSubmit = {handleSubmit}
      />
      <SearchItem
        search = {search}
        setSearch ={setSearch}
      />
      <Content
        items = {items.filter(item => (item.item).toLowerCase().includes(search.toLocaleLowerCase()))}
        handleCheck = {handleCheck}
        handleDelete = {handleDelete}
      />
      <Footer 
        length = {items.length}
      />
    </div>
  );
}

export default App;
