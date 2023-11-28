import { Link } from "react-router-dom";
import { Button } from "react-materialize";
import { Card, CardContent, CardHeader } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import callApi from "../ultis/apiCaller";
import { useNavigate } from "react-router-dom";

export default function Add() {
  const navigate = useNavigate();

  async function addData(values) {
    await callApi("Film", "POST", {
      name: values.name,
      image: values.image,
      status: values.status,
      episode: values.episode,
      studio: values.studio,
      description: values.description,
      background: values.background,
      clip: values.clip,
    }).then((res) => {
      console.log(res);
    });
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
      status: "",
      episode: "",
      studio: "",
      description: "",
      background: "",
      clip: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required")
        .typeError("Field must not be empty"),
      image: Yup.string()
        .url("Must be a valid URL")
        .required("Required")
        .typeError("Field must not be empty"),
      status: Yup.string()
        .required("Required")
        .typeError("Field must not be empty"),
      episode: Yup.string()
        .required("Required")
        .typeError("Field must not be empty"),
      studio: Yup.string()
        .required("Required")
        .typeError("Field must not be empty"),
      description: Yup.string()
        .required("Required")
        .typeError("Field must not be empty"),
      background: Yup.string()
        .url("Must be a valid URL")
        .required("Required")
        .typeError("Field must not be empty"),
      clip: Yup.string()
        .url(
          "Must be a valid URL have format: https://www.youtube.com/embed/{your clip id}"
        )
        .required("Required")
        .typeError("Field must not be empty"),
    }),
    onSubmit: (values) => {
      addData(values);
      formik.resetForm();
      navigate("/dashboard");
    },
  });

  return (
    <div>
      <div>
        <Link to="/Dashboard">
          <Button variant="contained" color="primary">
            Go Back Dashboard
          </Button>
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        <Card style={{ width: "1000px" }}>
          <CardHeader title="Add New Film" subheader="Add new film to AnimeZ" />
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  placeholder="Enter name"
                />
              </div>
              {formik.errors.name && formik.touched.name && (
                <p style={{ color: "red" }}>{formik.errors.name}</p>
              )}

              <div className="form-group">
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  className="form-control"
                  id="image"
                  value={formik.values.image}
                  onChange={formik.handleChange}
                  placeholder="Enter image"
                />
              </div>
              {formik.errors.image && formik.touched.image && (
                <p style={{ color: "red" }}>{formik.errors.image}</p>
              )}

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <input
                  type="text"
                  className="form-control"
                  id="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  placeholder="Enter status"
                />
              </div>
              {formik.errors.status && formik.touched.status && (
                <p style={{ color: "red" }}>{formik.errors.status}</p>
              )}

              <div className="form-group">
                <label htmlFor="episode">Episode</label>
                <input
                  type="number"
                  className="form-control"
                  id="episode"
                  value={formik.values.episode}
                  onChange={formik.handleChange}
                  placeholder="Enter episode"
                />
              </div>
              {formik.errors.episode && formik.touched.episode && (
                <p style={{ color: "red" }}>{formik.errors.episode}</p>
              )}

              <div className="form-group">
                <label htmlFor="studio">Studio</label>
                <input
                  type="text"
                  className="form-control"
                  id="studio"
                  value={formik.values.studio}
                  onChange={formik.handleChange}
                  placeholder="Enter studio"
                />
              </div>
              {formik.errors.studio && formik.touched.studio && (
                <p style={{ color: "red" }}>{formik.errors.studio}</p>
              )}

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  placeholder="Enter description"
                />
              </div>
              {formik.errors.description && formik.touched.description && (
                <p style={{ color: "red" }}>{formik.errors.description}</p>
              )}

              <div className="form-group">
                <label htmlFor="background">Background Image</label>
                <input
                  type="text"
                  className="form-control"
                  id="background"
                  value={formik.values.background}
                  onChange={formik.handleChange}
                  placeholder="Enter background image"
                />
              </div>
              {formik.errors.background && formik.touched.background && (
                <p style={{ color: "red" }}>{formik.errors.background}</p>
              )}

              <div className="form-group">
                <label htmlFor="background">Clip YTB</label>
                <input
                  type="text"
                  className="form-control"
                  id="clip"
                  value={formik.values.clip}
                  onChange={formik.handleChange}
                  placeholder="Enter clip YTB URL"
                />
              </div>
              {formik.errors.clip && formik.touched.clip && (
                <p style={{ color: "red" }}>{formik.errors.clip}</p>
              )}

              <Button variant="contained" color="primary" type="submit">
                Add
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
