import React from 'react';
import styles from './login.module.css';
import Foot from '../../component/foot/foot';
import Navbar from '../../component/navbar/navbar';
import { CardTitle, Button } from 'reactstrap';
import { useMutation, useQuery } from 'react-query';
import { auth, isAuth } from '../../store';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const mutation = useMutation((data) => auth(data));
    const { data } = useQuery('isAuth', () => isAuth());

    const navigate = useNavigate();
    const authUser = (e) => {
        mutation.mutate({
            username: e.target.username.value,
            password: e.target.password.value
        })
    }
    React.useEffect(() => {
        if (data != undefined && data != false) {
            navigate('/');
        }
    })
    return (
        <React.Fragment>
            <Navbar />
            <form onSubmit={authUser}>
                <div className={styles.wrapper}>
                    <CardTitle className='h1 mb-5 text-center col-12'>
                        Login
                    </CardTitle>
                    <input type="text" name='username' placeholder='Username' className='mb-3 form-control' />
                    <input type='password' name='password' placeholder='Password' className='mb-3 form-control' />
                    <Button type='submit' color='primary' className='m-auto col-12'>Đăng nhập</Button>
                </div>
            </form>
            <Foot />
        </React.Fragment>
    );
}

export default Login;
