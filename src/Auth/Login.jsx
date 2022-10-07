import React from 'react';
import { useForm } from 'react-hook-form';
function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="email" placeholder="Email" {...register("Email", { required: true, pattern: /^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/i })} />

                <input type="submit" />
            </form>

        </>
        // return (
        //     <>
        //     <h1>Login</h1>
        //     </>
    );
}

export default Login;