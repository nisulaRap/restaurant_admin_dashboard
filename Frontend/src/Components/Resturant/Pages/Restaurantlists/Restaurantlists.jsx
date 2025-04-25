import React, { useState, useEffect } from 'react'
import './Restaurantlists.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../Sidebar/Sidebar';

const Restaurantlists = () => {
  const url = 'http://localhost:5004'
  const [list, setList] = useState([])
  const [search, setSearch] = useState('')
  const [notFound, setNotFound] = useState('')
  const navigate = useNavigate()

  const fetchAllRestaurants = async () => {
    try {
      const response = await axios.get(`${url}/api/restaurant/list`)
      if (response.data.success) {
        setList(response.data.data)
      } else {
        toast.error('Error fetching restaurant')
      }
    } catch (error) {
      console.error(error)
      toast.error('Server error')
    }
  };

  const deleteRestaurant = async (restaurantId) => {
    try {
      const response = await axios.delete(`${url}/api/restaurant/delete/${restaurantId}`)
      if (response.data.success) {
        toast.success(response.data.message)
        fetchAllRestaurants()
      } else {
        toast.error('Error deleting restaurant')
      }
    } catch (error) {
      console.error(error)
      toast.error('Server error')
    }
  };

  const searchRestaurant = async () => {
    if (!search.trim()) {
      fetchAllRestaurants();
      setNotFound("");
      return;
    }

    try {
      const response = await axios.get(`${url}/api/restaurant/search?query=${search}`);
      if (response.data.success) {
        const data = response.data.data;
        if (data.length === 0) {
          setNotFound("No results found");
        } else {
          setList(data);
          setNotFound("");
        }
      } else {
        toast.error('Search failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Server error');
    }
  };

  useEffect(() => {
    fetchAllRestaurants()
  }, []);

  return (
    <div className='layout6'>
      <div className='bar6'>
        <Sidebar />
      </div>

      <div className="list-add1 flex-col">
        <h3>Restaurant Lists</h3>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by restaurant ID or restaurant name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchRestaurant}>Search</button>
        </div>

        {notFound && (
          <p style={{ color: 'red', marginTop: '10px' }}>{notFound}</p>
        )}

        <div className="list-table2">
          <div className="list-table2-format title">
            <b>Restaurant ID</b>
            <b>Restaurant Photo</b>
            <b>Restaurant Name</b>
            <b>Restaurant Location</b>
            <b>Actions</b>
          </div>
          {list.map((item, index) => (
            <div className="list-table2-format" key={index}>
              <p>{item.restaurantId}</p>
              <img className="restImage" src={`${url}/images/${item.restaurantPhoto}`} alt={item.restaurantName} />
              <p>{item.restaurantName}</p>
              <p>{item.restaurantLocation}</p>
              <div className="list-coloumn">
                <p className="cursor1" onClick={() => navigate(`/updaterestaurant/${item._id}`)}>Update</p>
                <p className="cursor2" onClick={() => deleteRestaurant(item._id)}>Delete</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Restaurantlists