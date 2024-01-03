import React from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import DefaultLayout from 'src/layout/DefaultLayout'

const PrivateRote = ({ ...rest }) => {
  const token = Cookies.get('accessToken')
  return token ? <DefaultLayout {...rest} /> : <Navigate to="/admin" />
}

export default PrivateRote
