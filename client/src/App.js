import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/shared/forms/Routes/ProtectedRoute";
import PublicRoute from "./components/shared/forms/Routes/PublicRoute";
import RawMaterial from "./pages/RawMaterial";
import Statistics from "./pages/Statistics";
import AllProducts from "./pages/AllProducts";
import AllMaterials from "./pages/AllMaterials";
import BufferedProducts from "./pages/BufferedProducts";
import BufferedMaterials from "./pages/BufferedMaterials";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
      <Route
          path="/all-products"
          element={
            <ProtectedRoute>
              <AllProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-materials"
          element={
            <ProtectedRoute>
              <AllMaterials />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/raw-material"
          element={
            <ProtectedRoute>
              <RawMaterial />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buffered-products"
          element={
            <ProtectedRoute>
              <BufferedProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buffered-materials"
          element={
            <ProtectedRoute>
              <BufferedMaterials />
            </ProtectedRoute>
          }
        />
        <Route
          path="/statistics"
          element={
            <ProtectedRoute>
              <Statistics />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
