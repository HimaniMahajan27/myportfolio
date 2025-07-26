import emailjs from "@emailjs/browser"

// EmailJS configuration
const EMAILJS_SERVICE_ID = "service_portfolio"
const EMAILJS_TEMPLATE_ID = "template_contact"
const EMAILJS_PUBLIC_KEY = "a6bf8c8e-7529-464c-ae53-991a9300dd3e"

export interface EmailData {
  from_name: string
  from_email: string
  message: string
  to_email: string
}

export const sendEmail = async (data: EmailData): Promise<{ success: boolean; message: string }> => {
  try {
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        from_name: data.from_name,
        from_email: data.from_email,
        message: data.message,
        to_email: "himanimahajan2709@gmail.com",
        reply_to: data.from_email,
      },
      EMAILJS_PUBLIC_KEY,
    )

    if (result.status === 200) {
      return { success: true, message: "Message sent successfully!" }
    } else {
      return { success: false, message: "Failed to send message. Please try again." }
    }
  } catch (error) {
    console.error("EmailJS Error:", error)
    return { success: false, message: "Failed to send message. Please try again." }
  }
}
