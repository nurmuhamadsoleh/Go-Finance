import { Checkbox as CheckboxANTD, Form } from "antd";

import handleFeedBack from "helper/handleFeedback";

interface IChecbox {
  autoFocus?: boolean;
  className?: string;
  colon?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  input: any;
  inputRef?: any;
  isFormItem?: boolean;
  isGroup?: boolean;
  label?: string;
  meta: { error: string };
  onChange?: (_value: any) => void;
  placeholder?: string;
  showError?: boolean;
  optionData?: any[];
  extra?: any;
}

export default function Checkbox(props: IChecbox) {
  const {
    className,
    colon,
    defaultChecked,
    disabled,
    input,
    inputRef,
    isFormItem,
    isGroup,
    label,
    meta: { error },
    onChange,
    placeholder,
    showError,
    optionData,
    extra,
  } = props;

  const combinedProps = {
    placeholder,
    className,
    disabled,
    onChange: (e: any) => {
      if (isGroup) {
        input.onChange(e);
        onChange && onChange(e);
      } else {
        input.onChange(e.target.checked);
        onChange && onChange(e.target.checked);
      }
    },
    checked: input.value,
    value: input.value,
    defaultChecked,
    options: optionData,
  };

  function RenderInput() {
    return isGroup ? (
      <>
        <CheckboxANTD.Group ref={inputRef} {...combinedProps} />
      </>
    ) : (
      <div className="flex">
        <CheckboxANTD ref={inputRef} {...combinedProps} checked={input.value} />
        {!isFormItem && label && <span className="ml-2">{label}</span>}
        {extra}
      </div>
    );
  }

  if (isFormItem) {
    return (
      <Form.Item
        label={label && <b className="font-poppinsSemiBold">{label}</b>}
        colon={colon || false}
        validateStatus={handleFeedBack(error, "error", showError)}
        help={handleFeedBack(error, error, showError)}
      >
        {RenderInput()}
      </Form.Item>
    );
  }
  return RenderInput();
}
