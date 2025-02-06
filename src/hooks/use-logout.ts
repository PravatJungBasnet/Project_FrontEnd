/*import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { deleteCookie } from "@/lib/auth"

export default function useLogout() {
  const router = useRouter()

  const onSubmit = async () => {
    const token = localStorage.getItem("access_token")

    if (!token) {
      toast.success("Logout successful")
      router.push("/login")
      return;
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
        await deleteCookie("access_token")
        localStorage.removeItem("access_token")
        toast.success("Logout successful")
        router.push("/login")
      }
    }
  }
  return { onSubmit };
  
}
  */
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function useLogout() {
  const router = useRouter();

  const onSubmit = async () => {
    const token = localStorage.getItem("access_token");

    // If token doesn't exist, handle it without confirmation
    if (!token) {
      toast.success("Logout successful");
      router.push("/login");
      return;
    }

    const userChoice = window.confirm("Are you sure you want to Logout?");
    if (userChoice) {
      try {
        // Attempt the API request
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Logout error:", error);
      } finally {
        // Always remove token and redirect
        localStorage.removeItem("access_token");
        toast.success("Logout successful");
        router.push("/login");
      }
    }
  };

  return { onSubmit }; // Ensure returning onSubmit
}


