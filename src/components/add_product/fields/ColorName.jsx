import React, { useState, useEffect } from "react";
import GadgetariumSpinnerLoading from "../../GadgetariumSpinnerLoading";

const ColorName = ({ color }) => {
  const [colorName, setColorName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function fetchColorName() {
    if (!color || typeof color !== "string") return; // 🔒 защита

    setIsLoading(true);
    try {
      const response = await fetch(
        `http://www.thecolorapi.com/id?hex=${color.substring(1)}`
      );
      const data = await response.json();
      const name = data.name?.value;
      setColorName(name || "Unknown");
    } catch (error) {
      console.error("Failed to fetch color name:", error);
      setColorName("Unknown");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (color) fetchColorName();
  }, [color]);

  if (isLoading) return <GadgetariumSpinnerLoading />;

  return <span>{colorName}</span>;
};

export default ColorName;
