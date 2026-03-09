import { ConfigProvider, Spin } from "antd";

const loading = () => {
  return (
    <div className=" h-screen w-full flex justify-center items-center">
      <ConfigProvider
        theme={{
          components: {
            Spin: {
              colorPrimary: "#28A745",
            },
          },
        }}
      >
        <Spin size="large" />
      </ConfigProvider>
    </div>
  );
};

export default loading;
