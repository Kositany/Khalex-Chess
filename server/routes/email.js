import express from 'express'
import nodemailer from 'nodemailer'
import { validateEmail, validateContact } from '../middleware/validation.js'
import { logger } from '../utils/logger.js'

const router = express.Router()

// Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'khaltonyx@gmail.com',
      pass: process.env.EMAIL_PASS // App-specific password
    }
  })
}

// Newsletter subscription endpoint
router.post('/newsletter', validateEmail, async (req, res) => {
  try {
    const { email } = req.body
    
    const transporter = createTransporter()
    
    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER || 'khaltonyx@gmail.com',
      to: 'khaltonyx@gmail.com',
      subject: 'New Newsletter Subscription - Khalex Chess',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FFD700; text-align: center;">New Newsletter Subscription</h2>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px;">
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Source:</strong> Khalex Chess Website</p>
          </div>
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 12px; text-align: center;">
            This email was generated from the Khalex Chess website newsletter subscription form.
          </p>
        </div>
      `
    }
    
    // Welcome email to subscriber
    const welcomeMailOptions = {
      from: process.env.EMAIL_USER || 'khaltonyx@gmail.com',
      to: email,
      subject: 'Welcome to Khalex Chess Newsletter!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #000000 0%, #FFD700 100%); padding: 40px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">Welcome to Khalex Chess!</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 18px;">Unleash Young Minds' Potential Through Chess</p>
          </div>
          <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #eee;">
            <h2 style="color: #000;">Thank you for subscribing!</h2>
            <p>We're excited to have you join our chess community. You'll receive updates about:</p>
            <ul style="color: #333; line-height: 1.6;">
              <li>Upcoming tournaments and events</li>
              <li>Holiday chess camps</li>
              <li>New training programs</li>
              <li>Chess tips and strategies</li>
              <li>Special offers on chess equipment</li>
            </ul>
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://khalexchess.com" style="background: #FFD700; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Visit Our Website</a>
            </div>
            <p style="color: #666;">Follow us on social media:</p>
            <p>Instagram: <a href="https://instagram.com/khalex._.chess" style="color: #FFD700;">@khalex._.chess</a></p>
          </div>
          <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
            <p>© 2025 Khalex Chess - All Rights Reserved</p>
            <p>Unleashing Young Minds' Potential Through Chess</p>
          </div>
        </div>
      `
    }
    
    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(welcomeMailOptions)
    ])
    
    logger.info(`Newsletter subscription: ${email}`)
    
    res.status(200).json({
      success: true,
      message: 'Successfully subscribed to newsletter!'
    })
    
  } catch (error) {
    logger.error('Newsletter subscription error:', error.message)
    res.status(500).json({
      success: false,
      message: 'Failed to subscribe to newsletter. Please try again.'
    })
  }
})

// Contact form submission endpoint
router.post('/contact', validateContact, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body
    
    const transporter = createTransporter()
    
    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER || 'khaltonyx@gmail.com',
      to: 'khaltonyx@gmail.com',
      subject: 'New Contact Form Submission - Khalex Chess',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FFD700; text-align: center;">New Contact Form Submission</h2>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            <div style="margin-top: 20px;">
              <strong>Message:</strong>
              <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px; border-left: 4px solid #FFD700;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 12px; text-align: center;">
            This email was generated from the Khalex Chess website contact form.
          </p>
        </div>
      `
    }
    
    // Auto-reply to customer
    const autoReplyOptions = {
      from: process.env.EMAIL_USER || 'khaltonyx@gmail.com',
      to: email,
      subject: 'Thank you for contacting Khalex Chess',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #000000 0%, #FFD700 100%); padding: 40px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">Thank You, ${name}!</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 18px;">We've received your message</p>
          </div>
          <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #eee;">
            <p>Dear ${name},</p>
            <p>Thank you for contacting Khalex Chess. We have received your message and will get back to you within 24 hours.</p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 4px; margin: 20px 0;">
              <strong>Your message:</strong><br>
              <em>"${message}"</em>
            </div>
            <p>In the meantime, feel free to explore our website to learn more about our chess training programs and services.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://khalexchess.com" style="background: #FFD700; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Visit Our Website</a>
            </div>
            <p>Best regards,<br><strong>The Khalex Chess Team</strong></p>
          </div>
          <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
            <p>© 2025 Khalex Chess - All Rights Reserved</p>
            <p>Unleashing Young Minds' Potential Through Chess</p>
          </div>
        </div>
      `
    }
    
    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(autoReplyOptions)
    ])
    
    logger.info(`Contact form submission: ${name} <${email}>`)
    
    res.status(200).json({
      success: true,
      message: 'Message sent successfully! We\'ll get back to you soon.'
    })
    
  } catch (error) {
    logger.error('Contact form error:', error.message)
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again.'
    })
  }
})

export default router