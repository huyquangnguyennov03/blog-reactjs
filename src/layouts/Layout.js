import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { ScaleLoader } from 'react-spinners'
import { useSelector } from 'react-redux'


const override = {
    position: 'absolute',
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    zIndex: '9999',
    backgroundColor: "rgba(0, 0, 0/ 30%)",
    textAlign: "center",
}

const Layout = () => {
  const statusLoading = useSelector((state) => state.globalLoading.status)  
  return (
    <div>
      <ScaleLoader loading={statusLoading} cssOverride={override} color="red" />
      <Outlet />
      <ToastContainer />
    </div>
  )
}

export default Layout
