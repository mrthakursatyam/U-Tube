import Reac, { useState, useEffect, useRef } from "react";
import "./PlayVideo.css";
import allSubscribeBellImg from "../../assets/bell.png";
import noneBellImg from "../../assets/bellNone.png";
import personalizeBellImg from "../../assets/bellPersonalize.png";
import unsubscribeImg from "../../assets/unsubscribe.png";
import downArrowImg from "../../assets/downArrow.png";


export const CustomSelect = ({onSelect}) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(personalizeBellImg);
  const dropdownRef = useRef(null);
  const listObject = [
    {
      img:allSubscribeBellImg,
      value:"Subscribed"
    },
    {
      img:personalizeBellImg,
      value:"Personalize"
    },
    {
      img:noneBellImg,
      value:"None"
    },
    {
      img:unsubscribeImg,
      value:"Unsubscribe"
    },
  ]

  const handleToggle = () => {
    setIsOpen(prev => !prev);
    // console.log('Dropdown isOpen:', isOpen);
  };

  const handleOptionClick = (currListObject) => {
    if(currListObject.value == 'Unsubscribe')
    {
      onSelect(currListObject)
    }
    setSelectedOption(currListObject.img);
    setIsOpen(false);
    // console.log(currListObject.value);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
      // console.log(event.target);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="custom-select" ref={dropdownRef}>
      <div className="selectField" onClick={handleToggle}>
        <img src={selectedOption} alt="" />
        <p>Subscribed</p>
        <img src={downArrowImg} alt="" />
      </div>
      {isOpen && (
        <ul className="list">
        {listObject.map((curr) => (
            <li key={curr.value} className="options" onClick={() => handleOptionClick(curr)}>
              <img src={curr.img} alt="" />
              <p>{curr.value}</p>
            </li>
        ))}
      </ul>
      )}
    </div>
  );
};
