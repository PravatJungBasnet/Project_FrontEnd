import { useState, type ChangeEvent, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const [formData, setformData] = useState({
    email: "",
    password: "",
  })

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event?.target
    setformData({ ...formData, [name]: value })
  }

  const onSumit = async (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    setIsLoading(true)
    const postData = new URLSearchParams({
      username: formData.email,
      password: formData.password,
    })

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: postData.toString(),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)
      

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
          errorData?.detail ||
            errorData?.email?.[0] ||
            errorData?.password?.[0] ||
            errorData?.non_field_errors?.[0] ||
            "An error occurred. Please try again.",
        )
      }

      const result = await response.json()
      localStorage.setItem("access_token", result.access_token)
      localStorage.setItem('username', result.username)
      console.log(result.username)

      console.log(result)
      toast.success("Login successful")
      router.push("/")
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          toast.error("Login request timed out. Please try again.")
        } else {
          toast.error(error.message)
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { formData, onSumit, onChange, isLoading }
}

