import {Button, Empty, Form, Input, Skeleton, Steps, Tag} from 'antd';
import {memo, useState} from "react";
import {Flexbox} from "react-layout-kit";
import {useCustomStore} from "@/store/custom";
import {PoweroffOutlined} from "@ant-design/icons";
import {Modal} from "@lobehub/ui";
import {customService} from "@/services/custom";
import {useChatStore} from "@/store/chat";

const RequirementsNode = memo(() => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isLogin, login, initPoint, points, requestPoints] = useCustomStore((s) =>
    [s.isLogin, s.login, s.initPoints, s.points, s.getPoints])
  const [sessionId, topicId] = useChatStore((s) => [s.activeId, s.activeTopicId])

  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then(async () => {
      setConfirmLoading(true);
      login(form.getFieldsValue()).then(() => {
        requestPoints(sessionId, topicId).then();
        setOpen(false);
      }).finally(() => setConfirmLoading(false))
    })
  };

  if (!isLogin) return (<>
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
    <Flexbox align={'center'} justify={'center'} height={'100%'}>
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{height: 60}}
        description={<span>登录查看更多内容</span>}
      >
        <Button type="primary" icon={<PoweroffOutlined />} onClick={() => setOpen(true)}>点击登录</Button>
      </Empty>
    </Flexbox>
  </>);

  return !initPoint ? <Flexbox style={{padding: '16px'}}>
      <Skeleton loading={true} active avatar />
    </Flexbox> :
    (points.length > 0 ? <Flexbox style={{padding: '16px'}}>
      <Steps
        direction="vertical"
        items={points.map((point) => {
          const node1 = <Flexbox horizontal align={'center'} justify={'center'} gap={8}>
            <div>{point.title}</div>
            <Tag color={'blue'}>需求</Tag>
          </Flexbox>
          const desc = <Flexbox>
            {point.content}
            <Button disabled={true}>暂无建议方案</Button>
          </Flexbox>
          return ({key: point.title, title: node1, description: desc, status: 'process'})
        })}
      />
    </Flexbox> : <Flexbox align={'center'} justify={'center'} height={'100%'}>
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{height: 60}}
        description={<span>暂无商机内容</span>} />
    </Flexbox>)
});

export default RequirementsNode;
