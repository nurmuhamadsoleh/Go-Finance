import { Button, Form as FormANTD } from "antd";
import { Field, Form } from "react-final-form";
import { LockFilled, MailOutlined, UserOutlined } from '@ant-design/icons';

import Input from "component/Input";
import React from "react";
import RegisterValidation from "../Validation/RegisterValidation";
import { useRouter } from 'next/router'

interface IProps {
  handleSubmit: (_val:any) => void;
  isLoading: boolean;
}

export default function RegisterComponent(props: IProps) {
  const { handleSubmit, isLoading } = props;
  const router = useRouter()
  return (
    <main className="min-h-screen w-full flex flex-col md:flex-row">
      <section className="bg-gradient-to-bl from-[#0575E6] via-[#02298A] to-[#021B79] w-full md:w-3/5 flex items-center justify-center md:justify-start md:px-40 py-8 md:py-0">
        <div className="text-center px-0 md:text-left leading-none">
          <h1 className="font-bold text-5xl text-white">GoFinance</h1>
          <p className="text-white text-2xl">Lorem ipsum dolor sit amet</p>
          <Button className="btn" size="middle" onClick={()=> router.replace("/register")}>
            Read More
          </Button>
        </div>
      </section>
      <section className="bg-white w-full md:w-2/5 justify-center flex items-center md:py-0">
         <Form onSubmit={handleSubmit} validate={RegisterValidation}>
            {(formProps) => {
              const { handleSubmit, invalid, dirty, form } = formProps;
              if(isLoading){
                form.change('fullname', '')
                form.change('email', '')
                form.change('password', '')
              }
              return (
                <div className="text-center md:text-left leading-none max-w-screen !px-0 md:px-4">
                  <FormANTD layout="vertical" onFinish={handleSubmit} className="md:pl-4">
                  <h1 className="text-black font-bold text-2xl md:text-3xl">Hello !</h1>
                  <p>Sign Up to Get Started</p>
                   <div className="md:pl-4">
                      <div className="mt-8 md:mt-8">
                        <Field
                          name="fullname"
                          component={Input}
                          isFormItem
                          prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                          placeholder="Full Name"
                          className="w-full"
                          showError={dirty}
                        />
                      </div>
                      <div className="mt-3">
                      <Field
                        name="email"
                        component={Input}
                        isFormItem
                        prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Email Address"
                        className="w-full"
                        showError={dirty}
                      />
                      </div>
                      <div className="mt-3">
                        <Field
                        name="password"
                        component={Input}
                        type="password"
                        isFormItem
                        prefix={<LockFilled style={{ color: 'rgba(0,0,0,.25)' }} />}
                        className="w-full"
                        placeholder="Password"
                        showError={dirty}
                        isPassword
                      />
                      </div>
                    </div>
                    <div className="flex justify-start md:mx-auto">
                      <Button
                        className="btn w-full h-10 !text-white"
                        size="middle"
                        htmlType="submit"
                        disabled={invalid}
                        loading={isLoading}
                      >
                        Regiter
                      </Button>
                    </div>
                </FormANTD>
                </div>
              );
            }}
          </Form>
      </section>
    </main>

  );
}
