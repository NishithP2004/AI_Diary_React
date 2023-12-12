import "./Layout.css";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

function Layout(props) {
  return (
    <div className="layout">
      <Header />
      <Sidebar />
      {props.children}
      <Footer />
    </div>
  );
}

export default Layout;
