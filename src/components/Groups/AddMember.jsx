import { Modal, TextInput, Flex, Button } from "@mantine/core";
import { useForm, joiResolver } from "@mantine/form";
import Joi from "joi";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { addGroupMember, addGroupMemberReset } from "../../features/group/groupSlice";

const schema = Joi.object({
  email: Joi.string().required().messages({
    "string.empty": "Email is required",
  }),
});

const AddMember = (props) => {
  const dispatch = useDispatch();

  const { addGroupMemberLoading } = useSelector((state) => state.group);

  const form = useForm({
    validate: joiResolver(schema),
    initialValues: {
      email: "",
    },
  });

  useEffect(() => {
    return () => {
      dispatch(addGroupMemberReset());
    };
  }, []);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const { hasErrors, errors } = form.validate();
    if (!hasErrors) {
      dispatch(addGroupMember({ email: form.values.email, groupId: props.groupId }));
    }
  };

  return (
    <Modal
      radius="xs"
      centered
      title="Add group member"
      size="xs"
      opened={props.opened}
      onClose={() => props.setOpened(false)}
    >
      <form onSubmit={formSubmitHandler}>
        <Flex direction="column">
          <TextInput
            placeholder="Email"
            label="Email of the member"
            {...form.getInputProps("email")}
          />
          <Button radius="xs" mt={20} type="submit" loading={addGroupMemberLoading}>
            Add
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default AddMember;
