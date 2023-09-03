import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { Helmet } from "react-helmet";
// ./src/pages/Home/index.tsx
const Home = () => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Helmet>
        <title>简易的服务端渲染 - HOME</title>
        <meta name="description" content="服务器端渲染"></meta>
      </Helmet>
      <h1>hello-ssr</h1>
      <div>
        <button
          onClick={(): void => {
            alert("hello-ssr");
          }}
        >
          alert
        </button>
        <div>
          <a href="http://127.0.0.1:3000/demo">demo链接跳转</a>
        </div>
        <button onClick={(): void => {
          navigate("/demo");
        }}>
          客户端路由跳转
        </button>
      </div>
    </Fragment>
  );
};

export default Home;
