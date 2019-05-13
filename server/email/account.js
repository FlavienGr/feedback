const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const content = (body, id) => {
  return `
  <html>
  <body>
  <h3>I'd like your input</h3>
  <p>${body}</p>
    <div>
    <a href="${process.env.REDIRECT_DOMAIN}/api/survey/${id}/yes">Yes</a>
    </div>
    <div>
    <a href="${process.env.REDIRECT_DOMAIN}/api/survey/${id}/no">No</a>
    </div>
  </body>
  </html>
  `;
};

const sendSurveyEmail = ({ title, body, subject, recipients, id }) => {
  const emails = recipients.map(item => item.email);

  const msg = {
    to: emails,
    from: "zencles75@gmail.com",
    subject: `${subject}`,
    text: `${title}`,
    html: content(body, id)
  };
  sgMail.sendMultiple(msg);
};

module.exports = sendSurveyEmail;
