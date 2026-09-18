/**
 * Isolated test: verifies the mailer's error path — with fake SMTP credentials
 * the send must THROW a catchable error (which the API route converts into
 * emailStatus: "failed" without breaking the 201 response).
 */
process.env.SMTP_HOST = "127.0.0.1";
process.env.SMTP_PORT = "59999"; // nothing listening here → immediate ECONNREFUSED
process.env.SMTP_USER = "fake@gmail.com";
process.env.SMTP_PASS = "fakeapppassword1234";
process.env.CONTACT_EMAIL = "dest@example.com";

const { isMailConfigured, sendNotificationEmail } = await import(
  "../src/lib/mailer"
);

console.log("isMailConfigured():", isMailConfigured()); // expect true

try {
  await sendNotificationEmail({
    name: "Test",
    email: "client@example.com",
    projectType: "mvp",
    description: "desc",
    lang: "it",
  });
  console.log("UNEXPECTED: no error thrown");
} catch (err) {
  console.log("CAUGHT (expected) — error code:", (err as NodeJS.ErrnoException).code);
  console.log("=> API route would return 201 with emailStatus: 'failed'");
}
process.exit(0);
