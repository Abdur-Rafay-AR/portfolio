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

### 3. Update script.js
Replace the following placeholders in `script.js`:
```javascript
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
```

```javascript
const response = await emailjs.send(
    'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
    'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
    templateParams
);
```

### 4. Update Email Address
Replace `'abdurrafay@example.com'` with your actual email address in two places:
- In the `templateParams` object
- In the `sendEmailFallback` function

### 5. EmailJS Template Variables
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
- EmailJS public key is safe to expose in client-side code
- Template ID and Service ID are also safe to expose
- Your email address will be visible in the source code

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
