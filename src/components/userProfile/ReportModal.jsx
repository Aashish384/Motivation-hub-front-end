import { Modal, Button, Text, Textarea } from "@mantine/core";

const ReportModal = (props) => {
  return (
    <Modal
      radius={"xs"}
      centered
      title={<Text weight={600}>Report a user</Text>}
      opened={props.opened}
      onClose={() => props.setOpened(false)}
    >
      <Textarea
        my={10}
        placeholder="Enter your reason here"
        value={props.why}
        onChange={(e) => props.setWhy(e.target.value)}
        radius={"xs"}
      />
      <Button radius="xs" fullWidth mt={30} onClick={props.reportUserHandler}>
        Report
      </Button>
    </Modal>
  );
};

export default ReportModal;
