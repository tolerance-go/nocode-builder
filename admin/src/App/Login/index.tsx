import { Avatar, Typography } from "antd";
import LoginForm from "./LoginForm";

export const Login = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-shrink-0 min-w-[500px] bg-slate-100 flex justify-center items-center border-r w-2/5">
        <div className="w-[400px] -translate-y-1/4">
          <div className="text-center pb-8">
            <Typography.Title>UNOCODE</Typography.Title>
            <Typography.Title level={4}>下一代无代码开发平台</Typography.Title>
          </div>
          <div className="pb-4">
            <LoginForm />
          </div>
          <div className="text-center">
            <Typography.Text>
              使用 UNOCODE 即表示您同意我们的{" "}
              <Typography.Link underline>许可协议</Typography.Link>
            </Typography.Text>
          </div>
        </div>
      </div>
      <div className="flex-grow min-w-[500px] flex justify-center items-center">
        <div className="w-[400px] -translate-y-1/4 flex flex-col gap-2">
          <div className="mb-0.5">
            <Avatar size={"large"} />
          </div>
          <Typography.Paragraph>
            <Typography.Text className="text-lg">
              “
              <Typography.Text italic>
                使用 UNOCODE
                零代码平台，我无需编程基础，只要懂业务，就能快速上线所需应用，真的很方便，强烈推荐！
              </Typography.Text>
              ”
            </Typography.Text>
          </Typography.Paragraph>
          <Typography.Paragraph>
            <Typography.Text strong>周天宇</Typography.Text>
            <br />
            光大证券高级产品经理
          </Typography.Paragraph>
        </div>
      </div>
    </div>
  );
};
