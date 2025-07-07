// EmailJS Configuration Template
// Copy this file to 'email-config.js' and update with your actual EmailJS credentials
const EMAIL_CONFIG = {
    publicKey: "YOUR_EMAILJS_PUBLIC_KEY", // Replace with your EmailJS public key
    serviceId: "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
    templateId: "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
    recipientEmail: "YOUR_EMAIL@example.com" // Replace with your email address
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EMAIL_CONFIG;
}
