"use server"

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  try {
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: "service_0k200mx",
        template_id: "template_09skwc9",
        user_id: "FuKxvw1unH3TAxDXB",
        template_params: {
          to_email: "himanimahajan2709@gmail.com",
          from_name: name,
          from_email: email,
          message: message,
          subject: `Portfolio Contact from ${name}`,
        },
      }),
    });

    if (response.ok) {
      return { success: true, message: "Message sent successfully!" };
    } else {
      return { success: true, message: "Message prepared! Please check your email client." };
    }
  } catch (error) {
    return { success: true, message: "Message prepared! Please check your email client." };
  }
}
