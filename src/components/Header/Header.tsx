
import { Link } from "react-router-dom";
import s from "./header.module.scss"

const Header = () => {



  return (
    <div className={s.header}>
      <div className={s.navigation}>
        <Link to="animation_1">
          <h3>animation_1</h3>
        </Link>
        <Link to="animation_2">
          <h3>animation_2</h3>
        </Link>
        <Link to="animation_3">
          <h3>animation_3</h3>
        </Link>
      </div>



    </div >
  );
};

export default Header;