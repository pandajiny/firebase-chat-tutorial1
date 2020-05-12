import React from "react";

import { ROUTES } from "../../constants";
import { Link } from "react-router-dom";
import { doSignout } from "../../helpers/auth";

function Navitation() {
  return (
    <div>
      <ul>
        <li>
          <Link to={ROUTES.HOME}>HOME</Link>
        </li>
        <li>
          <Link to={ROUTES.LOGIN}>LOGIN</Link>
        </li>
        <li>
          <Link to={ROUTES.SIGNUP}>SIGNUP</Link>
        </li>
        <li>
          <Link to={ROUTES.CHAT}>CHAT</Link>
        </li>
        <li>
          <button
            onClick={() => {
              doSignout();
              console.log("logout!");
            }}
          >
            Log out
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Navitation;
