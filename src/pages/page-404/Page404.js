import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

import "./Page404.css";

const Page404 = () => {
  return (
    <div className="page-404">
      <h1>Page404</h1>
      <Link className="link" to={"/"}>
        <HomeIcon className="icon-home" />
      </Link>
    </div>
  );
};

export default Page404;
