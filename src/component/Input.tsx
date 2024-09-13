import { Form, Input as InputANTD, InputNumber, InputProps } from "antd";
import React, { ChangeEvent } from "react";

import handleFeedBack from "helper/handleFeedback";

interface IInput extends InputProps {
  colon?: boolean;
  disabled?: boolean;
  enterButton?: any;
  formatter: any;
  input: any;
  inputNumber?: boolean;
  inputRef?: any;
  isFormItem?: boolean;
  isPassword?: boolean;
  isSearch?: boolean;
  label?: string;
  meta: { error: string; touched: boolean };
  onChange?: (_vals: any) => void;
  onSearch?: (_vals: string) => void;
  parser: any;
  preventCharacter?: boolean;
  showError?: boolean;
  textArea?: boolean;
  prefix?: React.ReactNode;
}

export default function Input(props: IInput) {
  const {
    colon,
    addonAfter,
    autoComplete,
    className,
    disabled,
    enterButton,
    formatter,
    input,
    inputNumber,
    inputRef,
    isFormItem,
    isPassword,
    isSearch,
    label,
    max,
    maxLength,
    meta: { error },
    min,
    onChange,
    onSearch,
    parser,
    placeholder,
    preventCharacter,
    showError,
    size,
    textArea,
    prefix,
  } = props;

  const combinedProps = {
    placeholder,
    className,
    disabled,
    min,
    max,
    size,
    prefix,
    autoComplete: autoComplete,
    maxLength,
    ...input,
    ...props,
  };

  delete combinedProps.isFormItem;
  delete combinedProps.showError;
  delete combinedProps.textArea;

  if (onChange) {
    const handleOnChange = (vals: ChangeEvent<HTMLInputElement>) => {
      input.onChange(vals);
      onChange(vals);
    };
    combinedProps.onChange = handleOnChange;
  }

  function RenderInput() {
    if (isPassword) {
      return <InputANTD.Password ref={inputRef} {...combinedProps} />;
    } else if (textArea) {
      return <InputANTD.TextArea ref={inputRef} {...combinedProps} rows={5} />;
    } else if (isSearch) {
      return (
        <InputANTD.Search
          ref={inputRef}
          {...combinedProps}
          enterButton={enterButton}
          onSearch={onSearch}
        />
      );
    } else if (inputNumber && preventCharacter) {
      return (
        <input
          type="number"
          ref={inputRef}
          {...combinedProps}
          addonAfter={addonAfter}
        />
      );
    } else if (inputNumber) {
      return (
        <InputNumber
          ref={inputRef}
          {...combinedProps}
          formatter={formatter}
          parser={parser}
          addonAfter={addonAfter}
        />
      );
    }
    return (
      <InputANTD ref={inputRef} {...combinedProps} addonAfter={addonAfter}/>
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
