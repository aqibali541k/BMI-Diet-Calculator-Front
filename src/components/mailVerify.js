const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const checkMail = (email) => {
  if (!emailRegex.test(email)) {
    console.log(false);
    return false;
  }
  return true;
};
