exports.otpTemplate = (link) => 
  `<body>
  <div class="container" style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; line-height: 1.5; background-color: #f6f6f6; margin: 0; padding: 0;">
  <p style="color: #666666;">Dear User</p><br/>
  <p style="color: #666666;">We hope this email finds you well. It appears that you have recently requested to reset your password on Inkspire</p><br/>
  <p style="color: #666666;">To proceed with the password reset, please click on the link below:</p><br/>
  <p style="color: #666666;"><a href="${link}" style="color: #666666;">Password Reset</a></p><br/>
  <p style="color: #666666;">If the link does not work, you can copy and paste the following URL into your browser:</p><br/>
  <p style="color: #666666;"><a href="" style="color: #666666;">${link}</a></p><br/>
  <p style="color: #666666;">Please note that this link is valid for [specified time period, e.g., 1 hour]. After this time, you may need to request a new password reset link.</p><br/>
  <p style="color: #666666;">If you did not initiate this password reset request, please disregard this email for security reasons. Rest assured that your account remains safe and secure.</p><br/>
  <p style="color: #666666;">For any questions or concerns, don't hesitate to reach out to our support team at [support@inkspire.com]. We are here to help!</p><br/>
  <p style="color: #666666;">Thank you for being a valued member of the Inkspire community.</p><br/>
  <p style="color: #666666;">Best regards,</p><br/>
  <p style="color: #666666;">Inkspire Team</p>
</div>
</body>`;
