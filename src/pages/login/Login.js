import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Box,
  Collapse,
  Container,
  styled,
  TextField,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { useForm } from "react-hook-form";

import { getAlert, loginInitiate } from "../../redux/actions";
import { getLoading } from "../../redux/store/selectors/getLoading";
import { getError } from "../../redux/store/selectors/getError";
import { getShowAlert } from "../../redux/store/selectors/getShowAlert";
import { getCurrentUser } from "../../redux/store/selectors/getCurrentUser";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(getLoading());
  const error = useSelector(getError());
  const showAlert = useSelector(getShowAlert());
  const currentUser = useSelector(getCurrentUser());
  const elInputEmail = useRef(null);
  const elInputPassword = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const FormTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#7c5b70",
        border: "2px solid #7c5b70",
      },
      "&:hover fieldset": {
        borderColor: "#7c5b70",
      },
    },
  });

  const onSubmit = async (data) => {
    dispatch(loginInitiate(data.email, data.password));
    reset();
  };

  useEffect(() => {
    if (currentUser?.displayName) {
      setTimeout(() => {
        dispatch(getAlert(false));
        navigate("/");
      }, 1500);
    }
    // eslint-disable-next-line
  }, [currentUser, navigate]);

  return (
    <Container>
      <div className="login-page">
        <Box
          className="box"
          sx={{
            bgcolor: "#fef6e4",
          }}
        >
          <Collapse in={showAlert}>
            <Alert
              className="alert"
              severity={error ? "error" : "success"}
              onClick={() => {
                dispatch(getAlert(false));
              }}
            >
              {error ? error.toString() : "User successfully login"}
            </Alert>
          </Collapse>
          <h2 className="text">Login:</h2>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <FormTextField
              inputRef={elInputEmail}
              className="input"
              label="Type your email"
              id="custom-css-outlined-input"
              name="email"
              fullWidth
              {...register("email", {
                required: "Email required.",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Incorrect email",
                },
              })}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
            <FormTextField
              inputRef={elInputPassword}
              label="Type your password"
              id="custom-css-outlined-input"
              name="password"
              type="password"
              className="input"
              fullWidth
              {...register("password", {
                required: "Password required.",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />
            <button type="submit" className="btn btn-submit">
              SEND
            </button>
          </form>{" "}
          {loading && <LinearProgress className="line-progress" />}
        </Box>
        <Link className="link" to={"/"}>
          <HomeIcon className="icon-home" />
        </Link>
      </div>
    </Container>
  );
};

export default Login;
