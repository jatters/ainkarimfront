"use client";
import React, { useState, useContext } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { GetCoupons } from "../GetContentApi";
import { CartContext } from "../../context/CartContext";

export default function CouponInput() {
  const { coupon, setCoupon } = useContext(CartContext);
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setError("Ingresa el código del cupón.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const cleanCode = couponCode.trim();
      const response = await GetCoupons(cleanCode);
      
      if (response && response.coupon) {
        const couponData = response.coupon;
        if (couponData.code.toUpperCase() !== cleanCode.toUpperCase()) {
          setError("El código del cupón no es válido.");
          setLoading(false);
          return;
        }

        if (couponData.endDate) {
          const expirationDate = new Date(couponData.endDate);
          if (new Date() > expirationDate) {
            setError("El cupón ha expirado");
            setLoading(false);
            return;
          }
        }
        setCoupon(couponData);
        setLoading(false);
      } else {
        setError("El cupón no es válido");
        setLoading(false);
      }
    } catch (err) {
      setError("El cupón no es válido");
      setLoading(false);
    }
  };

  const handleDeleteCoupon = () => {
    setCoupon(null);
    setCouponCode("");
    setError("");
  };

  if (coupon) {
    return (
      <div className="flex justify-center flex-col flex-wrap items-center gap-y-3 gap-1">
        <Stack direction="row" spacing={1}>
          <Chip
            label={`Código: ${coupon.code.toUpperCase()}`}
            onDelete={handleDeleteCoupon}
            color="success"
          />
        </Stack>
        {coupon.description && (
          <span className="coupon-description text-sm text-lime-700 font-medium flex items-center gap-1">
            <span
              className="icon-[ri--discount-percent-fill] text-base"
              role="img"
              aria-hidden="true"
            />
            Descuento: {coupon.percent}%{/* {coupon.description} */}
          </span>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="relative flex items-center border border-gray-300 rounded-lg overflow-hidden w-full max-w-sm mx-auto">
        <div className="absolute left-3">
          <span
            className="icon-[streamline--discount-percent-coupon-solid] text-gray-400"
            role="img"
            aria-hidden="true"
          />
        </div>
        <input
          type="text"
          name="couponCode"
          id="couponCode"
          placeholder="Código de descuento"
          value={couponCode}          
          onChange={(e) => setCouponCode(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleApplyCoupon();
            }
          }}
          className="pl-10 pr-3 py-2 text-gray-700 bg-white focus:outline-hidden focus:ring-0 w-full text-xs lg:text-sm "
          style={{ border: "none" }}
        />
        <button
          onClick={handleApplyCoupon}
          disabled={loading}
          className="bg-dark-green text-white px-4 py-2 whitespace-nowrap font-medium hover:bg-light-green hover:text-white duration-200"
        >
          {loading ? "Aplicando..." : "Aplicar"}
        </button>
      </div>
      {error && (
        <div className="text-sm mt-1 text-red-700 bg-red-100 p-2 rounded-md flex justify-center max-w-sm mx-auto w-full items-center">
          {error}
        </div>
      )}
    </>
  );
}
