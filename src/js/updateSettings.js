import { showAlert } from './alerts.js';

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://127.0.0.1:4000/api/v1/users/updateMyPassword'
        : 'http://127.0.0.1:4000/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} successfully updated!`);
    }
  } catch (error) {
    showAlert('error', err.response.data.message);
  }
};
