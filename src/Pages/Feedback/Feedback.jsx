
"use client"

import { useContext, useState } from "react"
import { ProductRateContext } from "../../contexts/Rate"
import { RiFeedbackFill } from "react-icons/ri"
import { FeedbackContext } from "../../contexts/FeedbackContext"
import { FiSearch, FiFilter, FiUser, FiCalendar, FiStar } from "react-icons/fi"
import { BiSortAlt2 } from "react-icons/bi"

export default function Feedback() {
  const { renderedStars } = useContext(ProductRateContext)
  const { reviews } = useContext(FeedbackContext)
  const [searchTerm, setSearchTerm] = useState("")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  // Filter and sort reviews
  const filteredReviews = reviews
    ?.filter((review) => {
      const matchesSearch = review.comment?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesRating = ratingFilter === "all" || review.rating === Number.parseInt(ratingFilter)
      return matchesSearch && matchesRating
    })
    ?.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date) - new Date(a.date)
        case "oldest":
          return new Date(a.date) - new Date(b.date)
        case "highest":
          return b.rating - a.rating
        case "lowest":
          return a.rating - b.rating
        default:
          return 0
      }
    })

  // Calculate statistics
  const averageRating = reviews?.length
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0

  const ratingDistribution = reviews?.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1
    return acc
  }, {})

  const getRatingColor = (rating) => {
    if (rating >= 4) return "text-green-600"
    if (rating >= 3) return "text-yellow-600"
    return "text-red-600"
  }

  const getRatingBg = (rating) => {
    if (rating >= 4) return "bg-green-50 border-green-200"
    if (rating >= 3) return "bg-yellow-50 border-yellow-200"
    return "bg-red-50 border-red-200"
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <RiFeedbackFill className="text-blue-600 text-3xl" />
          <h1 className="text-3xl font-bold text-gray-800">Customer Feedback</h1>
        </div>
        <p className="text-gray-600">Monitor and analyze customer reviews and ratings</p>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FiStar className="text-blue-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Rating</p>
              <p className="text-2xl font-bold text-gray-800">{averageRating}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <RiFeedbackFill className="text-green-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Reviews</p>
              <p className="text-2xl font-bold text-gray-800">{reviews?.length || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <FiStar className="text-yellow-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-600">5-Star Reviews</p>
              <p className="text-2xl font-bold text-gray-800">{ratingDistribution?.[5] || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <FiStar className="text-red-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Low Ratings (1-2)</p>
              <p className="text-2xl font-bold text-gray-800">
                {(ratingDistribution?.[1] || 0) + (ratingDistribution?.[2] || 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Rating Distribution</h3>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-4">
              <div className="flex items-center gap-1 w-16">
                <span className="text-sm font-medium">{rating}</span>
                <FiStar className="text-yellow-500 text-sm" />
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${reviews?.length ? ((ratingDistribution?.[rating] || 0) / reviews.length) * 100 : 0}%`,
                  }}
                />
              </div>
              <span className="text-sm text-gray-600 w-12">{ratingDistribution?.[rating] || 0}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-4">
            {/* Rating Filter */}
            <div className="flex items-center gap-2">
              <FiFilter className="text-gray-400" />
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <BiSortAlt2 className="text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews && filteredReviews.length > 0 ? (
          filteredReviews.map((review, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-sm border-2 p-6 hover:shadow-md transition-all duration-200 ${getRatingBg(
                review.rating,
              )}`}
            >
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <FiUser className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{review.customerName || "Anonymous"}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <FiCalendar className="text-xs" />
                      {new Date(review.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className={`text-2xl font-bold ${getRatingColor(review.rating)}`}>{review.rating}</div>
              </div>

              {/* Rating Stars */}
              <div className="flex items-center gap-1 mb-4">{renderedStars(review.rating)}</div>

              {/* Review Comment */}
              <div className="mb-4">
                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
              </div>

              {/* Review Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    review.rating >= 4
                      ? "bg-green-100 text-green-800"
                      : review.rating >= 3
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {review.rating >= 4 ? "Positive" : review.rating >= 3 ? "Neutral" : "Negative"}
                </span>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Reply</button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-gray-400 mb-4">
              <RiFeedbackFill size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No reviews found</h3>
            <p className="text-gray-600">
              {searchTerm || ratingFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Customer reviews will appear here once they start leaving feedback"}
            </p>
          </div>
        )}
      </div>

      {/* Load More Button */}
      {filteredReviews && filteredReviews.length > 0 && (
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Load More Reviews
          </button>
        </div>
      )}
    </div>
  )
}
