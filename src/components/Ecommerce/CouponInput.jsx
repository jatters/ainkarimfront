"use client";
import React, { useState, useContext } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
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
      const response = await GetCoupons(couponCode);

      if (response && response.coupon) {
        const couponData = response.coupon;

        if (couponData.code.toUpperCase() !== couponCode.toUpperCase()) {
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
      <div className="flex flex-wrap items-center gap-y-3 gap-1">
        <Stack direction="row" spacing={1}>
          <Chip
            icon={<LocalOfferIcon />}
            label={coupon.code.toUpperCase()}
            onDelete={handleDeleteCoupon}
          />
        </Stack>
        {coupon.description && (
          <span
            className="coupon-description text-sm block "
            style={{ color: "green" }}
          >
            {coupon.description}
          </span>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <input
          type="text"
          name="couponCode"
          id="couponCode"
          placeholder="¿Tienes un cupón?"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:-ring--dark-green w-full sm:w-auto"
        />
        <button
          onClick={handleApplyCoupon}
          disabled={loading}
          className="-bg--dark-green text-white px-4 py-2 rounded-md flex-1 whitespace-nowrap hover:-bg--grey-darkest duration-200"
        >
          {loading ? "Aplicando..." : "Aplicar cupón"}
        </button>
      </div>
      {error && (
        <span
          className="coupon-error text-sm ml-1 mt-1 block"
          style={{ color: "red" }}
        >
          {error}
        </span>
      )}
    </>
  );
}
