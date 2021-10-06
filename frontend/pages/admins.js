import Head from 'next/head'
import Image from 'next/image'
import GlobalForm from '../components/GlobalForm'
import styles from '../styles/Home.module.css'
import AdminsTable from '../components/AdminsTable'
import Sidebar from '../components/SideBar'
export default function admins() {
  return (
    <div>
        <Sidebar/>

      <AdminsTable/>
    </div>
  )
}
