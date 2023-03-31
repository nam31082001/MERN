import './style/style.scss'
import { useEffect, useState } from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';

function App() {
  const [data, setData] = useState([])
  const [name, setName] = useState('')
  const [itemFix, setItemFix] = useState([])
  const [check, setCheck] = useState(true)
  const [checkTime, setCheckTime] = useState(true)
  const [className,setClass]=useState('item_Adds')

  // Gọi Api lấy tất cả phần tử
  useEffect(() => {
    const data = async () => {
      const res = await axios.get('http://localhost:5000/data')
    const dataNew=res.data
      setData(dataNew.reverse())
    }
    data()
  }, [name])


  // Xóa Phần tử
  const handleClickDelete = (id) => {
    setClass('item_Addss')
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
      setCheckTime(false)
      setTimeout(() => {
        setCheckTime(true)
      }, 2000);
    } else {
      setClass('item_Add')
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
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    let dataCopy = [...data]
    dataCopy.filter(item => {
      if (item._id === itemFix._id) {
        item.name = itemFix.name
      }
    })
    axios.put(`http://localhost:5000/items/${itemFix._id}`, itemFix)
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
      {
        checkTime ? <></>
          :
          <>
            <div className='notification'>Nhập dữ liệu đi bạn</div>
          </>
      }
      <h1>CRUD</h1>
      <p>Thêm</p>
      <form onSubmit={(e) => handleSubmit(e)} className='addForm'>
        <label className='name_label'>Thêm List</label>
        <input className='name_input' type="text" value={name} onChange={(e) => handleNameChange(e)} />
        <Button type="submit" variant="outline-primary">Add</Button>
      </form>
      <div className='content'>
        {data.map(item => {
          return (
            <div key={item._id} className={className}>
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
                            <input type="text" name="name" value={itemFix.name} onChange={(e) => fixOnchange(e)} />
                            <button type="submit">Lưu</button>
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
