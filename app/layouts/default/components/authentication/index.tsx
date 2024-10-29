import { Login, Register } from '@/layouts/default'

export const Authentication = () => {
  return (
    <div className="flex items-center gap-4">
      <Login />
      <Register />
    </div>
  )
}
