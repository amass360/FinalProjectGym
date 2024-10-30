import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../App';
import axios from 'axios';
import Diet from '../features/diets';
import Workout from '../features/workouts';
// import _30_day_abs from '../../recipes/30-day-abs.json'
import { useLocation } from 'react-router-dom';
import Auth from '../../auth/Auth';

const Dashboard = (props) => {
    const [users, setUsers] = useState([]);
    const [msg, setMsg] = useState("");
    const { token } = useContext(AuthContext);

    const all = async () => {
        try {
            const response = await axios.get('http://localhost:5000/user/all', {
            withCredentials: true,
            headers: {
                "x-access-token": token
            },
        })
            if(response.status ===200) {
                setUsers(response.data);
                setMsg("")
            }
        } catch (error) {
            console.log(error);
            setMsg(error.response.data.message);
        }
    }

    const location = useLocation()
    let allergies=''
    let foodPreference='';
    if(location.state){ 
        allergies=location.state.allergies?.toLowerCase()
        foodPreference = location.state.foodPreference?.toLowerCase()
    }
    
    // console.log(allergies,foodPreference);
    
    

    return (
        <>
            <h1>Nati Personal Traning</h1>
            <div>How are we different than other workout programs or trainers?</div>
            <div>Come check out our programs that include a variety of lengths and muscle concentration styles</div>
            <h2>Dashboard</h2>
            {/* <h3>Token: {token}</h3> */}
            <h3>{msg}</h3>
            <Auth msg='Login to receive a diet plan'><Diet allergies={allergies} foodPreferences={foodPreference}/></Auth>
            <Auth msg='Login to your account to choose your ideal workout plan!'><Workout/></Auth>
        </>
    )
}
export default Dashboard