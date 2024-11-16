"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpSignature = void 0;
const emailSignature = (item) => {
    return `
      <div style="font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #374151; max-width: 500px;">
        <div style="margin-bottom: 5vh;">
          ${item?.message || ""}
        </div>
        <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
          ${item?.name && item?.contact && item?.email
        ? `
            <tr>
              <td style="padding-bottom: 20px;">
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="vertical-align: top;">
                      <h2 style="margin: 0 0 5px 0; font-size: 18px; font-weight: 600; color: #111827;">${item.name}</h2>
                      <p style="margin: 0 0 5px 0; font-size: 14px;">
                        <a href="tel:${item.contact}" style="color: #6366f1; text-decoration: none;">${item.contact}</a>
                      </p>
                      <p style="margin: 0 0 5px 0; font-size: 14px;">
                        <a href="mailto:${item.email}" style="color: #6366f1; text-decoration: none;">${item.email}</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          `
        : ""}
          <tr>
            <td style="padding-top: 20px; border-top: 2px solid #6366f1;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="vertical-align: top; padding-right: 20px; width: 100px;">
                    <img src="https://i.imgur.com/7fQQVsA.png" alt="Company Logo" style="width: 100px; height: auto;">
                  </td>
                  <td style="vertical-align: top;">
                    <p style="margin: 0 0 5px 0; font-size: 14px;">
                      <a href="https://www.cosarthi.com" style="color: #6366f1; text-decoration: none;">www.cosarthi.com</a>
                    </p>
                    <p style="margin: 0 0 10px 0; font-size: 12px; color: #6b7280;">123 Business Street, Suite 100, City, State 12345</p>
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding-right: 10px;">
                          <a href="https://www.linkedin.com/company/yourcompany" style="text-decoration: none;">
                            <img src="https://i.imgur.com/4GLcS2K.png" alt="LinkedIn" style="width: 20px; height: 20px;">
                          </a>
                        </td>
                        <td style="padding-right: 10px;">
                          <a href="https://twitter.com/yourcompany" style="text-decoration: none;">
                            <img src="https://i.imgur.com/VQXQ4Vy.png" alt="Twitter" style="width: 20px; height: 20px;">
                          </a>
                        </td>
                        <td>
                          <a href="https://www.facebook.com/yourcompany" style="text-decoration: none;">
                            <img src="https://i.imgur.com/jVLFYSI.png" alt="Facebook" style="width: 20px; height: 20px;">
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding-top: 10px;">
              <p style="margin: 0; font-size: 11px; color: #9ca3af; font-style: italic;">This email and any files transmitted with it are confidential and intended solely for the use of the individual or entity to whom they are addressed.</p>
            </td>
          </tr>
        </table>
      </div>
    `;
};
const otpSignature = (item) => {
    return `<div style="margin: 10px; padding: 0; font-family: Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); text-align: center;">
        <h2>Your one-time password (OTP) is:</h2>
        <p style="font-size: 24px; font-weight: bold; margin: 20px 0; color: #2E7D32;">${item.message}</p>
        <p>Please use this OTP to complete your transaction. The OTP is valid for 10 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
         <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
          <tr>
            <td style="padding-top: 20px; border-top: 2px solid #6366f1;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="vertical-align: top; padding-right: 20px; width: 100px;">
                    <img src="https://i.imgur.com/7fQQVsA.png" alt="Company Logo" style="width: 100px; height: auto;">
                  </td>
                  <td style="vertical-align: top;">
                    <p style="margin: 0 0 5px 0; font-size: 14px;">
                      <a href="https://www.cosarthi.com" style="color: #6366f1; text-decoration: none;">www.cosarthi.com</a>
                    </p>
                    <p style="margin: 0 0 10px 0; font-size: 12px; color: #6b7280;">123 Business Street, Suite 100, City, State 12345</p>
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding-right: 10px;">
                          <a href="https://www.linkedin.com/company/yourcompany" style="text-decoration: none;">
                            <img src="https://i.imgur.com/4GLcS2K.png" alt="LinkedIn" style="width: 20px; height: 20px;">
                          </a>
                        </td>
                        <td style="padding-right: 10px;">
                          <a href="https://twitter.com/yourcompany" style="text-decoration: none;">
                            <img src="https://i.imgur.com/VQXQ4Vy.png" alt="Twitter" style="width: 20px; height: 20px;">
                          </a>
                        </td>
                        <td>
                          <a href="https://www.facebook.com/yourcompany" style="text-decoration: none;">
                            <img src="https://i.imgur.com/jVLFYSI.png" alt="Facebook" style="width: 20px; height: 20px;">
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding-top: 10px;">
              <p style="margin: 0; font-size: 11px; color: #9ca3af; font-style: italic;">This email and any files transmitted with it are confidential and intended solely for the use of the individual or entity to whom they are addressed.</p>
            </td>
          </tr>
        </table>

        <div style="font-size: 12px; color: #777777; margin-top: 30px;">
            <p>This is an automated message. Please do not reply to this email.</p>
        </div>
    </div>
</div>`;
};
exports.otpSignature = otpSignature;
exports.default = emailSignature;
//# sourceMappingURL=Signature.js.map