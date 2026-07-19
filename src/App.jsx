import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Pages/Layout";
import ProductHomePage from "./Pages/ProductHomePage";
import SingleProductPage from "./Pages/SingleProductPage";
import ErrorPage from "./Pages/ErrorPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <ProductHomePage /> },
        { path: "product/:id", element: <SingleProductPage /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
