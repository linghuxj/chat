'use client';

import dynamic from 'next/dynamic';
import {memo, useEffect, useState} from 'react';
import {Flexbox} from 'react-layout-kit';

import ChatHeader from '@/app/chat/(mobile)/features/ChatHeader';
import Conversation from '@/features/Conversation';
import AppLayoutMobile from '@/layout/AppLayout.mobile';
import {useSessionStore} from '@/store/session';

import TelemetryNotification from '../../features/TelemetryNotification';
import ChatInput from '../features/ChatInput';
import {useCustomStore} from "@/store/custom";
import {Button, Drawer, Form, Input, Space} from "antd";

const TopicList = dynamic(() => import('../features/TopicList'));

const Chat = memo(() => {
  // due to mobile side don't have sessionList, so we need to fetch sessions here
  // refs: https://github.com/lobehub/lobe-chat/pull/541
  const useFetchSessions = useSessionStore((s) => s.useFetchSessions);
  useFetchSessions();

  const [isLogin, login] = useCustomStore((s) => [s.isLogin, s.login]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    if (!open) setOpen(!isLogin);
  })

  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then(async () => {
      setConfirmLoading(true);
      login(form.getFieldsValue()).then(() => {
        setOpen(false);
      }).finally(() => setConfirmLoading(false))
    })
  };

  return (
    <AppLayoutMobile navBar={<ChatHeader />}>
      <Flexbox height={'calc(100% - 44px)'} horizontal>
        <Conversation chatInput={<ChatInput />} mobile />
        <TopicList />
        <TelemetryNotification mobile />
        <Drawer
          title="用户登录"
          open={open}
          placement={'bottom'}
          extra={
            <Space>
              <Button loading={confirmLoading} onClick={handleOk} type="primary">登录</Button>
            </Space>
          }
        >
          <Form
            form={form}
            labelCol={{flex: '80px'}}
            labelAlign="right"
            labelWrap
            wrapperCol={{flex: 1}}
            colon={false}
          >
            <Form.Item label="手机号" name="username" rules={[{required: true}, {type: 'string', len: 11}]}>
              <Input maxLength={11} type={'number'} />
            </Form.Item>
            <Form.Item label="验证码" name="code" rules={[{required: true}, {type: 'string', len: 4}]}>
              <Input maxLength={4} type={'number'} />
            </Form.Item>
          </Form>
        </Drawer>
      </Flexbox>
    </AppLayoutMobile>
  );
});
export default Chat;
