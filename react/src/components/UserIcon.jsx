import React from "react";

const UserIcon = ({ img, name, color, size = 50, style = {} }) => {
  const iconStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
    overflow: "hidden",
    border: `3px solid ${color}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    position: "relative",
    ...style, // Allow additional styling
  };

  /**
   * Defines the styles for the image element within the UserIcon component.
   * The styles ensure the image covers the entire container, and applies a
   * semi-transparent color overlay if the image is the default picture.
   */
  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter:
      !img || img === "/default_picture.png"
        ? `opacity(0.7) drop-shadow(0 0 0 ${color})`
        : "none",
  };

  return (
    <div style={iconStyle} title={name}>
      <img src={img || "/default_picture.png"} alt={name} style={imageStyle} />
      {/* Add fallback color overlay */}
      {(!img || img === "/default_picture.png") && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: color,
            opacity: 0.3,
            borderRadius: "50%",
          }}
        />
      )}
    </div>
  );
};

export default UserIcon;
