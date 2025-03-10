import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../not-found/NotFound";
import List from "../../clothes/list/List";
import Add from "../../clothes/add/Add";
import Home from "../../home/Home";


export default function Routing(): JSX.Element {

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/items/list" element={<List />} />
            <Route path="/items/add" element={<Add />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}