import { Button, Group } from "@mantine/core";
import { useModals } from "@mantine/modals";
import { useNotifications } from "@mantine/notifications";
import { IoCheckmark, IoClose } from 'react-icons/io5';
import { useState } from "react";

interface AddNewNavProps {
  
}

const AddNewNav = ({}: AddNewNavProps) => {
  const modals = useModals();
  const notifications = useNotifications();
  const [submitState, setSubmitState] = useState({
    buttonDisabled: false,
    buttonText: ""
  })
  const openAddNewModal = () => {
  }


  const showNotifications = () => {
    const id = notifications.showNotification({
      id: 'hello-there',
      onClose: () => console.log('unmounted'),
      onOpen: () => console.log('mounted'),
      title: "Saving Data",
      message: "Please wait for the document to be saved",
      // color: "pink",
      // icon:
      className: "my-notification-class",
      style: { backgroundColor: 'red' },
      loading: true,
      autoClose: false,
      disallowClose: true,
    })
    setSubmitState(prev => (
      {
        ...prev,
        buttonDisabled: true,
        buttonText: "Saving document..."
      }
    ));

    // Saved data is succesful
    setTimeout(() => {
      notifications.updateNotification(id, {
        id,
        color: 'teal',
        title: 'Saved!',
        message: `Document succesfully saved www.google.com`,
        icon: <IoCheckmark size={20} />,
        autoClose: 3000,
      })
      setSubmitState(prev => (
        {
          ...prev,
          buttonDisabled: false,
          buttonText: "Open confirm modal"
        }
      ))
    }, 3000);
  }



  return (
    <Group grow>
      <Button onClick={() => console.log("Hello world!")}>
        Add new
      </Button>
    </Group>
  );
}

export default AddNewNav