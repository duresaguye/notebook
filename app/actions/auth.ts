"use server"

import { z } from "zod"

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  acceptTerms: z.literal(true),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  rememberMe: z.boolean().optional(),
})

export async function signup(formData: FormData) {
  // Parse and validate form data
  const validatedFields = signupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    acceptTerms: formData.get("acceptTerms") === "on",
  })

  if (!validatedFields.success) {
    return { error: "Invalid form data" }
  }

  const { name, email, password } = validatedFields.data

  try {
    // Here you would typically:
    // 1. Check if user already exists
    // 2. Hash the password
    // 3. Create the user in your database
    // 4. Create a session or JWT

    // For demo purposes, we're just logging the data
    console.log("Creating user:", { name, email })

    // Simulate a delay for the API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return { success: true }
  } catch (error) {
    console.error("Error creating user:", error)
    return { error: "Failed to create user" }
  }
}

export async function login(formData: FormData) {
  // Parse and validate form data
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    rememberMe: formData.get("rememberMe") === "on",
  })

  if (!validatedFields.success) {
    return { error: "Invalid form data" }
  }

  const { email, password, rememberMe } = validatedFields.data

  try {
    // Here you would typically:
    // 1. Verify the user's credentials
    // 2. Create a session or JWT

    // For demo purposes, we're just logging the data
    console.log("Logging in user:", { email, rememberMe })

    // Simulate a delay for the API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return { success: true }
  } catch (error) {
    console.error("Error logging in:", error)
    return { error: "Invalid credentials" }
  }
}

