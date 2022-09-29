import React from 'react';
import styles from './register.module.css';
import Foot from '../../component/foot/foot';
import Navbar from '../../component/navbar/navbar';
import { CardTitle, Button } from 'reactstrap';
import { useMutation, useQuery } from 'react-query';
import { createUser, isSucessAddUser } from '../../store';
import { useNavigate } from 'react-router';

const Register = () => {
    const mutation = useMutation((data) => createUser(data));
    const { data } = useQuery('isSucessful', () => isSucessAddUser());
    const navigate = useNavigate();
    const addUser = (e) => {
        mutation.mutate({
            username: e.target.username.value,
            password: e.target.password.value,
        })
        if (data == true) {
            alert('Create User Sucessfully');
            navigate('/login');
        } else if (data != true) {
            alert('User is alread');
        }
    }
    return (
        <React.Fragment>
            <Navbar />
            <form onSubmit={addUser}>
                <div className={styles.wrapper}>
                    <CardTitle className='h1 mb-5 text-center col-12'>
                        Sign up
                    </CardTitle>
                    <input type='text' name='username' placeholder='Username' className='mb-3 form-control' />
                    <input type='password' name='password' placeholder='Password' className='mb-3 form-control' />
                    <Button type='submit' color='primary' className='m-auto col-12'>Tạo tài khoản</Button>
                </div>

            </form>
            <Foot />
        </React.Fragment>
    );
}

export default Register;
