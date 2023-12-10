import { create } from "zustand";

const apiEnv = import.meta.env.VITE_BACKEND_API;

export const userStore = create((set) => ({

  username: "",
  setUsername: (username) => set({ username }),

  email: "",
  setEmail: (email) => set({ email }),

  password: "",
  setPassword: (password) => set({ password }),

  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),

  isLoggedIn: false, // Added to track if the user is logged in
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),


  // FUNCTION TO REGISTER USERS
  handleSignup: async (username, email, password) => {
    
    if (!username || !password || !email) {
      alert("Please enter username, email and password")
      return
    }

    try {
      // console.log(JSON.stringify({email: email, userName: username, password: password}))
      const response = await fetch(`${apiEnv}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, userName: username, password: password })
      })

      const data = await response.json()
      if (data.success) {
        set({ username })

        // Redirect or update UI
        alert("Signup successful!")
        console.log("Signing up with:", username)
      } else {
        // Display error message from server
        alert(data.response || "Signup failed")
      }
    } catch (error) {
      console.error("Signup error:", error)
      alert("An error occurred during signup")
    }
  },


  // LOGIN
  handleLogin: async (username, password) => {
    if (!username || !password) {
      alert("Please enter both username and password")
      return
    }

    try {
      const response = await fetch(`${apiEnv}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName: username, password: password }),
      })

      const data = await response.json()
      if (data.success) {
        // Update the state with username and accessToken
        set({
          username,
          accessToken: data.response.accessToken,
          isLoggedIn: true,
        }); 

        // Redirect or update UI
        localStorage.setItem("accessToken", data.response.accessToken)
        alert("Login successful!")
        console.log("Logging in with:", username, password)
      } else {
        // Display error message from server
        alert(data.response || "Login failed")
      }
    } catch (error) {
      console.error("Login error:", error)
      alert("An error occurred during login")
    }
  },
  handleLogout: () => {
    // Clear user information and changes isLoggedIn to false
    set({ username: "", accessToken: null, isLoggedIn: false })
    localStorage.removeItem("accessToken")
  },
}));