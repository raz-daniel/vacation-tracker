import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../not-found/NotFound";
import List from "../../vacations/list/List";
import { useContext } from "react";
import { AuthContext } from "../../auth/auth/Auth";
import { UserRole } from "../../../models/user/User";
import Add from "../../vacations/add/Add";
import Edit from "../../vacations/edit/Edit";
import Report from "../../vacations/report/Report";


export default function Routing(): JSX.Element {

    const { role, isLoading } = useContext(AuthContext)!
    const isAdmin = role === UserRole.ADMIN

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <Routes>

            <Route path="/" element={<Navigate to="/vacations" />} />
            <Route path="/vacations" element={<List />} />

            {isAdmin &&
                <>
                    <Route path="/vacations/reports" element={<Report />} />
                    <Route path="/vacations/add" element={<Add />} />
                    <Route path="/vacations/edit/:id" element={<Edit />} />
                </>
            }

            <Route path="*" element={<NotFound />} />

        </Routes>
    )
}