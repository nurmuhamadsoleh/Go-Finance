/* eslint-disable react-hooks/exhaustive-deps */

import { Dashboard, useUppy } from "@uppy/react";
import React, { Fragment, useEffect } from "react";

import FormItem from "antd/lib/form/FormItem";
import ImageEditor from "@uppy/image-editor";
// @ts-ignore
import Uppy from "@uppy/core";
import handleFeedBack from "helper/handleFeedback";
import { useForm } from "react-final-form";

interface IProps {
  meta?: any;
  label?: any;
  uppyConfig?: any;
  height?: any;
  labelKey?: any;
  input?: any;
  actionDispatch?: any;
  actionDeleteDispatch?: any;
  paramsDispatch?: any;
  useFile?: boolean;
  additionalOnchange?: any;
  disabled?: any;
  showError?: boolean;
  useImageEditor?: boolean;
}
const InputFile = (props: IProps) => {
  const {
    meta,
    label,
    uppyConfig,
    height,
    labelKey,
    input,
    paramsDispatch,
    useFile,
    additionalOnchange,
    actionDeleteDispatch,
    disabled,
    showError,
    useImageEditor,
  } = props;
  const { error } = meta;
  const { maxFile, allowedFile, maxSize, minFile } = uppyConfig;

  const formAPI = useForm();
  const formValue = formAPI.getState().values;
  const uppyInput: any = useUppy(() => {
    const uppy = new Uppy({
      id: input?.name,
      autoProceed: true,
      restrictions: {
        minNumberOfFiles: minFile,
        maxNumberOfFiles: maxFile,
        allowedFileTypes: allowedFile,
        maxFileSize: maxSize,
      },
    });
    if (useImageEditor) {
      uppy
        .use(ImageEditor, {
          cropperOptions: {
            viewMode: 1,
            background: false,
            autoCropArea: 1,
            responsive: true,
            croppedCanvasOptions: {},
          },
          actions: {
            revert: true,
            rotate: true,
            granularRotate: true,
            flip: true,
            zoomIn: true,
            zoomOut: true,
            cropSquare: true,
            cropWidescreen: true,
            cropWidescreenVertical: true,
          },
        })
        .use(ImageEditor, { id: "MyImageEditor" });
    }
    return uppy;
  });

  useEffect(() => {
    const fileArr = [];
    const filesContainer = uppyInput.store.state.files;

    for (const key in filesContainer) {
      if (Object.prototype.hasOwnProperty.call(filesContainer, key)) {
        const element = filesContainer[key];
        const file = element.data;
        const handleFile = useFile === true ? file : undefined;
        fileArr.push({
          ...additionalOnchange,
          ...handleFile,
          file: file,
          name: element.name,
          label: labelKey,
        });
      }
    }
    input.onChange(fileArr.length > 1 ? fileArr : fileArr[0]);
  }, [uppyInput.store.state.files]);

  uppyInput.on("file-removed", (file: any) => {
    if (input.value instanceof Array) {
      const tempData = [...input.value];
      const filteredData = tempData.filter((val) => {
        return val.name !== file.name;
      });
      input.onChange(filteredData);
    } else {
      input.onChange(null);
    }
    if (actionDeleteDispatch) {
      actionDeleteDispatch(file, formValue, { ...paramsDispatch });
    }
  });

  uppyInput.on("file-editor:complete", (file: any) => {
    input.onChange(file);
  });

  return (
    <Fragment>
      <FormItem
        validateStatus={handleFeedBack(error, "error", showError)}
        help={handleFeedBack(error, error, showError)}
        label={label && <b className="font-poppinsSemiBold">{label}</b>}
        colon={false}
      >
        <Dashboard
          uppy={uppyInput}
          width={"100%"}
          height={height ? height : 150}
          hideUploadButton={true}
          proudlyDisplayPoweredByUppy={false}
          disabled={disabled}
          plugins={["ImageEditor"]}
        />
      </FormItem>
    </Fragment>
  );
};
export default React.memo(InputFile);
