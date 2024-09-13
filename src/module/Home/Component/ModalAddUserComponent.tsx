import {Button, Divider, Form as FormANTD} from "antd"
import { Field, Form } from 'react-final-form'

import { IListUserDAO } from "../DAO/listUser.dao"
import Input from 'component/Input'
import Modal from 'component/Modal'
import ModalAddUserValidation from "../Validation/ModalAddUserValidation"
import React from 'react'

interface IProps {
  onClose: () => void
  handleSubmit : (_val: any) => void
  initialValues: IListUserDAO
}
export default function ModalAddUserComponent(props: IProps) {
  const { onClose, handleSubmit , initialValues} = props
  return (
    <Modal footer={null} open onCancel={onClose} title="Tambah / Edit User" width={600} >
          <Form keepDirtyOnReinitialize
            onSubmit={handleSubmit}
            validate={ModalAddUserValidation}
            subscription={{ values: false }}
            initialValues={initialValues}
          >
            {(formProps) => {
              const { handleSubmit, invalid, dirty } = formProps
              return (
                <FormANTD
                  layout="vertical"
                  // wrapperCol={{ span: 23 }}
                  onFinish={handleSubmit}
                >
                  <div
                    className={`flex`}
                  >
                    <div className="basis-full bg-gray-50 rounded-lg px-3">
                      <Divider>Informasi Data User</Divider>
                      <Field
                        name="name"
                        component={Input}
                        label="Nama Lengkap"
                        placholder="Masukan Nama Lengkap"
                        isFormItem
                        showError={dirty}
                        allowClear
                      />
                      <Field
                        name="job"
                        component={Input}
                        label="Pekerjaan"
                        placholder="Masukan Pekerjaan"
                        isFormItem
                        showError={dirty}
                        allowClear
                      />
                    </div>
                  </div>
                  <div className="flex justify-center">
                     <Button
                      type="primary"
                      size="middle"
                      htmlType="submit"
                      disabled={invalid}
                    >
                      Submit
                    </Button>
                  </div>
                </FormANTD>
              )
            }}
          </Form>
    </Modal>
  )
}
