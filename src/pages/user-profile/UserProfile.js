import { useDispatch, useSelector } from "react-redux";
import { db } from "../../services/firebase";
import {
  Alert,
  Box,
  Collapse,
  Container,
  styled,
  TextField,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm } from "react-hook-form";

import { getAlert } from "../../redux/actions";
import { getLoading } from "../../redux/store/selectors/getLoading";
import { getError } from "../../redux/store/selectors/getError";
import { getShowAlert } from "../../redux/store/selectors/getShowAlert";
import { getCurrentUser } from "../../redux/store/selectors/getCurrentUser";

import "./UserProfile.css";

const UserProfile = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getLoading());
  const error = useSelector(getError());
  const showAlert = useSelector(getShowAlert());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const currentUser = useSelector(getCurrentUser());
  const [data, setData] = useState({});

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

  const removeContact = (id) => {
    console.log("id", id);
    let ref = db.child(`contacts/${id}`);
    ref
      .remove()
      .then(() => {
        console.log("Remove succeeded.");
      })
      .catch((error) => {
        console.log("Remove failed: " + error.message);
      });
  };

  const onSubmit = (data) => {
    db.child("contacts").push(
      {
        uid: currentUser.uid,
        name: data.name,
        email: data.email,
        phone: data.phone,
      },
      (e) => {
        if (e) console.log(e);
      }
    );
    reset();
  };

  useEffect(() => {
    db.child("contacts").on("value", (snap) => {
      if (snap.val() !== null) {
        setData({ ...snap.val() });
      } else {
        setData({});
      }

      return () => {
        setData({});
      };
    });
  }, []);

  useEffect(() => {
    if (data.length !== 0) {
      console.log("data", data);
    }
  }, [data]);

  return (
    <Container>
      <div className="user-profile">
        <h1 className="title">User: {currentUser.displayName}</h1>
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
              {error ? error.toString() : "User profile saved successfully"}
            </Alert>
          </Collapse>
          <h2 className="text">Add contact:</h2>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <FormTextField
              className="input"
              label="Type contact name "
              id="custom-css-outlined-input"
              name="name"
              value={name}
              fullWidth
              {...register("name", {
                required: "Name required.",
                onChange: ({ e }) => {
                  setName(e);
                },
              })}
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
            />
            <FormTextField
              className="input"
              label="Type contact Email"
              id="custom-css-outlined-input"
              name="email"
              value={email}
              fullWidth
              {...register("email", {
                required: "Email required.",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Incorrect Email",
                },
                onChange: ({ e }) => {
                  setEmail(e);
                },
              })}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
            <FormTextField
              className="input"
              label="Type contact phone number"
              id="custom-css-outlined-input"
              name="phoneNumber"
              value={phone}
              fullWidth
              {...register("phone", {
                required: "Phone number required.",
                onChange: ({ e }) => {
                  setPhone(e);
                },
              })}
              error={Boolean(errors.phone)}
              helperText={errors.phone?.message}
            />
            <div className="group-btn">
              <button type="submit" className="btn btn-submit">
                <SaveIcon className="icon" /> SAVE
              </button>
            </div>
          </form>
          {loading && <LinearProgress className="line-progress" />}
        </Box>
        <h2 className="text">Your contacts:</h2>
        <Box sx={{ width: 560 }}>
          {Object.keys(data).length > 0 && (
            <table className="table-contacts">
              <thead className="table-head">
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {Object.keys(data) &&
                  Object.keys(data).map((id, key) => {
                    return (
                      <tr key={id}>
                        <td>{key + 1}</td>
                        <td>{data[id].name}</td>
                        <td>{data[id].email}</td>
                        <td>{data[id].phone}</td>
                        <td
                          onClick={() => removeContact(id)}
                          className="table-td"
                        >
                          <DeleteIcon className="icon" />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </Box>
        <Link className="link" to={"/"}>
          <HomeIcon className="icon-home" />
        </Link>
      </div>
    </Container>
  );
};

export default UserProfile;
