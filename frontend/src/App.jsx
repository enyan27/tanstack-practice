import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import useTheme from "./hooks/useTheme";
import useAuthReq from "./hooks/useAuthReq";
import useUserSync from "./hooks/useUserSync";
import { CreateProductPage, EditProductPage, HomePage, ProductPage, ProfilePage } from "./pages";

const App = () => {
  const { theme } = useTheme();
  useAuthReq();
  useUserSync();

  return (
    <>
      <div className="min-h-screen bg-base-100" data-theme={theme}>
        <Navbar />
        <main className="max-w-5xl mx-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/create" element={<CreateProductPage />} />
            <Route path="/edit" element={<EditProductPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
};

export default App;
