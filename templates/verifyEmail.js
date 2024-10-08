exports.emailVerificationTemplate = (link) =>
  `<body style="font-family: Arial, sans-serif; line-height: 1.5; background-color: #f6f6f6; margin: 0; padding: 0;">
  <div class="container" style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <p style="color: #666666;">Dear User</p><br/>
    <p style="color: #666666;">Thank you for registering on Inkspire, the social publishing platform that empowers writers to share their stories with crypto rewards. We are excited to have you on board!</p><br/>
    <p style="color: #666666;">To complete your registration and gain full access to Inkspire's features, we kindly ask you to verify your email address by clicking on the link below:</p><br/>
    <p style="color: #666666;"><a href="${link}" style="color: #666666;">Verification Link</a></p><br/>
    <p style="color: #666666;">If the link does not work, you can copy and paste the following URL into your browser:</p><br/>
    <p style="color: #666666;"><a href="" style="color: #666666;">${link}</a></p><br/>
    <p style="color: #666666;">Please note that this link is valid for [specified time period, e.g., 1 hour]. After this time, you may need to request a new password reset link.</p><br/>
    <p style="color: #666666;">Your privacy and security are essential to us, and email verification is one of the measures we take to ensure the safety of our community.</p><br/>
    <p style="color: #666666;">If you did not create an account on Inkspire, please ignore this email.</p><br/>
    <p style="color: #666666;">If you have any questions or need assistance, feel free to reach out to our support team at [support@inkspire.com].</p><br/>
    <p style="color: #666666;">We look forward to having you as an active member of our writing community!</p><br/>
    <p style="color: #666666;">Happy writing!</p><br/>
    <p style="color: #666666;">Best regards,</p><br/>
    <p style="color: #666666;">Inkspire Team</p>
  </div>
</body>`;
