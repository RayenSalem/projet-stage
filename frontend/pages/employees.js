
import EmployeesTable from '../components/Employees'
import Sidebar from '../components/SideBar'

export default function employees(){
    return (
        <div>
        <Sidebar/>
            <EmployeesTable/>
        </div>
    )
}