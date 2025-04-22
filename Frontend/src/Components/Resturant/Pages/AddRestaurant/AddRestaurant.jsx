import React, {useState} from 'react'
import './AddRestaurant.css'
import { assets } from '../../../../assets/assets';
import axios from 'axios'
import { toast } from 'react-toastify'
import Sidebar from '../../Sidebar/Sidebar';  

const AddRestaurant = () => {
  const url = "http://localhost:5004";
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    restaurantName: "",
    restaurantLocation: "",
    lat: "",
    lng: "",
    status: ""
  })

  const onChangeHandler = (event) => {
    const {name, value} = event.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('restaurantPhoto', image);
    formData.append('restaurantName', data.restaurantName);
    formData.append('restaurantLocation', data.restaurantLocation);  
    formData.append('lat', data.lat);
    formData.append('lng', data.lng);
    formData.append('status', data.status);

    try {
      const response = await axios.post(`${url}/api/restaurant/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data.success) {
        setData({
          restaurantName: "",
          restaurantLocation: "",
          lat: "",
          lng: "",
          status: ""
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong while adding restaurant.");
    }
  }

  return (
	<div className='layout'>
		<div className='bar'>
			<Sidebar />
		</div>
		
		<div className='add'> 
		  <h3>Add Restaurant</h3><br />
		  <form className='flex-col' onSubmit={onSubmitHandler}>
			<div className="add-img-upload flex-col">
			  <p>Restaurant Upload Image</p>
			  <label htmlFor='image'>
				<img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt="" />
			  </label>
			  <input 
				onChange={(e) => setImage(e.target.files[0])} 
				type="file" 
				id='image'  
				hidden
				required
			  />
			</div>
			<div className='add-inputs flex-col'>
			  <p>Restaurant Name</p>
			  <input 
				type="text" 
				placeholder='Restaurant Name' 
				name='restaurantName'
				value={data.restaurantName} 
				onChange={onChangeHandler} 
				required 
			  />
			  <p>Restaurant Location</p>
			  <input 
				type="text" 
				placeholder='Restaurant Location' 
				name='restaurantLocation'
				value={data.restaurantLocation} 
				onChange={onChangeHandler} 
				required 
			  />
			  <p>Restaurant Latitude and Longitude</p>
			  <input 
				type="text" 
				placeholder='Latitude' 
				name='lat' 
				value={data.lat} 
				onChange={onChangeHandler} 
				required 
			  />
			  <input 
				type="text" 
				placeholder='Longitude' 
				name='lng' 
				value={data.lng} 
				onChange={onChangeHandler} 
				required 
			  />
			</div>

			<p>Restaurant Status</p>
			<div className='add-status flex-col'>
			  <select name="status" value={data.status} onChange={onChangeHandler} required>
				<option value="">Select Status</option>
				<option value="Opened">Opened</option>
				<option value="Closed">Closed</option>
			  </select>
			</div>
			<button type='submit' className='add-btn'>Add Restaurant</button>
		  </form>
		</div>
	</div>
    
  )
};

export default AddRestaurant