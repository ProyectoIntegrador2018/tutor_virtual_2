import React, { HTMLAttributes } from "react";
import ReactDatePicker from "react-datepicker";

interface Props {
  isClearable?: boolean;
  onChange: (date: string) => any;
  value: string | null;
  showPopperArrow?: boolean;
}

const DatePicker = ({
  value,
  onChange,
  isClearable = false,
  showPopperArrow = false,
  ...props
}: Props & HTMLAttributes<HTMLElement>) => (
  <ReactDatePicker
    dateFormat="yyyy-MM-dd"
    selected={(value && new Date(value)) || null}
    onChange={onChange}
    isClearable={isClearable}
    showPopperArrow={showPopperArrow}
    {...props}
  />
);

export default DatePicker;
