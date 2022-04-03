import style from "./Header.module.scss";
import logo from "./RubMonitor.png";
import { Outlet } from "react-router-dom";

function Header() {
  return (
    <header className={style.header}>
      <img className={style.logo} src={logo} alt="Logo" />
      <Outlet/>
    </header>
  );
}

export default Header;
