const mailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/../.env` });

const sendMail = async (emails, notification) => {
	try {
		// For GMail
		const smtpTransport = nodemailer.createTransport({
			host: "smtp.gmail.com",
			secureConnection: false,
			port: 587,
			auth: {
				user: process.env.MAIL_ID, // your actual email
				pass: process.env.MAIL_PASS, // your actual password
			},
		});
		for (email in emails) {
			const mailOptions = {
				from: process.env.MAIL_ID,
				to: email,
				//   bcc : "<BCC RECIEVER ID>", // bcc is optional.
				subject: "REBALANCED PORTFOLIOS",
				text: notification.message,
				//   html: "<HTML>"
			};

			await smtpTransport.sendMail(mailOptions);
		}

		return {
			success: true,
			message: "Mail sent successfully",
		};
	} catch (err) {
		console.log(err);
		return {
			success: false,
			error: err,
		};
	}
};

module.exports = {
	sendMail,
};
