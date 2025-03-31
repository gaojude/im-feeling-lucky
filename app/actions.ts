export async function subscribeToWaitlist(formData: FormData) {
  const email = formData.get("email");

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock validation and response
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return {
      success: false,
      message: "Please enter a valid email address"
    };
  }

  // Mock successful response
  return {
    success: true,
    message: "You've been added to the waitlist! We'll notify you when we launch."
  };
}
