import React, {memo, useState} from "react";
import {Center, Flexbox} from "react-layout-kit";
import TagList from "../TagList";
import CommentList from "@/app/requirements/features/CommentList";
import {Button, Drawer, Form, Input, Space} from "antd";
import {
  CommentOutlined,
  LikeOutlined,
  StarOutlined,
  WechatOutlined
} from "@ant-design/icons";
import {useCustomStore} from "@/store/custom";
import {Markdown} from "@lobehub/ui";
import SafeSpacing from "@/components/SafeSpacing";
import Link from "next/link";
import {useTheme} from "antd-style";

const PageDetails = memo(() => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [value, setValue] = useState('');
  const [isLogin, login, pointDetail, addComment] = useCustomStore((s) => [s.isLogin, s.login, s.point, s.addComment]);

  const [form] = Form.useForm();
  const theme = useTheme();

  const handleOk = () => {
    form.validateFields().then(async () => {
      setConfirmLoading(true);
      login(form.getFieldsValue()).then(() => {
        addCommentWithLogin(value);
        setOpen(false);
      }).finally(() => setConfirmLoading(false))
    })
  };

  const handleSubmit = () => {
    if (!value || value === '') return;

    if (!isLogin) {
      setOpen(true);
      return;
    }

    addCommentWithLogin(value);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  }

  const addCommentWithLogin = (content: string) => {
    setLoading(true);
    addComment(content, pointDetail.id).then(() => setTimeout(() => setValue(''), 200)).finally(() => setLoading(false));
  }

  const IconText = ({icon, text}: any) => (
    <Button type={'link'}>
      {React.createElement(icon)}
      {text}
    </Button>
  );

  return (
    <>
      <Flexbox flex={1}>
        <Flexbox gap={8} style={{paddingLeft: '16px', paddingRight: '16px'}}>
          <Center style={{fontSize: '24px', fontWeight: '600'}}>{pointDetail.title}</Center>
          <Markdown fullFeaturedCodeBlock variant={'chat'}>
            {pointDetail.content}
          </Markdown>
          <TagList tags={pointDetail.tags} />
          <CommentList />
        </Flexbox>
      </Flexbox>
      <>
        <SafeSpacing mobile={true} height={86} />
        <Flexbox gap={4} style={{
          position: 'fixed',
          zIndex: 100,
          bottom: 0,
          left: 0,
          right: 0,
          padding: '4px 16px 4px 16px',
          background: theme.colorBgLayout
        }}>
          <Space.Compact>
            <Input value={value} onChange={handleChange} placeholder={'请留下您的合作意向、意见以及建议...'}/>
            <Button type='primary' onClick={handleSubmit} loading={loading}>发表</Button>
          </Space.Compact>
          <Flexbox horizontal justify={'space-between'}>
            <IconText icon={WechatOutlined} text="分享" />
            <IconText icon={LikeOutlined} text="156" />
            <IconText icon={CommentOutlined} text="2" />
            <IconText icon={StarOutlined} text="2" />
          </Flexbox>
        </Flexbox>
      </>
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
          style={{maxWidth: 480}}
        >
          <Form.Item label="手机号" name="username" rules={[{required: true}, {type: 'string', len: 11}]}>
            <Input maxLength={11} type={'number'} />
          </Form.Item>
          {/*<Form.Item label="验证码" name="code" rules={[{required: true}, {type: 'string', len: 4}]}>*/}
          {/*  <Input maxLength={4} type={'number'} />*/}
          {/*</Form.Item>*/}
        </Form>
      </Drawer>
    </>
  )
})

export default PageDetails;
