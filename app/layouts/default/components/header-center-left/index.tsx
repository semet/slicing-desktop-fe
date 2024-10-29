import { SidebarToggle } from '@/layouts/default'

export const HeaderCenterLeft = () => {
  return (
    <div className="flex items-center gap-4">
      <SidebarToggle />
      <img
        src="/logo.gif"
        alt="Logo"
        width={140}
        height={45}
      />
    </div>
  )
}
