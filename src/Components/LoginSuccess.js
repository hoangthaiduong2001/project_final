import React, {useEffect} from 'react'
import { apiLoginSuccess } from '../services/auth'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as actions from '../store/actions'

const LoginSuccess = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userId } = useParams()
  console.log(userId)
  useEffect(() => {
      dispatch(actions.loginGoogle(userId))
      dispatch(actions.loginFacebook(userId))
      dispatch(actions.getCurrent())
      navigate('/')
  }, [])
  return (
    <div>LoginSuccess</div>
  )
}

export default LoginSuccess