import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, TextInput, Flex, PasswordInput } from "@mantine/core";
import { useForm, joiResolver } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import Joi from "joi";
import { CiEdit } from "react-icons/ci";
import isEmpty from "../../utils/isEmpty";

import EditProfilePicture from "./EditProfilePicture";
import { editProfile, editMyProfileReset } from "../../features/profile/profileSlice";
import { errorNotification, successNotification } from "../../utils/showNotification";

const schema = Joi.object({
  photo: Joi.allow(null),
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
  }),
  username: Joi.string().required().messages({
    "string.empty": "Username is required",
  }),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      "string.empty": "Email is required",
      "string.email": "Email is invalid",
    }),
  likes: Joi.string().allow(""),
  dislikes: Joi.string().allow(""),
  hobbies: Joi.string().allow(""),
  problems: Joi.string().allow(""),
  password: Joi.string().allow(""),
  confirmPassword: Joi.string().allow(""),
});

const EditProfileModal = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isEditMyProfileError, isEditMyProfileSuccess, error, myProfile } = useSelector(
    (state) => state.profile
  );

  const form = useForm({
    validate: joiResolver(schema),
    initialValues: {
      photo: null,
      name: "",
      username: "",
      email: "",
      likes: "",
      dislikes: "",
      hobbies: "",
      problems: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Load initial form values
  useEffect(() => {
    if (!isEmpty(props.myProfile)) {
      form.setValues({
        ...form.values,
        name: props.myProfile.name,
        username: props.myProfile.username,
        email: props.myProfile.email,
        likes: props.myProfile.likes || "",
        dislikes: props.myProfile.dislikes || "",
        hobbies: props.myProfile.hobbies || "",
        problems: props.myProfile.problems || "",
      });
    }
  }, [props.myProfile]);

  // Handle error and success
  useEffect(() => {
    if (isEditMyProfileError) {
      if (typeof error === "string") {
        errorNotification({ title: "Profile error", message: error });
      } else if (typeof error === "object") {
        form.setErrors({
          username: error.username,
          email: error.email,
          password: error.password,
          likes: props.myProfile.likes || "",
          dislikes: props.myProfile.dislikes || "",
          hobbies: props.myProfile.hobbies || "",
          problems: props.myProfile.problems || "",
        });
      }
    }

    if (isEditMyProfileSuccess && !isEmpty(myProfile)) {
      successNotification({
        title: "Profile success",
        message: "Profile edited successfully",
      });
      props.setModalOpened(false);
      navigate("/my-profile", { replace: true });
    }
    return () => {
      dispatch(editMyProfileReset());
    };
  }, [dispatch, isEditMyProfileError, isEditMyProfileSuccess, error]);

  const onProfilePictureDrop = (photo) => {
    form.setFieldValue("photo", photo);
  };

  const onProfilePictureReject = (a) => {
    console.log("File rejected");
  };

  // When the edit profile form is submitted
  const formSubmitHandler = (event) => {
    event.preventDefault();
    const { hasErrors, errors } = form.validate();
    console.log(errors);
    console.log(form.values);
    if (!hasErrors) {
      let profileData = new FormData();
      Object.keys(form.values).forEach((value) => {
        if (value === "photo" && form.values.photo) {
          profileData.append("photo", form.values.photo[0]);
        } else {
          profileData.append([value], form.values[value]);
        }
      });
      dispatch(editProfile(profileData));
    }
  };

  return (
    <Modal
      centered
      title="Edit your profile"
      size="lg"
      opened={props.modalOpened}
      onClose={() => props.setModalOpened(false)}
    >
      <form onSubmit={formSubmitHandler}>
        <Flex direction="column">
          <EditProfilePicture
            profilePicture={form.values.photo}
            prevImageLink={props.myProfile.photo}
            onProfilePictureDrop={onProfilePictureDrop}
            onProfilePictureReject={onProfilePictureReject}
          />
          <TextInput
            label="Username"
            placeholder="Username"
            {...form.getInputProps("username")}
            mb={16}
          />
          <TextInput
            label="Fullname"
            placeholder="Your name"
            {...form.getInputProps("name")}
            mb={16}
          />
          <TextInput
            label="Email"
            placeholder="Your email"
            {...form.getInputProps("email")}
            mb={16}
          />
          <TextInput
            label="Likes"
            placeholder="Your Likes"
            {...form.getInputProps("likes")}
            mb={16}
          />
          <TextInput
            label="Dislikes"
            placeholder="Your dislikes"
            {...form.getInputProps("dislikes")}
            mb={16}
          />
          <TextInput
            label="Hobbies"
            placeholder="Your hobbies"
            {...form.getInputProps("hobbies")}
            mb={16}
          />
          <TextInput
            label="Problems"
            placeholder="Your problems"
            {...form.getInputProps("problems")}
            mb={16}
          />

          <PasswordInput
            label="New Password"
            placeholder="New password"
            {...form.getInputProps("password")}
            mb={16}
          />
          <PasswordInput
            label="Confirm new password"
            placeholder="New password"
            {...form.getInputProps("confirmPassword")}
            mb={16}
          />
          <Button radius="xs" type="submit" mt={30} fullWidth leftIcon={<CiEdit size={20} />}>
            Save
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default EditProfileModal;
