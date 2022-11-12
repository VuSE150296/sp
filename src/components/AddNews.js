import React, { useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { storeImageToFireBase } from "../utils/storeImageToFirebase.";
import axios from "axios";
import { object, string } from "yup";

function AddNews({ idPlayer, setIdPlayer }) {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [imgFront, setImgFront] = useState(null);
  console.log(idPlayer);
  useEffect(
    () => {
      const uploadImage = async () => {
        setIsLoading(true);
        if (!selectedFile) {
          setIsLoading(false);
          return;
        }
        const { isSuccess, imgUrl, message } = await storeImageToFireBase(
          selectedFile
        );
        if (isSuccess) {
          setImgFront(imgUrl);
          setIsLoading(false);
          return imgUrl;
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
      fetch(`https://636f06a5f2ed5cb047d39abd.mockapi.io/news/${idPlayer}`, {
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
        url: `https://636f06a5f2ed5cb047d39abd.mockapi.io/news/${idPlayer}`,
        data: imgFront !== null ? { ...values, img: imgFront } : { ...values },
      })
        .then((res) => {
          console.log(res);
          setImgFront(null);
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
        url: "https://636f06a5f2ed5cb047d39abd.mockapi.io/news",
        data: { ...values, img: imgFront },
      })
        .then((res) => {
          console.log(res);
          setImgFront(null);
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
          img: APIData.img,
          title: APIData.title,
          description: APIData.description,
          content: APIData.content,
          views: APIData.views,
          status: APIData.status,
          attractive: APIData.attractive,
        }
      : {
          img: "",
          title: "",
          description: "",
          content: "",
          views: 1,
          status: "false",
          attractive: "false",
        };

  return (
    <div
      style={{ textAlign: "center", display: "flex", justifyContent: "center" }}
    >
      <div className="containerDetail" style={{ width: "60%" }}>
        <div className="white_box_5">
          <div className="profile_info">
            <div className="Container_info">
              <h2>Add News</h2>
              {imgFront !== null ? (
                <img
                  className="profile_card"
                  src={imgFront}
                  alt=""
                  style={{ width: "500px" }}
                />
              ) : (
                APIData !== null && (
                  <img
                    className="profile_card"
                    src={APIData.img}
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
                      accept="img/*"
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
                  description: string()
                    .required("Please enter description")
                    .min(2, "description too short"),
                  content: string()
                    .required("Please enter content")
                    .min(2, "content too short"),
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
                      name="content"
                      type="text"
                      as={TextField}
                      variant="outlined"
                      color="primary"
                      label="content"
                      fullWidth
                      error={
                        Boolean(errors.content) && Boolean(touched.content)
                      }
                      helperText={Boolean(touched.content) && errors.content}
                    />
                    <Field
                      name="description"
                      type="textarea"
                      as={TextField}
                      variant="outlined"
                      color="primary"
                      label="description"
                      fullWidth
                      error={
                        Boolean(errors.description) &&
                        Boolean(touched.description)
                      }
                      helperText={
                        Boolean(touched.description) && errors.description
                      }
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

export default AddNews;
