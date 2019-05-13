const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const validateEmails = emails => {
  if (!emails) {
    return "Email is required";
  }
  const invalidEmails = emails
    .split(",")
    .map(email => email.trim())
    .filter(email => !regex.test(email));

  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`;
  }
  return;
};
export default validateEmails;
