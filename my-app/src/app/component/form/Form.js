import React from 'react'

const form = (
  {
    formValues,
    handleAddCustomer,
    handleUpdateCustomer,
    handleClearForm,
    handleInputChange,
    errors,
    action
  }

) => {
  
  return (
    <div className="mb-6">
      <div className="space-y-4 bg-zinc-900 p-8 rounded-md  ">
        {/* First Section with 3 fields */}
        <div className="grid grid-cols-3 sm:grid-cols-3 gap-4">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-white"
            >
              Name
            </label>
            <input
              type="text"
              
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2  text-white  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2  text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-white"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formValues.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2  text-white  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
            />
            {errors.phone && <p className="text-red-500">{errors.phone}</p>}
          </div>
        </div>

        {/* Second Section with 3 fields */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Date of Birth */}
          <div>
            <label
              htmlFor="dob"
              className="block text-sm font-semibold text-white"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formValues.dob}
              onChange={handleInputChange}
              className="w-full px-4 py-2  text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.dob && <p className="text-red-500">{errors.dob}</p>}
          </div>

          {/* Aadhaar Number */}
          <div>
            <label
              htmlFor="aadhaar"
              className="block text-sm font-semibold text-white"
            >
              Aadhaar Number
            </label>
            <input
              type="text"
              id="aadhaar"
              name="aadhaar"
              value={formValues.aadhaar}
              onChange={handleInputChange}
              className="w-full px-4 py-2  text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Aadhaar number"
            />
            {errors.aadhaar && <p className="text-red-500">{errors.aadhaar}</p>}
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-semibold text-white"
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formValues.address}
              onChange={handleInputChange}
              className="w-full h-11 px-4 py-2  text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your address"
              rows="3"
            />
            {errors.address && <p className="text-red-500">{errors.address}</p>}
          </div>
        </div>

        {/* Terms and Conditions and Action Buttons */}
        <div className="space-y-4">
          {/* Terms and Conditions */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={formValues.terms}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="terms" className="text-sm text-white">
              I agree to the Terms and Conditions
            </label>
            {errors.terms && <p className="text-red-500">{errors.terms}</p>}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handleClearForm}
              className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-black"
            >
              Clear
            </button>

            <button
              onClick={action=="Add" ? handleAddCustomer : handleUpdateCustomer}
              className="w-full sm:w-auto px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {`${action} Customer`}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default form