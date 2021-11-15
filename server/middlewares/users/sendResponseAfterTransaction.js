import dotenv from 'dotenv';
import { generateProuveTransactionContent } from '../../helpers/mailMessageContent.js';
import { successMessages, errorMessages } from '../../helpers/messages.helper.js';
import { successCodes, failureCodes } from '../../helpers/statusCodes.helper.js';
// import { generateApproveEmailContent } from '../../helpers/mail/mailerMessageContent.helper';
// import sendEmail from '../../helpers/mailer.helper';

dotenv.config();

const { ok } = successCodes;
const { internalServerError } = failureCodes;
const { approveEmailAddressToAdmin } =successMessages;
const { userFailedToUpdate} = errorMessages;
const {
  SUPERADMIN_EMAIL, SUPERADMIN_FNAME, SUPERADMIN_LNAME, FRONTEND_APP_URL,
} = process.env;

const respondAfterVerifyingEmail = async (req, res) => {
  const { statusCode } = res;
  if (statusCode === ok) {
    const {datastatus} = req.body.datastatus
    const {
        approveTransactionEmailContentHTML,
        approveTransactionEmailContentPlainText,
    } = generateProuveTransactionContent(
      { id }, { firstName: SUPERADMIN_FNAME, lastName: SUPERADMIN_LNAME }, FRONTEND_APP_URL,
    );
    await sendEmail(
      {
        mailSentTo: SUPERADMIN_EMAIL,
        mailSubject: 'Valider la nouvelle transaction Ms Pay',
        contentHTML: approveTransactionEmailContentHTML,
        contentText: approveTransactionEmailContentPlainText,
      },
    );
    sendSuccessResponse(res, ok, approveEmailAddressToAdmin, null, null);
  } else if (statusCode === internalServerError) {
    sendErrorResponse(res, internalServerError, userFailedToUpdate);
  }
};

export default respondAfterVerifyingEmail;