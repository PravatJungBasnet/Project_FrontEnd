import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function useLogout() {
  const router = useRouter()

  const onSubmit = async () => {
    const token = localStorage.getItem("access_token")

    if (!token) {
      toast.success("Logout successful")
      router.push("/login")
      return
    }

    const userChoice = window.confirm("Are you sure you want to Logout?")

    if (userChoice) {
      try {
        // Attempt the API request once
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
      } catch (error) {
        // Silently catch any error, do not show error message
        console.error("Logout error:", error)
      } finally {
        // Always remove the token and show success message
        localStorage.removeItem("access_token")
        toast.success("Logout successful")
        router.push("/login")
      }
    }
  }

  return { onSubmit }
}

