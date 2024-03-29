/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, Fragment } from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';
import { getDemoData } from './store/demoReducer';
import { Helmet } from 'react-helmet';

interface IProps {
  content?: string;
  getDemoData?: (data: string) => void;
}

const Demo: FC = (data: IProps) => {
  // const [content, setContent] = useState("");

  // 客户端异步请求
  // useEffect(() => {
  //   axios.post("/api/getDemoData", {
  //     content: '这是一个 demo 页面',
  //   }).then((res) => {
  //     setContent(res.data?.data?.content);
  //   });
  // }, []);

  return (
    <Fragment>
      <Helmet>
        <title>简易的服务端渲染框架- DEMO</title>
        <meta name='description' content='服务端渲染框架'></meta>
      </Helmet>
      <div>
        <h1>{data.content}</h1>
        <button onClick={(): void => {
          data.getDemoData && data.getDemoData("刷新过后的数据")
        }}>
          刷新
        </button>
      </div>
    </Fragment>
  );
};

const mapStateProps = (state: any) => {
  // 将对应 reducer 的内容透传回 dom
  return {
    content: state?.demo?.content
  }
}

const mapDispatchProps = (dispatch: any) => {
  return {
    getDemoData: (data: string) => {
      dispatch(getDemoData(data));
    }
  }
}
const storeDemo = connect(mapStateProps, mapDispatchProps)(Demo);

storeDemo.getInitProps = (store: any, data?: string) => {
  return store.dispatch(getDemoData(data || '这是初始化的demo'));
}

export default storeDemo;