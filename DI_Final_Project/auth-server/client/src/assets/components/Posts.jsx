import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Checkbox,Box,TextField,Button,RadioGroup } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const MakePost = ({ mode }) => {
    const [body, setBody] = useState('')
    const [WorkoutType, setWorkoutType] = useState('')
    const [message, setMessage] = useState('')


    const navigate = useNavigate()
    