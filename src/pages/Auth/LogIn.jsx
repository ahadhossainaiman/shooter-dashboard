import { Button, Checkbox, Form, Input } from "antd";

import { HiOutlineMailOpen } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

import loginImg from "../../assets/shooter.png";
import logo from "../../assets/logo.png";
import { IconLock } from "@tabler/icons-react";
import baseURL from "../../config";
import Swal from "sweetalert2";

const LogIn = () => {
  //   const dispatch = useAppDispatch();
  //   const {isSuccess, user} = useAppSelector(state=> state.login);
  const navigate = useNavigate();

  //   const [email, setEmail] = useState<string>('')
  //   const [password, setPassword] = useState<string>('')

  const onFinish = async ({ email, password }) => {
    // console.log(values);
    try {
      const response = await baseURL.post(
        `/user/sign-in`,
        { email, password, loginType:3 },
        {
          headers: {
            "Content-Type": "application/json",
            authentication: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      if (response?.data?.statusCode == 200) {
        localStorage.setItem("token", response?.data?.data?.token);
        localStorage.setItem(
          "user-update",
          JSON.stringify(response?.data?.data?.attributes)
        );
      }
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: response?.data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Try Again...",
        text: error?.response?.data?.message,
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };
  return (
    <div className="mx-[310px]  bg-[#FFE7EA21] px-[115px] py-[120px] rounded-xl border-2 border-red-500">
      <div className="flex gap-[120px]">
        <div className="flex items-center">
          <img src={loginImg} alt="" />
        </div>
        <div>
          <div className="w-[500px]">
            <img src={logo} alt="" />
            <h1 className="text-[24px] text-white font-medium mt-[24px] mb-[32px]">
              Hello,Welcome!
            </h1>
            <p className=" text-16 text-white mt-[24px] mb-[32px]">
              Please Enter Your Details Below to Continue
            </p>
            <Form
              name="normal_login"
              // className="login-form"
              labelCol={{ span: 22 }}
              wrapperCol={{ span: 40 }}
              layout="vertical"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              className="space-y-4"
            >
              <Form.Item
                name="email"
                label={
                  <span className="text-[white] text-[16px] font-medium">
                    Email
                  </span>
                }
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter Your Email"
                  name="email"
                  prefix={
                    <HiOutlineMailOpen
                      className="mr-2 bg-white text-black rounded-full p-[6px]"
                      size={28}
                      color="red"
                    />
                  }
                  style={{
                    borderBottom: "2px solid #4E4E4E",
                    height: "52px",
                    background: "#F6F6F6",
                    outline: "none",
                    marginBottom: "20px",
                  }}
                  required
                  bordered={false}
                />
              </Form.Item>

              <Form.Item
                name="password"
                label={
                  <span className="text-[white] text-[16px] font-medium">
                    Password
                  </span>
                }
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  // onChange={handleChange}
                  placeholder="Enter Your Password"
                  name="current_password"
                  prefix={
                    <IconLock
                      className="mr-2 bg-white rounded-full p-[6px]"
                      size={28}
                      color="red"
                    />
                  }
                  style={{
                    borderBottom: "2px solid #4E4E4E",
                    height: "52px",
                    background: "#F6F6F6",
                    outline: "none",
                    marginBottom: "20px",
                  }}
                  bordered={false}
                />
              </Form.Item>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {/* <Form.Item name="remember" valuePropName="checked" >
                  <Checkbox >
                    <span className="text-[white] hover:text-red-500 font-medium">
                      {" "}
                      Remember Me
                    </span>
                  </Checkbox>
                </Form.Item> */}
                </div>
                <div>
                  <Link
                    to="/auth/forgot-password"
                    className="text-[white] hover:text-red-500 font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div></div>

              <Form.Item>
                <Button
                  // type="primary"
                  htmlType="submit"
                  className="block w-[500px] h-[56px] px-2 py-4 mt-2 text-white bg-gradient-to-r from-red-500 to-red-800 rounded-lg hover:bg-gradient-to-r hover:from-red-500 hover:to-red-800"
                >
                  Log in
                </Button>
                {/* <Link to="/dashboard"
              // type="primary"
              // htmlType="submit"
              className="block text-center w-[350px] h-[56px] px-2 py-4 mt-2 hover:text-white text-white bg-[#3BA6F6] rounded-lg"
            >
              Log In
            </Link> */}
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
