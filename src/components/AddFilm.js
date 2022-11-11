import React, { useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { storeImageToFireBase } from "../utils/storeImageToFirebase.";
import axios from "axios";
import { object, string } from "yup";

function AddFilm({ idPlayer, setIdPlayer }) {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFront, setImageFront] = useState(null);
  console.log(idPlayer);
  useEffect(
    () => {
      const uploadImage = async () => {
        setIsLoading(true);
        if (!selectedFile) {
          setIsLoading(false);
          return;
        }
        const { isSuccess, imageUrl, message } = await storeImageToFireBase(
          selectedFile
        );
        if (isSuccess) {
          setImageFront(imageUrl);
          setIsLoading(false);
          return imageUrl;
        } else {
          console.log(message);
        }
        setIsLoading(false);
      };
      uploadImage();
    },
    // eslint-disable-next-line
    [selectedFile]
  );
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };
  const [APIData, setAPIData] = useState(null);
  useEffect(() => {
    idPlayer &&
      fetch(`https://636e5dac182793016f3ec699.mockapi.io/news/${idPlayer}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setAPIData(data);
        })
        .catch((error) => console.log(error.message));
  }, []);
  const onSubmit = (values, formikHelpers) => {
    setLoading(true);
    if (APIData !== null) {
      axios({
        method: "PUT",
        url: `https://636e5dac182793016f3ec699.mockapi.io/news/${idPlayer}`,
        data:
          imageFront !== null
            ? { ...values, image: imageFront }
            : { ...values },
      })
        .then((res) => {
          console.log(res);
          setImageFront(null);
          setLoading(false);
          setAPIData(null);
          setIdPlayer(null);
          alert("success");
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
          alert("fail");
        });
      formikHelpers.resetForm();
    } else {
      axios({
        method: "POST",
        url: "https://636a5e61b10125b78fd9321f.mockapi.io/db",
        data: { ...values, image: imageFront },
      })
        .then((res) => {
          console.log(res);
          setImageFront(null);
          setLoading(false);
          alert("success");
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
          alert("fail");
        });
      formikHelpers.resetForm();
    }
  };
  const users =
    APIData !== null
      ? {
          image: APIData.image,
          title: APIData.title,
          year: APIData.year,
          nation: APIData.nation,
          des: APIData.des,
          clip: APIData.clip,
        }
      : {
          image: "",
          title: "",
          year: "",
          nation: "",
          des: "",
          clip: "",
        };

  return (
    <div
      style={{ textAlign: "center", display: "flex", justifyContent: "center" }}
    >
      <div className="containerDetail" style={{ width: "60%" }}>
        <div className="white_box_5">
          <div className="profile_info">
            <div className="Container_info">
              <h2>Add Film</h2>
              {imageFront !== null ? (
                <img
                  className="profile_card"
                  src={imageFront}
                  alt=""
                  style={{ width: "500px" }}
                />
              ) : (
                APIData !== null && (
                  <img
                    className="profile_card"
                    src={APIData.image}
                    alt=""
                    style={{ width: "500px" }}
                  />
                )
              )}
              <div>
                {isLoading ? (
                  <button
                    type="button"
                    disabled
                    style={{
                      opacity: ".4",
                      width: "30%",
                    }}
                    className="chooseFileButton btn btn-primary btn--m"
                  >
                    loading..
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className="chooseFileButton btn btn-primary btn--m"
                      style={{ width: "10%", height: "50px" }}
                    >
                      Chọn hình
                    </button>
                    <input
                      type="file"
                      name="profileImageUrl"
                      accept="image/*"
                      onChange={onSelectFile}
                      id="upload"
                      className="btn"
                      style={{
                        opacity: 0,
                        zIndex: 1,
                        left: 0,
                        width: "100%",
                        position: "absolute",
                      }}
                    />
                  </>
                )}
              </div>
              <Formik
                initialValues={users}
                enableReinitialize
                validationSchema={object({
                  title: string()
                    .required("Please enter title")
                    .min(2, "title too short"),
                  year: string()
                    .required("Please enter year")
                    .min(2, "title too year"),
                  nation: string()
                    .required("Please enter nation")
                    .min(2, "nation too short"),
                  des: string()
                    .required("Please enter des")
                    .min(2, "des too short"),
                  clip: string()
                    .required("Please enter clip")
                    .min(2, "clip too short"),
                })}
                onSubmit={(values, formikHelpers) => {
                  onSubmit(values, formikHelpers);
                }}
              >
                {({ errors, isValid, touched, dirty }) => (
                  <Form>
                    <Field
                      name="title"
                      type="text"
                      as={TextField}
                      variant="outlined"
                      color="primary"
                      label="title"
                      fullWidth
                      error={Boolean(errors.title) && Boolean(touched.title)}
                      helperText={Boolean(touched.title) && errors.title}
                    />
                    <Field
                      name="year"
                      type="text"
                      as={TextField}
                      variant="outlined"
                      color="primary"
                      label="year"
                      fullWidth
                      error={Boolean(errors.year) && Boolean(touched.year)}
                      helperText={Boolean(touched.year) && errors.year}
                    />
                    <Field
                      name="nation"
                      type="text"
                      as={TextField}
                      variant="outlined"
                      color="primary"
                      label="nation"
                      fullWidth
                      error={Boolean(errors.nation) && Boolean(touched.nation)}
                      helperText={Boolean(touched.nation) && errors.nation}
                    />
                    <Field
                      name="des"
                      type="text"
                      as={TextField}
                      variant="outlined"
                      color="primary"
                      label="des"
                      fullWidth
                      error={Boolean(errors.des) && Boolean(touched.des)}
                      helperText={Boolean(touched.des) && errors.des}
                    />
                    <Field
                      name="clip"
                      type="text"
                      as={TextField}
                      variant="outlined"
                      color="primary"
                      label="URL-clip"
                      fullWidth
                      error={Boolean(errors.clip) && Boolean(touched.clip)}
                      helperText={Boolean(touched.clip) && errors.clip}
                    />
                    <div
                      style={{
                        display: "flex",
                        color: " #f44336",
                        marginBottom: "16px",
                      }}
                    >
                      {errors.checkbox && <span>{errors.checkbox}</span>}
                    </div>
                    {loading ? (
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled
                      >
                        Loading...
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={!isValid || !dirty}
                      >
                        Add Film
                      </Button>
                    )}
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddFilm;
