import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Loading from "../atoms/Loading";

const Room = lazy(() => import("../organisms/Room"));
const Sidebar = lazy(() => import("../organisms/Sidebar"));

export default function App() {
  const AppBody = styled(Box)({
    display: "flex",
    backgroundColor: "#d8e3e7",
    height: "90vh",
    boxShadow: "-1px 4px 20px -6px #d8e3e7",
    fontFamily: "Arial, Helvetica, 'sans-serif'",
  });

  return (
    <AppBody>
      <Suspense fallback={<Loading />}>
        <Sidebar />
        <Routes>
          <Route
            path="rooms/:roomId"
            element={
              <Suspense fallback={<Loading />}>
                <Room />
              </Suspense>
            }
          />
        </Routes>
      </Suspense>
    </AppBody>
  );
}
