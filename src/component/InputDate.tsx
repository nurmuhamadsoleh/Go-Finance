import { DatePicker, Form } from "antd";

import handleFeedBack from "helper/handleFeedback";

interface IPropsDatePicker {
  className?: any;
  colon?: boolean;
  customDateFormat?: any;
  customDefaultValue?: any;
  data?: any;
  disableFormat?: boolean;
  disabled?: any;
  disabledDate?: any;
  formItemStyle?: any;
  icon?: any;
  idComponent?: any;
  input?: any;
  label?: any;
  labelcol?: any;
  meta?: any;
  placeholder?: any;
  rangeType?: "week" | "month" | "year";
  showError?: boolean;
  showNow?: boolean;
  showTime?: boolean;
  typeDate?: any;
  update?: any;
  isFormItem?: boolean;
}

const formatDate = "DD-MM-YYYY";

export const InputDatePicker = (props: IPropsDatePicker) => {
  const {
    className,
    colon,
    customDateFormat,
    customDefaultValue,
    disableFormat,
    disabled,
    disabledDate,
    formItemStyle,
    idComponent,
    input,
    label,
    labelcol,
    meta: { error },
    rangeType,
    showError,
    showNow,
    showTime,
    typeDate,
    update,
    isFormItem,
  } = props;

  const handleOnChange = (e: any) => {
    input.onChange(e);
  };
  const labelTitle = label ? (
    <span>
      <b className="capital font-poppinsSemiBold">{label}</b>
    </span>
  ) : null;
  const inputValue = input.value;

  const renderPicker: any = () => {
    if ((update && typeof inputValue === "object") || !update) {
      if (typeDate === "datePicker") {
        return (
          <DatePicker
            className={className}
            disabled={disabled}
            disabledDate={disabledDate}
            defaultValue={customDefaultValue}
            format={customDateFormat ? customDateFormat : formatDate}
            id={idComponent}
            onBlur={input.onBlur}
            onChange={handleOnChange}
            placeholder="Pilih tanggal"
            style={{ width: "100%" }}
            showTime={showTime}
            showNow={showNow}
            {...input}
          />
        );
      } else if (typeDate === "dateRangePicker") {
        return (
          <DatePicker.RangePicker
            placeholder={["Start date", "End date"]}
            style={{ width: "100%" }}
            onChange={handleOnChange}
            id={idComponent}
            defaultValue={customDefaultValue}
            format={
              customDateFormat
                ? customDateFormat
                : disableFormat
                ? undefined
                : formatDate
            }
            disabled={disabled}
            disabledDate={disabledDate}
            className={className}
            showTime={showTime}
            showNow={showNow}
            picker={rangeType}
            {...input}
          />
        );
      } else if (typeDate === "monthPicker") {
        return (
          <DatePicker.MonthPicker
            style={{ width: "100%" }}
            onChange={handleOnChange}
            onBlur={input.onBlur}
            id={idComponent}
            disabled={disabled}
            disabledDate={disabledDate}
            defaultValue={customDefaultValue}
            className={className}
            {...input}
          />
        );
      }
      return null;
    }
    return null;
  };

  if (isFormItem) {
    return (
      <Form.Item
        validateStatus={handleFeedBack(error, "error", showError)}
        help={handleFeedBack(error, error, showError)}
        label={labelTitle}
        labelCol={labelcol}
        colon={colon || false}
        style={formItemStyle}
      >
        {renderPicker()}
      </Form.Item>
    );
  } else {
    return renderPicker();
  }
};
