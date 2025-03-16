import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../not-found/NotFound";
import Login from "../../auth/login/Login";



export default function Routing(): JSX.Element {

    return (
        <Routes>

            <Route path="/" element={<Navigate to="/auth/login" />} />
            <Route path="/auth/login" element={<Login />} />
            {/* <Route path="/vacations" element={<Vacation />} /> */}

            {/* {isAdmin && ( */}
                <>
                    {/* <Route path="/admin" element={<Dashboard />} /> */}
                    {/* <Route path="/admin/add" element={<Add />} /> */}
                    {/* <Route path="/admin/edit/:id" element={<Edit />} /> */}
                </>
            {/* )} */}

            <Route path="*" element={<NotFound />} />

        </Routes>
    )
}