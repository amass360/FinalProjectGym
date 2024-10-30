import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Checkbox,Box,TextField,Button,RadioGroup } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { AuthContext } from '../../App';

const LoginRegister = ({ mode }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [foodPreference, setFoodPreference] = useState('')
    const [kosher, setKosher] = useState('')
    const [allergies, setAllergies] = useState('')
    const [message, setMessage] = useState('')
    const { setToken, setUserInfo } = useContext(AuthContext);

    const navigate = useNavigate()

    const LoginRegister = async () => {
        if(mode==='Login'){
            try {
                const res = await axios.post('http://localhost:5000/user/login',
                {
                    email,
                    password
                },
                {withCredentials: true}
            );

            if(res.status === 200) {
                setMessage(res.data.message)
                console.log(res.data);
                setToken(res.data.accessToken);
                setUserInfo(res.data.user)
                navigate('/')
            }
            } catch (error) {
                console.log(error.response.data);
                setToken(null);
                setMessage(error.response.data.message);
            }
        }
        else if(mode === 'Register') {
            try {
                const res = await axios.post('http://localhost:5000/user/register',
                {
                    email,
                    password,
                    foodPreference,
                    allergies
                },
                {withCredentials: true}
            );

            if(res.status === 201) {
                setMessage(res.data.message)
                console.log(res.data);
                navigate('/',{state: {allergies,foodPreference}})
            }
            } catch (error) {
                console.log(error.response.data);
                setMessage(error.response.data.message);
            }
        }
    };
    return (
        <>
            <h1>Nati Personal Traning</h1>
            <h2>{mode}</h2>
            <Box component={'form'} sx={{m:1}} noValidate autoComplete='off'>
                <TextField
                    sx={{ m: 1}}
                    id='email'
                    type='email'
                    label='Enter your email..'
                    variant='outlined'
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <TextField
                    sx={{ m: 1}}
                    id='password'
                    type='password'
                    label='Enter your password..'
                    variant='outlined'
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <div className='FoodPreference'>Food Preferences</div>
                <div>
                    <FormControlLabel 
                        control={<Checkbox value='Vegetarian' checked={foodPreference ==='Vegetarian' }
                        onChange={(e)=>setFoodPreference(e.target.checked ? e.target.value : '')}/>} label="Vegetarian" />
                    <FormControlLabel
                        control={<Checkbox value='Vegan' checked={foodPreference ==='Vegan' }
                        onChange={(e)=>setFoodPreference(e.target.checked ? e.target.value : '')}/>} label="Vegan" />
                    <FormControlLabel 
                        control={<Checkbox onChange={(e)=>setKosher(e.target.value)}/>} label="Kosher" />
                </div>
                <div>Allergies</div>

            </Box>
            <Button variant='contained' onClick={LoginRegister}>{mode}</Button>
            <div>{message}</div>
        </>
    )
}
export default LoginRegister