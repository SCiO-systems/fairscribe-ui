/* eslint-disable import/prefer-default-export */
export const handleError = (e) => {
  const statusCode = e?.response?.status;

  if (statusCode === 422) {
    return e.response.data.errors[Object.keys(e.response.data.errors)[0]][0];
  }

  return e?.response?.data?.error || 'Something went wrong!';
};
