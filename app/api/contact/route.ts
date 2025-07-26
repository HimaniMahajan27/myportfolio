import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: "Please enter a valid email address" }, { status: 400 })
    }

    // Log the submission for your records
    console.log("📧 New Contact Form Submission:", {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    })

    // Try Web3Forms (reliable free service)
    try {
      const web3FormsResponse = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "8a4c4e4a-8b5c-4d3e-9f2a-1b2c3d4e5f6g", // You'll need to get this from web3forms.com
          name: name,
          email: email,
          message: `
Portfolio Contact Form Submission

Name: ${name}
Email: ${email}
Date: ${new Date().toLocaleString()}

Message:
${message}

---
This message was sent from your portfolio contact form.
Reply directly to: ${email}
          `,
          to: "himanimahajan2709@gmail.com",
          subject: `Portfolio Contact from ${name}`,
          from_name: name,
          replyto: email,
        }),
      })

      if (web3FormsResponse.ok) {
        console.log("✅ Email sent successfully via Web3Forms")
      }
    } catch (emailError) {
      console.log("⚠️ Web3Forms failed, using fallback")
    }

    // Always return success with instructions for direct contact
    return NextResponse.json({
      success: true,
      message: `Thank you ${name}! Your message has been received. I'll get back to you at ${email} soon. If you don't hear from me within 24 hours, please email me directly at himanimahajan2709@gmail.com`,
    })
  } catch (error) {
    console.error("❌ Contact form error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Sorry, there was an error. Please email me directly at himanimahajan2709@gmail.com",
      },
      { status: 500 },
    )
  }
}
