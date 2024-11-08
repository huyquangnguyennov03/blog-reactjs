import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import requestAPI from '../helpers/api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import * as actions from '../redux/actions'

const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const dispatch = useDispatch()


    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        if(isSubmit) {
            validate()
        }
    }, [formData])

    const validate = () => {
       let isValid = true
       const errors = {}
       if(formData.email === '' || formData.email === undefined) {
        errors.email = 'Vui lòng nhập email'
       }else{
        let valid = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(formData.email)
        if(!valid) {
            errors.email = 'Email không đúng định dạng'
         }
       }
       if(formData.password === '' || formData.password === undefined) {
        errors.password = 'Vui lòng nhập password'
       }
       if(Object.keys(errors).length > 0) {
        setErrors(errors)   
        isValid = false
       }else{
        setErrors({})
       }
       return isValid
    }

    const onSubmit = (e) => {
        // e.preventDefault()
        console.log(formData)
        let valid = validate()
        if(valid) {
            console.log('request login apiS')
            dispatch(actions.controloading(true))
            requestAPI('/auth/login', 'POST', formData).then(res => {
                console.log(res)
                localStorage.setItem('access_token', res.data.access_token);
                localStorage.setItem('refresh_token', res.data.refresh_token);
                toast.success('Đăng nhập thành công!', {position: "top-center"})
                dispatch(actions.controloading(false))
                navigate('/')
            }).catch(err => {
                dispatch(actions.controloading(false))
                console.log(err)
                if(typeof err.response !== 'undefined') {
                    if(err.response.status === 201) {
                        toast.error(err.response.data.message, { position: "top-center"})
                    }
                }else {
                    toast.error("Đăng nhập thất bại rồi!", {position: "top-center"})
                }
            })
        }
        setIsSubmit(true)
        
    }

  return (
    
    <div id="layoutAuthentication"className='bg-primary'>
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                                    <div className="card-body">
                                        <form>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" type="email" name='email' onChange={onChange} placeholder="name@example.com" />
                                                <label>Email address</label>
                                                {errors.email && <p style={{color: 'red'}}>{errors.email}</p>}
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" type="password" name='password' onChange={onChange} placeholder="Password" />
                                                <label>Password</label>
                                                {errors.password && <p style={{color: 'red'}}>{errors.password}</p>}
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <a className="small" href="password.html">Forgot Password?</a>
                                                <button className="btn btn-primary" type='button' onClick={onSubmit}>Login</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <div className="small">
                                            <Link to = '/register'>Need an account? Sign up!</Link>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div id="layoutAuthentication_footer">
                <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid px-4">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">Copyright &copy; Your Website 2021</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
  )
}

export default Login
