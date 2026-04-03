"use client"

import React, { ChangeEvent, FormEvent, useState } from "react"
import { Label } from "@/components/ui/label"
import { registerPlayer } from "./action"
import { FormData, FormErrors } from "./types"

const inputCls = (err?: string) =>
  `w-full px-3 py-2 rounded-lg text-sm outline-none transition-colors focus:ring-1 ${
    err
      ? "border border-red-400/60 focus:ring-red-400/30"
      : "border border-[rgba(28,35,64,0.15)] focus:border-[rgba(28,35,64,0.35)] focus:ring-[rgba(28,35,64,0.08)]"
  }`

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    age: 0,
    gender: "",
    skillGroups: { beginner: false, advanced: false },
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePrimaryTier = (tier: "beginner" | "advanced") => {
    setFormData({
      ...formData,
      skillGroups: {
        beginner: tier === "beginner",
        advanced: tier === "advanced",
      },
    })
  }

  const handleUpgrade = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      skillGroups: { beginner: true, advanced: e.target.checked },
    })
  }

  const primaryTier = formData.skillGroups.beginner
    ? "beginner"
    : formData.skillGroups.advanced
    ? "advanced"
    : null

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.firstName.trim()) newErrors.firstName = "Нэрээ оруулна уу!"
    if (!formData.lastName.trim())  newErrors.lastName  = "Овогоо оруулна уу!"
    if (!formData.email.trim())     newErrors.email     = "Имэйлээ оруулна уу!"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Имэйл буруу байна!"
    if (!formData.gender)           newErrors.gender    = "Хүйсээ сонгоно уу!"
    if (!primaryTier)               newErrors.skillGroups = "Оролцох түвшинг сонгоно уу!"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) registerPlayer(formData)
  }

  const labelCls = "block text-xs font-semibold mb-1.5 uppercase tracking-wide"
  const errorCls = "text-red-500 text-xs mt-1"
  const labelColor = { color: "rgba(28,35,64,0.52)" }
  const inputBg    = { background: "rgba(255,255,255,0.72)", color: "#1C2340" }
  const selectBg   = { background: "#F5EEF6", color: "#1C2340" }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Name row */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <div>
          <Label className={labelCls} style={labelColor} htmlFor="firstName">Нэр</Label>
          <input
            type="text" id="firstName" name="firstName"
            value={formData.firstName} onChange={handleInputChange}
            className={inputCls(errors.firstName)}
            style={inputBg}
          />
          {errors.firstName && <p className={errorCls}>{errors.firstName}</p>}
        </div>
        <div>
          <Label className={labelCls} style={labelColor} htmlFor="lastName">Овог</Label>
          <input
            type="text" id="lastName" name="lastName"
            value={formData.lastName} onChange={handleInputChange}
            className={inputCls(errors.lastName)}
            style={inputBg}
          />
          {errors.lastName && <p className={errorCls}>{errors.lastName}</p>}
        </div>
      </div>

      {/* Email */}
      <div>
        <Label className={labelCls} style={labelColor} htmlFor="email">Имэйл</Label>
        <input
          type="email" id="email" name="email"
          value={formData.email} onChange={handleInputChange}
          placeholder="example@email.com"
          className={inputCls(errors.email)}
          style={inputBg}
        />
        {errors.email && <p className={errorCls}>{errors.email}</p>}
      </div>

      {/* Age + Gender */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div>
          <Label className={labelCls} style={labelColor} htmlFor="age">Нас</Label>
          <input
            type="number" id="age" name="age"
            value={formData.age} onChange={handleInputChange}
            className={inputCls(errors.age)}
            style={inputBg}
          />
        </div>
        <div>
          <Label className={labelCls} style={labelColor}>Хүйс</Label>
          <select
            name="gender" value={formData.gender} onChange={handleInputChange}
            className={inputCls(errors.gender)}
            style={selectBg}
          >
            <option value=""       style={selectBg}>Сонгох</option>
            <option value="male"   style={selectBg}>Эрэгтэй</option>
            <option value="female" style={selectBg}>Эмэгтэй</option>
          </select>
          {errors.gender && <p className={errorCls}>{errors.gender}</p>}
        </div>
      </div>

      {/* Skill tier */}
      <div>
        <Label className={labelCls} style={labelColor}>
          Оролцох түвшин
        </Label>

        <div
          className="rounded-xl overflow-hidden"
          style={{ border: `1px solid ${errors.skillGroups ? "rgba(220,60,60,0.4)" : "rgba(28,35,64,0.13)"}` }}
        >
          {/* Beginner option */}
          <button
            type="button"
            onClick={() => handlePrimaryTier("beginner")}
            className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors"
            style={{
              background: primaryTier === "beginner" ? "rgba(28,55,160,0.07)" : "rgba(255,255,255,0.55)",
              borderBottom: "1px solid rgba(28,35,64,0.08)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors"
                style={{
                  borderColor: primaryTier === "beginner" ? "#C8903A" : "rgba(28,35,64,0.25)",
                }}
              >
                {primaryTier === "beginner" && (
                  <div className="w-2 h-2 rounded-full" style={{ background: "#C8903A" }} />
                )}
              </div>
              <span className="text-sm font-semibold" style={{ color: "#1C2340" }}>Анхан шат</span>
              <span className="text-xs" style={{ color: "rgba(28,35,64,0.38)" }}>Beginner</span>
            </div>
            <span className="font-black text-sm" style={{ color: "#C8903A" }}>$30</span>
          </button>

          {/* Upgrade checkbox — only when beginner is primary */}
          {primaryTier === "beginner" && (
            <label
              className="flex items-center justify-between px-4 py-3 cursor-pointer transition-colors"
              style={{
                background: formData.skillGroups.advanced ? "rgba(200,144,58,0.08)" : "rgba(255,255,255,0.4)",
                borderBottom: "1px solid rgba(28,35,64,0.08)",
              }}
            >
              <div className="flex items-center gap-3 pl-7">
                <input
                  type="checkbox"
                  checked={formData.skillGroups.advanced}
                  onChange={handleUpgrade}
                  className="w-4 h-4 rounded"
                  style={{ accentColor: "#C8903A" }}
                />
                <span className="text-sm" style={{ color: "rgba(28,35,64,0.65)" }}>
                  Ахисан шат руу мөн бүртгүүлэх
                </span>
              </div>
              <span className="font-bold text-sm" style={{ color: "#A87028" }}>+$20</span>
            </label>
          )}

          {/* Advanced option */}
          <button
            type="button"
            onClick={() => handlePrimaryTier("advanced")}
            className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors"
            style={{
              background: primaryTier === "advanced" ? "rgba(200,144,58,0.08)" : "rgba(255,255,255,0.55)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors"
                style={{
                  borderColor: primaryTier === "advanced" ? "#C8903A" : "rgba(28,35,64,0.25)",
                }}
              >
                {primaryTier === "advanced" && (
                  <div className="w-2 h-2 rounded-full" style={{ background: "#C8903A" }} />
                )}
              </div>
              <span className="text-sm font-semibold" style={{ color: "#1C2340" }}>Ахисан шат</span>
              <span className="text-xs" style={{ color: "rgba(28,35,64,0.38)" }}>Advanced</span>
            </div>
            <span className="font-black text-sm" style={{ color: "#C8903A" }}>$30</span>
          </button>
        </div>

        {errors.skillGroups && <p className={errorCls}>{errors.skillGroups}</p>}

        {/* Fee summary */}
        {primaryTier && (
          <p className="text-xs mt-2 text-right" style={{ color: "rgba(28,35,64,0.4)" }}>
            Нийт хураамж:{" "}
            <span style={{ color: "#C8903A", fontWeight: 700 }}>
              ${primaryTier === "beginner" && formData.skillGroups.advanced ? 50 : 30}
            </span>
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-3 rounded-xl font-black text-sm tracking-wide transition-transform hover:scale-[1.02] mt-2"
        style={{
          background: "linear-gradient(135deg, #D4963C, #A87028)",
          color: "#FFF8F0",
          boxShadow: "0 4px 18px rgba(200,144,58,0.3)",
        }}
      >
        Бүртгэх →
      </button>
    </form>
  )
}

export default RegistrationForm
