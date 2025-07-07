// EmailJS Configuration using environment variables
// This approach is more secure as it doesn't store credentials in JS files
const EMAIL_CONFIG = {
    publicKey: process.env.EMAILJS_PUBLIC_KEY || "YOUR_EMAILJS_PUBLIC_KEY",
    serviceId: process.env.EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID", 
    templateId: process.env.EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
    recipientEmail: process.env.RECIPIENT_EMAIL || "your-email@example.com"
};

// For client-side usage, you might need to use a build tool like Vite or Webpack
// that can inject environment variables at build time

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EMAIL_CONFIG;
}
