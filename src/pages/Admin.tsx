import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"

export default function Admin() {
  const [orders, setOrders] = useState([])
  const [password, setPassword] = useState("")
  const [authenticated, setAuthenticated] = useState(false)

  const correctPassword = "iitbhu123" // 🔐 You can change this

  const fetchOrders = async () => {
    const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false })
    if (!error) setOrders(data)
  }

  const markDelivered = async (id: string) => {
    await supabase.from("orders").update({ status: "delivered" }).eq("id", id)
    fetchOrders()
  }

  const deleteOrder = async (id: string) => {
    await supabase.from("orders").delete().eq("id", id)
    fetchOrders()
  }

  useEffect(() => {
    if (authenticated) fetchOrders()
  }, [authenticated])

  if (!authenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <h2 className="text-2xl font-semibold">Admin Access</h2>
        <input
          type="password"
          placeholder="Enter admin password"
          className="border px-3 py-2 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={() => setAuthenticated(password === correctPassword)}>
          Login
        </Button>
        {password && password !== correctPassword && (
          <p className="text-red-500 text-sm">Incorrect password</p>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Panel - Orders</h1>
      {orders.length === 0 ? (
        <p>No orders submitted yet.</p>
      ) : (
        <table className="w-full border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Branch</th>
              <th className="p-2 border">Room</th>
              <th className="p-2 border">Contact</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="text-sm">
                <td className="p-2 border">{o.name}</td>
                <td className="p-2 border">{o.branch}</td>
                <td className="p-2 border">{o.room}</td>
                <td className="p-2 border">{o.contact}</td>
                <td className="p-2 border">{o.status || "pending"}</td>
                <td className="p-2 border space-x-2">
                  <Button size="sm" onClick={() => markDelivered(o.id)}>
                    Mark Delivered
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteOrder(o.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
