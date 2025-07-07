// EmailJS Configuration
// Update these values with your EmailJS credentials
const EMAIL_CONFIG = {
    publicKey: "9B72VSJFWvC7cLPzl", // Replace with your EmailJS public key
    serviceId: "service_r2hapti", // Replace with your EmailJS service ID
    templateId: "template_wlb6ia9", // Replace with your EmailJS template ID
    recipientEmail: "abdurrafay432007@gmail.com" // Replace with your email address
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EMAIL_CONFIG;
}
