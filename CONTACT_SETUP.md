# Contact Form Email Configuration

This portfolio includes a functional contact form that sends emails using EmailJS. Here's how to set it up:

## Setup Instructions

### 1. Create EmailJS Account
1. Go to [EmailJS](https://www.emailjs.com/)
2. Create a free account
3. Create a new email service (Gmail, Outlook, etc.)
4. Create an email template

### 2. Configure EmailJS
1. Get your Public Key from EmailJS dashboard
2. Get your Service ID
3. Get your Template ID
4. Update the JavaScript file with your credentials

### 3. Create Email Configuration File
1. Copy `email-config.template.js` to `email-config.js`
2. Update the values in `email-config.js` with your actual EmailJS credentials:
```javascript
const EMAIL_CONFIG = {
    publicKey: "YOUR_ACTUAL_PUBLIC_KEY",
    serviceId: "YOUR_ACTUAL_SERVICE_ID", 
    templateId: "YOUR_ACTUAL_TEMPLATE_ID",
    recipientEmail: "your-email@example.com"
};
```

**Important**: Never commit `email-config.js` to version control as it contains your API keys!

### 4. EmailJS Template Variables
Make sure your EmailJS template includes these variables:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{subject}}` - Message subject
- `{{message}}` - Message content
- `{{to_email}}` - Your email address

## Template Example
```
Subject: New Contact from {{from_name}} - {{subject}}

You have received a new message from your portfolio contact form:

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

## Features
- Real-time email sending
- Loading states and feedback
- Success/error notifications
- Form validation
- Fallback to mailto if EmailJS fails
- Responsive design

## Security Notes
- The `email-config.js` file is excluded from version control via `.gitignore`
- EmailJS public key is safe to expose in client-side code, but keeping it in a separate config file is a good practice
- Template ID and Service ID are also safe to expose
- Your email address will be visible in the source code
- Always use the template file (`email-config.template.js`) when sharing your project

## Testing
1. Fill out the contact form
2. Check for success/error notifications
3. Verify email is received in your inbox
4. Test fallback functionality if needed

## Customization
You can customize:
- Notification styles in `style.css`
- Email template in EmailJS dashboard
- Form fields in `index.html`
- Success/error messages in `script.js`
