"use client"

import React, { ChangeEvent, FormEvent, useState } from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import { registerPlayer } from "./action"
import { FormData, FormErrors } from "./types"

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    city: "",
    age: 0,
    gender: "",
    skillGroups: {
      beginner: false,
      intermediate: false,
      advanced: false,
    },
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target

    // If changing gender to female, reset beginner options
    if (name === "gender") {
      setFormData({
        ...formData,
        [name]: value,
        skillGroups: {
          ...formData.skillGroups,
          beginner: false,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSkillGroupChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, checked } = e.target
    setFormData({
      ...formData,
      skillGroups: {
        ...formData.skillGroups,
        [name]: checked,
      },
    })
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.firstName.trim()) newErrors.firstName = "Нэрээ оруулна уу!"
    if (!formData.lastName.trim()) newErrors.lastName = "Овогоо оруулна уу!"
    if (!formData.city.trim()) newErrors.city = "Хотоо оруулна уу!"

    if (!formData.gender) newErrors.gender = "Хүйсээ сонгоно уу!"

    const hasSelectedSkillGroup = Object.values(formData.skillGroups).some(
      (value) => value
    )
    if (!hasSelectedSkillGroup)
      newErrors.skillGroups = "Заавал нэгийг сонгоно уу!"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    if (validateForm()) {
      // Form is valid, proceed with submission
      registerPlayer(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <Label className="block text-blue-700 mb-2" htmlFor="firstName">
          Нэр
        </Label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.firstName ? "border-red-500" : "border-blue-300"
          }`}
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
        )}
      </div>

      <div className="mb-4">
        <Label className="block text-blue-700 mb-2" htmlFor="lastName">
          Овог
        </Label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.lastName ? "border-red-500" : "border-blue-300"
          }`}
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
        )}
      </div>

      <div className="mb-4">
        <Label className="block text-blue-700 mb-2" htmlFor="city">
          Төлөөлж буй хот
        </Label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.city ? "border-red-500" : "border-blue-300"
          }`}
        />
        {errors.city && (
          <p className="text-red-500 text-sm mt-1">{errors.city}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <Label className="block text-blue-700 mb-2" htmlFor="age">
            Нас
          </Label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.age ? "border-red-500" : "border-blue-300"
            }`}
          />
          {errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age}</p>
          )}
        </div>

        <div className="mb-4">
          <Label className="block text-blue-700 mb-2">Хүйс</Label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.gender ? "border-red-500" : "border-blue-300"
            }`}
          >
            <option value="">Select</option>
            <option value="male">Эрэгтэй</option>
            <option value="female">Эмэгтэй</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <Label className="block text-blue-700 mb-2">Оролцох түвшин</Label>
        <div className="pl-2">
          {formData.gender !== "female" && (
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="beginner"
                name="beginner"
                checked={formData.skillGroups.beginner}
                onChange={handleSkillGroupChange}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <Label htmlFor="beginner" className="text-blue-700">
                Анхан шат
              </Label>
            </div>
          )}

          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="intermediate"
              name="intermediate"
              checked={formData.skillGroups.intermediate}
              onChange={handleSkillGroupChange}
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <Label htmlFor="intermediate" className="text-blue-700">
              Сонирхогч буюу дунд шат
            </Label>
          </div>

          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="advanced"
              name="advanced"
              checked={formData.skillGroups.advanced}
              onChange={handleSkillGroupChange}
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <Label htmlFor="advanced" className="text-blue-700">
              Ахисан шат
            </Label>
          </div>
        </div>
        {errors.skillGroups && (
          <p className="text-red-500 text-sm mt-1">{errors.skillGroups}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors  focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Бүртгэх
      </Button>
    </form>
  )
}

export default RegistrationForm
