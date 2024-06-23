import { Input } from "antd";
import { useSearchParams } from "react-router-dom";

export const Location = () => {
  const [searchParams] = useSearchParams({
    pathname: "/",
  });

  const pathname = searchParams.get("pathname") as string;

  return <Input variant="filled" size="small" value={pathname}></Input>;
};
