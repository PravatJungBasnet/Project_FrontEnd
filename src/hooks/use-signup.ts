import { useState, type ChangeEvent, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function useSignUp() {
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

  /*const onSumit = async (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    setIsLoading(true)

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.email,
          password: formData.password,
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)
      
      if (!response.ok) {
        let errorMessage = "An error occurred. Please try again.";
        
        const errorData = await response.json()
        if (Array.isArray(errorData?.detail)) {
          // Extract and format validation messages
          errorMessage = errorData.detail
            .map((err: any) => `${err.loc?.[1] ?? "Error"}: ${err.msg}`)
            .join(", ");
        } else if (typeof errorData?.detail === "string") {
          errorMessage = errorData.detail;
        }

      
       

        throw new Error(
          errorData?.email?.[0] ||
            errorData?.password?.[0] ||
            errorData?.non_field_errors?.[0] ||
            errorData?.detail ||
            "An error occurred. Please try again.",
        )
      }

      toast.success("Registration successful")
      router.push("/login")
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          toast.error("Registration request timed out. Please try again.")
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
  */
  const onSumit = async (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    setIsLoading(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10-second timeout

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.email,
          password: formData.password,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const responseData = await response.json();

      if (!response.ok) {
        let errorMessage = "An error occurred. Please try again.";

        if (Array.isArray(responseData?.detail)) {
          // Extract and format validation messages
          errorMessage = responseData.detail
            .map((err: any) => `${err.loc?.[1] ?? "Error"}: ${err.msg}`)
            .join(", ");
        } else if (typeof responseData?.detail === "string") {
          errorMessage = responseData.detail;
        }

        throw new Error(errorMessage);
      }

      toast.success("Registration successful");
      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          toast.error("Registration request timed out. Please try again.");
        } else {
          toast.error(error.message);
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { formData, onSumit, onChange, isLoading };
}


