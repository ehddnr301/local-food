import React, { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
import Loading from "../Components/Loading";
import { connect } from "react-redux";
import { loginUser } from "../Components/Store";

const GCallback = ({ history, location, dispatch }) => {
  const [user, setUser] = useState([]);
  // useState로 로그인상태를 true로 만들기 ?
  // 유저정보를 받아서 리덕스로 관리
  // 로그아웃 하면 리덕스에서 삭제 ?
  useEffect(() => {
    async function getToken() {
      const { code } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });

      try {
        const user = await axios.post(
          `http://localhost:4000/user/auth/github`,
          {
            code,
          }
        );
        console.log(user.data);
        dispatch(loginUser(user));

        localStorage.setItem("user", user.data);

        history.push("/"); // 로그인이 완료되면 보여줄 페이지
      } catch (error) {
        history.push("/error"); // api요청이 실패했을때 애러 핸들링 페이지
      }
    }

    getToken();
  }, [location, history]);

  return <Loading />;
};

const mapDispatchToProp = (dispatch) => {
  return { dispatch };
};

export default connect(null, mapDispatchToProp)(GCallback);
