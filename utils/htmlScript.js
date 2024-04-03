export const LoginEmail = (name, email) => {
  return `
    <div >
        <p>Welcome back, ${name} (${email}). You have successfully logged in.</p>
    </div>
    `;
};

export const RegisterEmail = (name, email) => {
  return `
    <div>
        <p>Welcome to our platform, ${name} (${email}).</p>
        <p>You've successfully registered on our platform.</p>
    </div>
    `;
};

export const ResetToken = (name, email, token) => {
  return `
    <div>
        <p>Hello ${name} (${email}),</p>
        <p>You have requested a password reset. Please click the link below to reset your password.</p>
        <a href="${process.env.FRONTEND_URL}/reset-password/${token}">Reset Password</a>
    </div>
    `;
};
