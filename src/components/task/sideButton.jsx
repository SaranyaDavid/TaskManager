import { FaQrcode, FaStream, FaSlidersH } from "react-icons/fa";
import { useEffect, useState } from "react";
export default function SideButton({
  title,
  section,
  handleAddCategory,
  ...prop
}) {
  const [activeButton, setActiveButton] = useState([]);
  let values = [];
  try {
    values = JSON.parse(localStorage.getItem("filters"));
  } catch {
    console.log("Not set");
  }

  useEffect(() => {
    setActiveButton([...values]);
  }, []);
  function handleClick(value) {
    handleAddCategory(value);
    const data = JSON.parse(localStorage.getItem("filters"));
    setActiveButton([...data]);
    console.log("sdsdsd");
    console.log(activeButton);
  }
  return (
    <li>
      {prop.QR && <FaQrcode />}
      {prop.priority && <FaStream />}
      {prop.category && <FaSlidersH />}
      <a href="#">{title}</a>
      <div className="innerUl">
        {section.map((value) => (
          <button
            key={value}
            className={activeButton.includes(value) ? "active_button" : ""}
            onClick={() => handleClick(value)}
          >
            {value}
          </button>
        ))}
      </div>
    </li>
  );
}
