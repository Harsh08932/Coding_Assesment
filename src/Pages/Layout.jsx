import { Outlet, useNavigation } from "react-router-dom"
import NavBar from "../components/NavBar";
import Loading from "../components/Loading";
import { SidebarProvider } from "../Context/SidebarContext";

const Layout = () => {
  const navigate = useNavigation();
  const isPageLoading = navigate.state === "loading";

  return (
    <SidebarProvider>
      <>
        <NavBar />

        {isPageLoading ? (
          <Loading />
        ) : (
          <section className="align-element">
            <Outlet className="align-element py-20" />
          </section>
        )}
      </>
    </SidebarProvider>
  );
}

export default Layout