import React from 'react'

const FormField = ({name,labelName,type,value,placeholder,isSurpriseMe,handleSurpriseMe,onChange}) => {
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
          <label 
          htmlFor={name}
          className='block text-sm font-medium text-gray-900'
          >
             {labelName}
          </label>
          {isSurpriseMe && (
            <button
            type="button"
            onClick={handleSurpriseMe}
            className='font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black'
            >
          Surprise Me
            </button>
          )}
      </div>
      <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      required
      id={name}
      className='bg-gray-50 border-gray-300 text-gray-900 border text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full shadow-sm sm:text-sm p-3'
      />
    </div>
  )
}

export default FormField
