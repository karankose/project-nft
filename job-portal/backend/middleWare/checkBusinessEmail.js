import validator from "validator";

const checkBusinessEmail = (req, res, next) => {
  const email = req.body.Email || req.body.email;

  // Check if email exists and is valid
  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Invalid email format.",
      data: null,
    });
  }

  // Extract domain from email
  const domain = email.split("@")[1].toLowerCase();

  // Free email domains list (aap apne hisaab se add ya kam kar sakte hain)
  const freeDomains = [
   "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "aol.com",
  "icloud.com",
  "protonmail.com",
  "yandex.com",
  "zoho.com",
  "mail.com",
  "gmx.com",
  "fastmail.com",
  "inbox.com",
  "live.com",
  "msn.com",
  "comcast.net",
  "me.com",
  "mac.com",
  "bellsouth.net",
  "cox.net",
  "verizon.net",
  "att.net",
  "rocketmail.com",
  "mail.ru",
  "laposte.net",
  "btinternet.com"

  ];

  // Check if domain is free email provider
  if (freeDomains.includes(domain)) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Please use a business email address (not Gmail, Yahoo, etc.)",
      data: null,
    });
  }

  // If all checks pass, proceed to next middleware or route handler
  next();
};

export default checkBusinessEmail;
