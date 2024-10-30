import { Button, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../App'
import axios from 'axios'

const Header = (props) => {
    const { setToken, userInfo } = useContext(AuthContext);

    const logout = async () => {
        try {
            const response = await axios.delete("http://localhost:5000/user/logout");
            console.log(response.status);
            
            if (response.status === 200) {
                setToken(null)
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Stack spacing={2} direction={'row'}>
            {userInfo ? 'welcome user' + userInfo.email : null}
            <Button LinkComponent={Link} to='/'>Dashboard</Button>
            <Button LinkComponent={Link} to='/Admin'>Admin</Button>
            <Button LinkComponent={Link} to='/login'>Login</Button>
            <Button LinkComponent={Link} to='Register'>Register</Button>
            <Button onClick={logout}>Logout</Button>
        </Stack>
    )
}
export default Header