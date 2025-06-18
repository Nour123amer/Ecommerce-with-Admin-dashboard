"use client"

import { useEffect, useContext, useState } from "react"
import { CiMenuFries } from "react-icons/ci"
import { FiSearch, FiFilter, FiDownload, FiEye } from "react-icons/fi"
import { OrderContext } from "../../contexts/OrdersContext"

export default function Orders() {
  const { orders } = useContext(OrderContext)
  const [productsData, setProductsData] = useState({})
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!orders) return

      const productIds = new Set()
      orders.forEach((order) => {
        order.products?.forEach((product) => {
          productIds.add(product.productId)
        })
      })

      const productDetails = {}
      for (const productId of productIds) {
        try {
          const res = await fetch(`http://localhost:3000/products/${productId}`)
          const product = await res.json()
          productDetails[productId] = product
        } catch (error) {
          console.error(`Failed to fetch product ${productId}:`, error)
        }
      }

      setProductsData(productDetails)
    }

    fetchProductDetails()
  }, [orders])

  // Calculate total for an order
  const calculateOrderTotal = (order) => {
    if (!order.products || !productsData) return 0

    return order.products.reduce((total, item) => {
      const product = productsData[item.productId]
      if (product && product.price) {
        return total + product.price * item.quantity
      }
      return total
    }, 0)
  }

  // Filter orders based on search and status
  const filteredOrders =
    orders?.filter((order) => {
      const matchesSearch =
        order.id?.toString().includes(searchTerm) ||
        order.phone?.includes(searchTerm) ||
        order.name?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || order.status === statusFilter

      return matchesSearch && matchesStatus
    }) || []

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <CiMenuFries className="text-blue-600 text-3xl" />
          <h1 className="text-3xl font-bold text-gray-800">Orders Management</h1>
        </div>
        <p className="text-gray-600">Manage and track all customer orders</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by ID, phone, or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <FiFilter className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Export Button */}
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <FiDownload size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid gap-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Order Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Order #{order.id}</h3>
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">${calculateOrderTotal(order).toFixed(2)}</p>
                      <p className="text-sm text-gray-600">
                        {order.products?.reduce((acc, item) => acc + item.quantity, 0)} items
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                      className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <FiEye size={16} />
                      {selectedOrder === order.id ? "Hide" : "View"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="px-6 py-4 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Customer</p>
                    <p className="font-medium">{order.name || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{order.phone || "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* Order Details (Expandable) */}
              {selectedOrder === order.id && (
                <div className="p-6 border-t border-gray-100">
                  <h4 className="font-semibold text-gray-800 mb-4">Order Items</h4>
                  <div className="space-y-4">
                    {order.products?.map((product, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <img
                          src={productsData[product.productId]?.image || "/placeholder.svg"}
                          alt={productsData[product.productId]?.name || "Product"}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-800">
                            {productsData[product.productId]?.name || `Product ID: ${product.productId}`}
                          </h5>
                          <p className="text-sm text-gray-600">
                            Quantity: {product.quantity} × ${productsData[product.productId]?.price || 0}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-800">
                            ${((productsData[product.productId]?.price || 0) * product.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Actions */}
                  <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      Mark as Completed
                    </button>
                    <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                      Update Status
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      Cancel Order
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-gray-400 mb-4">
              <CiMenuFries size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No orders found</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Orders will appear here once customers start placing them"}
            </p>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      {filteredOrders.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-600">Total Orders</h3>
            <p className="text-2xl font-bold text-gray-800">{filteredOrders.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-600">Pending</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {filteredOrders.filter((o) => o.status === "pending").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-600">Completed</h3>
            <p className="text-2xl font-bold text-green-600">
              {filteredOrders.filter((o) => o.status === "completed").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-600">Total Revenue</h3>
            <p className="text-2xl font-bold text-blue-600">
              ${filteredOrders.reduce((sum, order) => sum + calculateOrderTotal(order), 0).toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

