import React, { useState, useEffect } from "react";
import icons from "../utils/icons";
import { Input } from "../Components";
import { Link } from "react-router-dom";
import * as actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const {
  FaUserCircle,
  GiArchiveRegister,
  AiFillEye,
  AiFillEyeInvisible,
  RiLockFill,
  MdMail,
  RiUser2Fill,
  ImUser,
  FcGoogle,
  BsFacebook,
} = icons;
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [invalidFields, setInvalidFields] = useState([]);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [playload, setPlayload] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    isLoggedIn && navigate("/");
  }, [isLoggedIn]);

  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      dispatch(actions.loginSuccses(playload));
    }
  };
  const handleLoginGoogle = async () => {
    window.open("http://localhost:8000/api/auth/google", "_self");
  };

  const handleLoginFacebook = async (type) => {
    window.open("http://localhost:8000/api/auth/facebook", "_self");  
  };

  const handleSubmit = async () => {
    let payloadFinal = isRegister
      ? playload
      : {
          username: playload.username,
          password: playload.password,
        };
    let invalids = validate(payloadFinal);
    if (invalids === 0) {
      if (isRegister) {
        navigate("/login");
        dispatch(actions.register(playload));
        setIsRegister(false);
        setPlayload({
          username: "",
          email: "",
          password: "",
        });
      } else {
        dispatch(actions.loginSuccses(playload));
      }
    }
  };
  const validate = (playload) => {
    let invalids = 0;
    let fields = Object.entries(playload);
    fields.forEach((item) => {
      if (item[1] === "") {
        setInvalidFields((prev) => [
          ...prev,
          {
            name: item[0],
            message: "Bạn không được bỏ trống ô này.",
          },
        ]);
        invalids++;
      }
    });
    fields.forEach((item) => {
      switch (item[0]) {
        case "password":
          if (item[1].length < 6) {
            setInvalidFields((prve) => [
              ...prve,
              {
                name: item[0],
                message: "Mật khẩu tối thiểu phải có 6 kí tự.",
              },
            ]);
            invalids++;
          }
        default:
          break;
      }
    });
    return invalids;
  };
  return (
    <div>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="flex items-center mb-6">
            {isRegister ? (
              <GiArchiveRegister size={100} />
            ) : (
              <FaUserCircle size={100} />
            )}
          </div>
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
                {isRegister ? "Create your account" : "Sign in to your account"}
              </h1>
              <form className="space-y-4 md:space-y-6">
                <span>
                  <ImUser className="absolute right-[930px] cursor-pointer items-center h-[100px] justify-center flex" />
                </span>
                <Input
                  setInvalidFields={setInvalidFields}
                  invalidFields={invalidFields}
                  label={"Username"}
                  name={"username"}
                  type={"username"}
                  value={playload.username}
                  setValue={setPlayload}
                  onKeyDown={(e) => handleEnter(e)}
                />
                {isRegister && (
                  <div>
                    <span>
                      <MdMail className="absolute right-[930px] bottom-[300px] cursor-pointer items-center h-[100px] justify-center flex" />
                    </span>
                    <Input
                      setInvalidFields={setInvalidFields}
                      invalidFields={invalidFields}
                      label={"Email"}
                      name={"email"}
                      type={"email"}
                      value={playload.email}
                      setValue={setPlayload}
                    />
                  </div>
                )}
                <div className="flex w-full gap-3">
                  <div>
                    <span>
                      <RiLockFill className="absolute right-[930px] cursor-pointer items-center h-[100px] justify-center flex" />
                    </span>
                    <Input
                      setInvalidFields={setInvalidFields}
                      invalidFields={invalidFields}
                      label={"Password"}
                      name={"password"}
                      type={isShowPassword ? "password" : "text"}
                      value={playload.password}
                      setValue={setPlayload}
                      onKeyDown={(e) => handleEnter(e)}
                    />
                  </div>
                  <span className="absolute left-[930px] cursor-pointer items-center h-[100px] justify-center flex">
                    {isShowPassword ? (
                      <AiFillEye onClick={() => setIsShowPassword(false)} />
                    ) : (
                      <AiFillEyeInvisible
                        onClick={() => setIsShowPassword(true)}
                      />
                    )}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {isRegister ? "Sign up" : "Sign in"}
                </button>
                <p className="text-sm font-light text-gray-500 flex flex-col gap-3">
                  <span className="flex gap-2 items-center">
                    Sign in with <FcGoogle size={25} className="cursor-pointer" onClick={handleLoginGoogle}/>
                    <BsFacebook size={25} className="cursor-pointer" color="blue" onClick={handleLoginFacebook}/>
                  </span>
                  <b className="flex">
                    {isRegister ? "Go to back" : "Don’t have an account?"}
                    <span className="font-medium text-primary-600 hover:underline cursor-pointer">
                      {isRegister ? (
                        <span
                          onClick={() => {
                            setIsRegister(false);
                            setPlayload({
                              username: "",
                              email: "",
                              password: "",
                            });
                          }}
                        >
                          <Link to={`/login`}>Sign in</Link>
                        </span>
                      ) : (
                        <span
                          onClick={() => {
                            setIsRegister(true);
                            setPlayload({
                              username: "",
                              email: "",
                              password: "",
                            });
                          }}
                        >
                          <Link to={`/register`}>Sign up</Link>
                        </span>
                      )}
                    </span>
                  </b>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
