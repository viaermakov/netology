import * as React from "react";
import cls from "classnames";

import styles from "./checkbox.scss";

interface ICheckboxProps {
  className: string;
  onClick: () => void;
  isActive: boolean;
}

function Checkbox({
  className,
  onClick,
  isActive,
}: React.PropsWithChildren<ICheckboxProps>) {
  return (
    <label className={cls(className, styles.custom)}>
      <input type="checkbox" checked={isActive} onClick={onClick} />
      <svg
        width="32"
        height="32"
        viewBox="-4 -4 39 39"
        aria-hidden="true"
        focusable="false"
      >
        <rect
          className={styles.bg}
          width="35"
          height="35"
          x="-2"
          y="-2"
          stroke="currentColor"
          fill="none"
          stroke-width="3"
          rx="6"
          ry="6"
        ></rect>
        <polyline
          className={styles.cm}
          points="4,14 12,23 28,5"
          stroke="transparent"
          stroke-width="4"
          fill="none"
        ></polyline>
      </svg>
    </label>
  );
}

export default Checkbox;
