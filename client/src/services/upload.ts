import { toast } from "sonner"

export async function uploadFile(file: File): Promise<string | null> {
  try {
    const formData = new FormData()
    formData.append("file", file)

    toast.message("Uploading file...")

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    if (!res.ok) throw new Error("Upload failed")

    const data = await res.json()
    toast.success("File uploaded successfully!")

    return data.fileUrl //backend must return this
  } catch {
    toast.error("Upload error", {
      description: "Please try again.",
    })
    return null
  }
}
