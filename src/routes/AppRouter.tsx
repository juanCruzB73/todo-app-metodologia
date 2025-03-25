import { Navigate, Route, Routes } from "react-router-dom"
import { BackogsScreen } from "../components/screen/backlog-screen/BackogsScreen"
import { TaskScreen } from "../components/screen/task-screen/TaskScreen"

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/*" element={<Navigate to={"/backlogs"}/>}/>
        <Route path="/backlogs" element={<BackogsScreen/>}/>
        <Route path="/tasks" element={<TaskScreen/>}/>
    </Routes>
  )
}