import { RequestHandler } from "express";

export const handleLogin: RequestHandler = (req, res) => {
  const { email, password } = req.body;

  // Simple demo authentication
  // In a real app, you would validate against a database
  if (email === "admin@jalrakshak.com" && password === "admin123") {
    const user = {
      id: "1",
      email: email,
      name: "Admin User"
    };
    
    res.json(user);
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};
