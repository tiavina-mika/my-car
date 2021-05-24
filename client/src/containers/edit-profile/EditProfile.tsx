import { Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { editProfile } from '../../actions/auth';
import CustomCard from '../../components/CustomCard';
import { getCurrentUser } from '../../reducers/app';
import { EditProfileFormValues } from '../../types/auth';
import ProfileForm from './ProfileForm';

const EditProfile = () => {
  const currentUser = useSelector(getCurrentUser);

  const dispatch = useDispatch();

  const _editProfile = (values: EditProfileFormValues) => {
    dispatch(editProfile(values));
  }

  return (
    <Box display="flex" justifyContent="center">
      <CustomCard
        content={<ProfileForm user={currentUser} onSave={_editProfile} />}
      />
    </Box>
  );
}

export default EditProfile;