'use client'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import React, { useState,  useEffect} from 'react';
import { Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const { register, handleSubmit, formState: { errors } } = useForm()
const [error, setError] = useState(null);
const [success, setSuccess] = useState(null);
  const onSubmit = async (data) => {
    try {
      const res = await signIn('credentials', {
        redirect: false,
        ...data,
        callbackUrl: "/",
      })
      console.log('Res', res)
      if (!res?.error) {
        setSuccess('Login successful'); 
        router.push(callbackUrl)
      } else {
        setError(res.error) 
      }
    } catch (err) {
      setError(err.message || 'Unknown error')
    }
     
  }
  console.log(error)
  useEffect(() => {
    const cleanup = () => {
      setError(null); 
      setSuccess(null); 
    }; 
    return cleanup;
  }, [])

  return (
    <> 
    <div className="loginform">
      <div className="loginforminner">
            {error && ( 
            <Alert variant="danger">
              {error === 'CredentialsSignin' ? 'Invalid email or password' : error}
            </Alert>
          )}
           {success && ( 
            <Alert variant="success">
              {success}
            </Alert>
          )}
       <h2 >Login</h2>
       <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup className="mb-3">
        <FormLabel>Email address</FormLabel>
        <FormControl
          type="email"
          placeholder="name@example.com"
          {...register('email', { required: true })}
          id="email"
          isInvalid={errors.email}
        />
        {errors.email && (
          <Form.Control.Feedback type="invalid">
            {errors.email.message || 'Email is required'}
          </Form.Control.Feedback>
        )}
      </FormGroup>
      <FormGroup className="mb-3">
        <FormLabel>Password</FormLabel>
        <FormControl
          type="password"
          placeholder="Password"
          {...register('password', { required: true })}
          id="password"
          isInvalid={errors.password}
        />
        {errors.password && (
          <Form.Control.Feedback type="invalid">
            {errors.password.message || 'Password is required'}
          </Form.Control.Feedback>
        )}
      </FormGroup>
      <div className="loginbutton-group">
      <Button type="submit" variant="info">Login</Button>
      <Button type="button" onClick={() => router.push(`/resetpassword`)} className="loginreset-password " variant="info">
        Reset password
      </Button>
      </div>
    </Form>
    </div>
    </div>
    </>
  )
}