import { useState, useEffect, MouseEvent } from 'react';

import Form from '../../ui/form-elements/Form';
import FormRow from '../../ui/form-elements/FormRow';
import Input from '../../ui/form-elements/Input';
import FileInput from '../../ui/form-elements/FileInput';
import Button from '../../ui/form-elements/Button';
import { useUser } from '../../hooks/auth-hook';
import { useUpdateUser } from '../../hooks/user-hook';

const UserUpdateForm = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState<any>(null);
  const { user } = useUser();
  const { isUpdating, updateUser } = useUpdateUser();

  useEffect(() => {
    if (user) {
      setName(user.data.name);
      setImage(user.data.image);
    }
  }, []);

  if (!user || user.status === 'fail') return;

  const handleSubmit = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: FormData = new FormData();

    formData.append('name', name);
    formData.append('image', image);

    if (!name) return;
    updateUser(formData, {
      onSuccess: () => {
        setImage(null);
      },
    });
  };

  const handleCancel = () => {
    setName(user.data.name);
    setImage(null);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={user.data.email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0])}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
        <>
          <Button type="reset" variation="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button disabled={isUpdating}>Update account</Button>
        </>
      </FormRow>
    </Form>
  );
};

export default UserUpdateForm;
