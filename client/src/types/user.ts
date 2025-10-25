
export interface User {
  id?: string
  name: string
  email?: string
  // allow other optional fields coming from the API, typed as unknown to avoid `any`
  [key: string]: unknown
}