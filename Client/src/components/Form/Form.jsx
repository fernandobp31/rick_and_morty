import { useState } from "react";
import validation from "../Validation/Validation";

const Form = ({ login }) => {
    const [errors, setErrors] = useState({});
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        })

        setErrors(validation({
            ...userData,
            [event.target.name]: event.target.value
        }))
    }

const handleSubmit = (event) => {
    event.preventDefault()
    login(userData);
}

    return(
        <Form onSubmit={handleSubmit}>
            <label htmlFor="email" style={{color: "blue"}}>Email:</label>
            <input type="email" name='email' value={userData.email}
            onChange={handleChange}/>
            {errors.email && <p style={{color: "blue"}}>{errors.email}</p>}
            <hr />
            <label htmlFor="password" style={{color: "blue"}}>Password:</label>
            <input type="password" name='password' value={userData.password}
            onChange={handleChange} />
            {errors.password && <p style={{color: "blue"}}>{errors.password}</p>}

            <button>Submit</button>
        </Form>
    )
}

export default Form;