
import './App.css';
import { useEffect, useState } from "react";
import axios from 'axios';

function App() {
  const [data, setData] = useState([])
  const [name, setName] = useState('')
  const [itemFix, setItemFix] = useState([])
  const [check, setCheck] = useState(true)

  // Gọi Api lấy tất cả phần tử
  useEffect(() => {
    const data = async () => {
      const res = await axios.get('http://localhost:5000/data')
      setData(res.data)
    }
    data()
  }, [])

  // Xóa Phần tử
  const handleClickDelete = (id) => {
    axios.delete(`http://localhost:5000/data/${id}`)
      .then(res => {
        let copy = [...data]
        copy = copy.filter(item => item._id !== id)
        setData(copy)
      })
      .catch(error => {
        console.log(error)
      });
  }


  // Thêm phần tử
  const handleNameChange = (e) => {
    setName(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === '') {
      alert('Nhập tên vào')
    } else {
      axios.post('http://localhost:5000/data/items', { name: name })
        .then(res => {
          var add = [...data, res.data]
          setData(add)
          setName('')
        })
        .catch(err => console.log(err))
    }
  }

  const handleClickEdit = (index) => {
    setItemFix(index)
    let check = Object.keys(itemFix).length === 0
    setCheck(check)
  }

  const fixOnchange = (e) => {
    let copyEdit = { ...itemFix }
    copyEdit.name = e.target.value
    setItemFix(copyEdit)
  }
  const saveOnclick = () => {
   

  }


  const handleSubmitEdit = (e) => {
    e.preventDefault();
    let dataCopy = [...data]
    dataCopy.filter(item => {
      if (item._id === itemFix._id) {
        item.name = itemFix.name
      }
    })
    
    axios.patch(`http://localhost:5000/items/${itemFix._id}`,itemFix.name)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error) 
      });
      setCheck(true)
  }
  return (
    <div className="App">
      <h1>CRUD</h1>
      <p>Thêm</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" value={name} onChange={(e) => handleNameChange(e)} />
        <button type="submit">Add Item</button>
      </form>
      <div className='content'>
        {data.map(item => {
          return (
            <div key={item._id}>

              {
                check === true ?
                  <>
                    {item.name}
                    <button onClick={() => handleClickDelete(item._id)}>Xóa</button>
                    <button onClick={() => handleClickEdit(item)}>Edit</button>
                  </> :
                  <>
                    {
                      item._id === itemFix._id ?
                        <>
                          <form onSubmit={(e) => handleSubmitEdit(e)}>
                            <input type="text" name ="name" value={itemFix.name} onChange={(e) => fixOnchange(e)} />
                            <button  type="submit">Lưu</button>
                          </form>
                          <button onClick={() => handleClickDelete(item._id)}>Xóa</button>
                        </>
                        :
                        <>
                          {item.name}
                          <button onClick={() => handleClickDelete(item._id)}>Xóa</button>
                          <button onClick={() => handleClickEdit(item)}>Edit</button>
                        </>
                    }
                  </>
              }
            </div>
          )
        })}
      </div>

    </div>
  );
}

export default App;
