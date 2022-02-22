import { Button, Group, Modal, Space, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { useInputState } from "@mantine/hooks";
import { useUser } from "reactfire";
import { db } from 'lib/firebase/init'
import { addDoc, arrayUnion, collection, doc, FieldValue, updateDoc } from "firebase/firestore";

interface AddNewNavProps {
  
}

const NavAddNewButton = ({}: AddNewNavProps) => {
  const [submitState, setSubmitState] = useState({
    saving: false,
    buttonText: "Submit"
  })

  const [opened, setOpened] = useState(false);
  const [newCategory, setNewCategory] = useInputState('');
  const user = useUser();
  
  const submitHandler = async () => {
    try {
      // Setup submission
      setSubmitState(prev => ({
        ...prev,
        saving: true,
        buttonText: "Saving Document..."
      }));
  
      const userId = user.data?.uid;
      console.log(user);
      console.log(userId);
      if (!userId) throw new Error("No UserId found");

      // Save category
      const categoryPayload = {
        name: newCategory,
        notes: []
      }

      // Save category id in user profile
      const categorySaveRes = await addDoc(collection(db, "categories"), categoryPayload);

      const userRef = doc(db, "users", userId);
      const updateUserRes = await updateDoc(userRef, {
        categories: arrayUnion(
          {
            name: newCategory,
            id: categorySaveRes.id,
          }
        )
      });

    } catch (error) {
      console.log(error);
    } finally {
      // Cleanup Submission
      setNewCategory("");
      setSubmitState(prev => ({
        ...prev,
        saving: false,
        buttonText: "Submit"
      }))
      setOpened(false);
    }
  }

  return (
    <>
      <Modal
        title="What is your new Category name?"
        size="md"
        opened={opened}
        hideCloseButton={submitState.saving}
        onClose={() => setOpened(false)}
      >
        <TextInput
          value={newCategory}
          onChange={setNewCategory}
        />
        <Space h="md" />
        <Button 
          onClick={() => submitHandler()}
          disabled={submitState.saving}
          fullWidth
        >
          {submitState.buttonText}
        </Button>
      </Modal>
      <Group grow>
        <Button onClick={() => setOpened(true)}>
          Add New Category
        </Button>
      </Group>
    </>
  );
}

export default NavAddNewButton