import Menu from "./menu"

export default function Layouts({ children }: { children: React.ReactNode }) {
  return <div style={{ width: "800px", height: "500px" }}>
    <Menu/>
    <div style={{ flex: 1, overflow: "auto", padding: "0 6px 6px", height: "100%" }}>
      {children}
    </div>
  </div>
}