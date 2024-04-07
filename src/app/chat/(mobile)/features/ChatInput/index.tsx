import {MobileChatInputArea, MobileChatSendButton} from '@lobehub/ui';
import {useTheme} from 'antd-style';
import {memo, useState} from 'react';
import {useTranslation} from 'react-i18next';

// import ActionBar from '@/features/ChatInput/ActionBar';
// import STT from '@/features/ChatInput/STT';
// import SaveTopic from '@/features/ChatInput/Topic';
import {useChatInput} from '@/features/ChatInput/useChatInput';
import {Button, Drawer, Form, Input, Space} from "antd";
import {useCustomStore} from "@/store/custom";

// import Files from './Files';

const ChatInputMobileLayout = memo(() => {
  const {t} = useTranslation('chat');
  const theme = useTheme();
  const {ref, onSend, loading, value, onInput, onStop, expand, setExpand} = useChatInput();
  const [isLogin, login] = useCustomStore((s) => [s.isLogin, s.login]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then(async () => {
      setConfirmLoading(true);
      login(form.getFieldsValue()).then(() => {
        setOpen(false);
      }).finally(() => setConfirmLoading(false))
    })
  };

  const send = () => {
    if (!isLogin) setOpen(true);
    else onSend();
  }

  return (
    <>
      <Drawer
        title="用户登录"
        open={open}
        placement={'bottom'}
        onClose={() => setOpen(false)}
        extra={
          <Space>
            <Button onClick={() => setOpen(false)}>取消</Button>
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
      <MobileChatInputArea
        expand={expand}
        loading={loading}
        onInput={onInput}
        onSend={send}
        placeholder={t('sendPlaceholder')}
        ref={ref}
        setExpand={setExpand}
        style={{
          background: `linear-gradient(to bottom, ${theme.colorFillQuaternary}, transparent)`,
          width: '100vw',
        }}
        // textAreaLeftAddons={<STT mobile />}
        textAreaRightAddons={
          <MobileChatSendButton loading={loading} onSend={onSend} onStop={onStop} />
        }
        // topAddons={
        //   <>
        //     <Files />
        //     <ActionBar mobile padding={'0 8px'} rightAreaStartRender={<SaveTopic mobile />} />
        //   </>
        // }
        value={value}
      />
    </>
  );
});

export default ChatInputMobileLayout;
