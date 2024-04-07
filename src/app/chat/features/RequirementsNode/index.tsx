import {Button, Drawer, Empty, Form, Input, Skeleton, Space, Steps, Tag} from 'antd';
import {memo, useState} from "react";
import {Flexbox} from "react-layout-kit";
import {useCustomStore} from "@/store/custom";
import {DollarOutlined, PoweroffOutlined, TeamOutlined, UserSwitchOutlined} from "@ant-design/icons";
import {useChatStore} from "@/store/chat";
import TagList from "@/app/requirements/features/TagList";
import {Markdown} from "@lobehub/ui";

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
          const node1 = <Flexbox horizontal align={'center'} gap={8}>
            <span style={{fontWeight: '600'}}>{point.title}</span>
            <Tag color={'orange'}>进行中</Tag>
          </Flexbox>
          const desc = <Flexbox gap={8}>
            <Markdown fullFeaturedCodeBlock variant={'chat'} style={{maxHeight: '256px'}}>
              {point.content}
            </Markdown>
            <TagList tags={point.tags} />
            <Flexbox flex={1} justify={'space-between'} horizontal style={{marginTop: '8px'}}>
              <Button disabled={true} size={'small'} icon={<UserSwitchOutlined />}>合作意向</Button>
              <Button disabled={true} size={'small'} icon={<TeamOutlined />}>推荐合作</Button>
            </Flexbox>
          </Flexbox>
          return ({key: point.title, title: node1, description: desc, status: 'process', icon: <DollarOutlined />})
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
