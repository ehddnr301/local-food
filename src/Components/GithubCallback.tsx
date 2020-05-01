import React, { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import Loading from "./Loading";

const Callback = ({ history, location }) => {
  // useState로 로그인상태를 true로 만들기 ?
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
        console.log(user);

        history.push("/"); // 로그인이 완료되면 보여줄 페이지
      } catch (error) {
        history.push("/error"); // api요청이 실패했을때 애러 핸들링 페이지
      }
    }

    getToken();
  }, [location, history]);

  return <Loading />;
};

export default Callback;
