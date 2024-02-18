import React, { useState } from "react";
import styles from "./Dropdown.module.css";
import OutsideClickHandler from "react-outside-click-handler";

const Dropdown = ({ dropdownList, setDropdownList, label }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const dropdownItems = dropdownList.map((item, index) => {
    const checkboxClickHandler = (index) => {
      const newList = [...dropdownList];
      newList[index].isChecked = !newList[index].isChecked;
      setDropdownList(newList);
    };
    return (
      <div
        key={index}
        onClick={() => checkboxClickHandler(index)}
        className={styles.listItem}
      >
        <div data-ischecked={item.isChecked} className={styles.checkIcon}>
          <img
            src="https://cdn1.iconfinder.com/data/icons/material-core/18/check-128.png"
            alt=""
          />
        </div>
        {item.name}
      </div>
    );
  });

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setIsExpanded(false);
      }}
    >
      <div data-isexpanded={isExpanded} className={styles.container}>
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className={styles.dropdownContainer}
        >
          {label}
          <img
            data-isexpanded={isExpanded}
            className={styles.arrowIcon}
            src="https://cdn0.iconfinder.com/data/icons/mobile-basic-vol-1/32/Chevron_Up-128.png"
            alt="arrowicon"
          />
        </div>
        {isExpanded && (
          <div
            className={[styles.dropdownListContainer, "noScrollbar"].join(" ")}
          >
            {dropdownItems}
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};

export default Dropdown;
