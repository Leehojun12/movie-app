import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../modules/user";

function Navigation({ location, history }) {
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));
  const path = location.pathname;

  const onLogout = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <div className="nav">
      <Link to="/">홈</Link>
      {user ? (
        <button
          onClick={onLogout}
          style={{ background: "none", border: "none" }}
        >
          <Link to="/">로그아웃</Link>
        </button>
      ) : (
        <Link to={path === "/login" ? "/register" : "login"}>
          {path === "/login" ? "회원가입" : "로그인"}
        </Link>
      )}
    </div>
  );
}

export default withRouter(Navigation);
