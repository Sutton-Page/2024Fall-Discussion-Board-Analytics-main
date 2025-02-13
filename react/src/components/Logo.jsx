/**
 * Renders the logo component, which displays the GSU logo.
 * @returns {JSX.Element} The logo component.
 */
const Logo = () => {
  return (
    <div className="logo">
      <div className="logo-icon" style={{ width: "50px", height: "50px" }}>
        <img
          src="/gsu-icon.png"
          alt="GSU Logo"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
    </div>
  );
};

export default Logo;
