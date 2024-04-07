import {memo, useState} from "react";
import {Center, Flexbox} from "react-layout-kit";
import TagList from "../TagList";
import CommentList from "@/app/requirements/features/CommentList";
import {Button, Form, Input} from "antd";
import {FireOutlined, HeartOutlined, LikeOutlined, SendOutlined} from "@ant-design/icons";
import {useCustomStore} from "@/store/custom";
import {SearchProps} from "antd/es/input";
import {Modal} from "@lobehub/ui";

const {Search} = Input

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

  const handleSubmit: SearchProps['onSearch'] = (content, _e, info) => {
    if (!content || content === '') return;

    if (!isLogin) {
      setValue(content);
      setOpen(true);
      return;
    }

    addCommentWithLogin(content);
  }

  const addCommentWithLogin = (content: string) => {
    setLoading(true);
    addComment(content, pointDetail.id).finally(() => setLoading(false));
  }

  return (
    <>
      <Flexbox gap={16} style={{padding: '16px', width: '100%'}}>
        <Center style={{fontSize: '24px', fontWeight: '600'}}>{pointDetail.title}</Center>
        {pointDetail.content}
        <TagList />
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
        <div style={{marginTop: '32px', fontSize: '24px', fontWeight: '400'}}>留言区</div>
        <Flexbox gap={24}>
          <Search placeholder={'赶紧留下你的方案吧...'} enterButton={'发表'} onSearch={handleSubmit} loading={loading}
                  allowClear />
          <CommentList />
        </Flexbox>
      </Flexbox>
      <Modal
        title="用户登录"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={() => setOpen(false)}
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
          <Form.Item label="验证码" name="code" rules={[{required: true}, {type: 'string', len: 4}]}>
            <Input maxLength={4} type={'number'} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
})

export default PageDetails;
