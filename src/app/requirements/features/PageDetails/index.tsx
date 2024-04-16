import React, {memo, useState} from "react";
import {Center, Flexbox} from "react-layout-kit";
import TagList from "../TagList";
import CommentList from "@/app/requirements/features/CommentList";
import {Button, Drawer, Form, Input, Space} from "antd";
import {FireOutlined, HeartOutlined, LikeOutlined, SendOutlined} from "@ant-design/icons";
import {useCustomStore} from "@/store/custom";
import {Markdown} from "@lobehub/ui";

const PageDetails = memo(() => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [value, setValue] = useState('');
  const [isLogin, login, pointDetail, addComment] = useCustomStore((s) => [s.isLogin, s.login, s.point, s.addComment]);

  const [form] = Form.useForm();

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

  return (
    <>
      <Flexbox gap={8} style={{paddingLeft: '16px', paddingRight: '16px'}}>
        <Center style={{fontSize: '24px', fontWeight: '600'}}>{pointDetail.title}</Center>
        <Markdown fullFeaturedCodeBlock variant={'chat'}>
          {pointDetail.content}
        </Markdown>
        <TagList tags={pointDetail.tags} />
        <Flexbox gap={8} horizontal style={{marginTop: '32px'}}>
          <Button type="primary" icon={<FireOutlined />}>
            需要 20
          </Button>
          <Button type="text" icon={<SendOutlined />}>
            分享
          </Button>
          <Button type="text" icon={<HeartOutlined />}>
            收藏
          </Button>
          <Button type="text" icon={<LikeOutlined />}>
            点赞
          </Button>
        </Flexbox>
        <span style={{marginTop: '32px', fontSize: '24px', fontWeight: '400'}}>留言区</span>
        <Flexbox gap={24}>
          <Space.Compact style={{width: '100%'}}>
            <Input value={value} onChange={handleChange} />
            <Button type='primary' onClick={handleSubmit} loading={loading}>发表</Button>
          </Space.Compact>
          <CommentList />
        </Flexbox>
      </Flexbox>
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
