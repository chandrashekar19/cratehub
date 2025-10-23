import { toast } from "sonner"

export interface Crate {
  id: number
  name: string
  description: string
  createdAt?: string
  updatedAt?: string
}

const API_URL = "/api/crates"

//  Get list of crates
export async function fetchCrates(): Promise<Crate[]> {
  try {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error()
    return await res.json()
  } catch {
    toast.error("Failed to load crates")
    return []
  }
}

//  Get crate by ID
export async function fetchCrateById(id: number): Promise<Crate | null> {
  try {
    const res = await fetch(`${API_URL}/${id}`)
    if (!res.ok) throw new Error()
    return await res.json()
  } catch {
    toast.error("Failed to fetch crate")
    return null
  }
}

//  Create crate
export async function createCrate(crate: Omit<Crate, "id">) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(crate),
    })
    if (!res.ok) throw new Error()
    toast.success("Crate created successfully!")
  } catch {
    toast.error("Failed to create crate")
  }
}

//  Update crate
export async function updateCrate(id: number, crate: Partial<Crate>) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(crate),
    })
    if (!res.ok) throw new Error()
    toast.success("Crate updated successfully!")
  } catch {
    toast.error("Failed to update crate")
  }
}

//  Delete crate
export async function deleteCrate(id: number) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error()
    toast.success("Crate deleted successfully!")
  } catch {
    toast.error("Failed to delete crate")
  }
}
