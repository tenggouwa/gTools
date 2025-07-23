import Menu from "./menu"

export default function Layouts({ children }: { children: React.ReactNode }) {
  return <div style={{ width: "800px", height: "500px" }}>
    <Menu/>
    <div style={{ marginTop: 6 }}>
      {children}
    </div>
  </div>
}