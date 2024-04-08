import {Icon} from '@lobehub/ui';
import {Button, Drawer, Dropdown, Form, Input, Space} from 'antd';
import {createStyles} from 'antd-style';
import {
  ChevronUp,
  CornerDownLeft,
  LucideCheck,
  LucideChevronDown,
  LucideCommand,
  LucidePlus,
} from 'lucide-react';
import {rgba} from 'polished';
import {memo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Center, Flexbox} from 'react-layout-kit';

import StopLoadingIcon from '@/components/StopLoading';
// import SaveTopic from '@/features/ChatInput/Topic';
import {useSendMessage} from '@/features/ChatInput/useSend';
import {useChatStore} from '@/store/chat';
import {useGlobalStore} from '@/store/global';
import {modelProviderSelectors, preferenceSelectors} from '@/store/global/selectors';
import {useSessionStore} from '@/store/session';
import {agentSelectors} from '@/store/session/selectors';
import {isMacOS} from '@/utils/platform';

import DragUpload from './DragUpload';
import {LocalFiles} from './LocalFiles';
import {useCustomStore} from "@/store/custom";

const useStyles = createStyles(({css, prefixCls, token}) => {
  return {
    arrow: css`
      &.${prefixCls}-btn.${prefixCls}-btn-icon-only {
        width: 28px;
      }
    `,
    loadingButton: css`
      display: flex;
      align-items: center;
    `,
    overrideAntdIcon: css`
      .${prefixCls}-btn.${prefixCls}-btn-icon-only {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .${prefixCls}-btn.${prefixCls}-dropdown-trigger {
        &::before {
          background-color: ${rgba(token.colorBgLayout, 0.1)} !important;
        }
      }
    `,
  };
});

const isMac = isMacOS();

const Footer = memo<{ setExpand?: (expand: boolean) => void }>(({setExpand}) => {
  const {t} = useTranslation('chat');
  const [isLogin, login] = useCustomStore((s) => [s.isLogin, s.login]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const {theme, styles} = useStyles();

  const [loading, stopGenerateMessage] = useChatStore((s) => [
    !!s.chatLoadingId,
    s.stopGenerateMessage,
  ]);
  const [useCmdEnterToSend, updatePreference] = useGlobalStore((s) => [
    preferenceSelectors.useCmdEnterToSend(s),
    s.updatePreference,
  ]);

  const model = useSessionStore(agentSelectors.currentAgentModel);
  const canUpload = useGlobalStore(modelProviderSelectors.modelEnabledUpload(model));

  const sendMessage = useSendMessage();

  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then(async () => {
      setConfirmLoading(true);
      login(form.getFieldsValue()).then(() => {
        setOpen(false);
      }).finally(() => setConfirmLoading(false))
    })
  };

  const cmdEnter = (
    <Flexbox gap={2} horizontal>
      <Icon icon={isMac ? LucideCommand : ChevronUp} />
      <Icon icon={CornerDownLeft} />
    </Flexbox>
  );

  const enter = (
    <Center>
      <Icon icon={CornerDownLeft} />
    </Center>
  );

  const sendShortcut = useCmdEnterToSend ? cmdEnter : enter;

  const wrapperShortcut = useCmdEnterToSend ? enter : cmdEnter;

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
          {/*<Form.Item label="验证码" name="code" rules={[{required: true}, {type: 'string', len: 4}]}>*/}
          {/*  <Input maxLength={4} type={'number'} />*/}
          {/*</Form.Item>*/}
        </Form>
      </Drawer>
      <Flexbox
        align={'end'}
        className={styles.overrideAntdIcon}
        distribution={'space-between'}
        flex={'none'}
        gap={8}
        horizontal
        padding={'0 24px'}
      >
        <Flexbox align={'center'} gap={8} horizontal>
          {canUpload && (
            <>
              <DragUpload />
              <LocalFiles />
            </>
          )}
        </Flexbox>
        <Flexbox align={'center'} gap={8} horizontal>
          <Flexbox
            gap={4}
            horizontal
            style={{color: theme.colorTextDescription, fontSize: 12, marginRight: 12}}
          >
            {sendShortcut}
            <span>{t('input.send')}</span>
            <span>/</span>
            {wrapperShortcut}
            <span>{t('input.warp')}</span>
          </Flexbox>
          {/*<SaveTopic />*/}
          <Flexbox style={{minWidth: 92}}>
            {loading ? (
              <Button
                className={styles.loadingButton}
                icon={<StopLoadingIcon />}
                onClick={stopGenerateMessage}
              >
                {t('input.stop')}
              </Button>
            ) : (
              <Space.Compact>
                <Button
                  onClick={() => {
                    if (!isLogin) {
                      setOpen(true);
                    } else {
                      sendMessage();
                      setExpand?.(false);
                    }
                  }}
                  type={'primary'}
                >
                  {t('input.send')}
                </Button>
                <Dropdown
                  menu={{
                    items: [
                      {
                        icon: !useCmdEnterToSend ? <Icon icon={LucideCheck} /> : <div />,
                        key: 'sendWithEnter',
                        label: t('input.sendWithEnter'),
                        onClick: () => {
                          updatePreference({useCmdEnterToSend: false});
                        },
                      },
                      {
                        icon: useCmdEnterToSend ? <Icon icon={LucideCheck} /> : <div />,
                        key: 'sendWithCmdEnter',
                        label: t('input.sendWithCmdEnter', {
                          meta: isMac ? 'Cmd' : 'Ctrl',
                        }),
                        onClick: () => {
                          updatePreference({useCmdEnterToSend: true});
                        },
                      },
                      {type: 'divider'},
                      {
                        icon: <Icon icon={LucidePlus} />,
                        key: 'onlyAdd',
                        label: t('input.onlyAdd'),
                        onClick: () => {
                          sendMessage(true);
                        },
                      },
                    ],
                  }}
                  placement={'topRight'}
                  trigger={['hover']}
                >
                  <Button
                    aria-label={t('input.more')}
                    className={styles.arrow}
                    icon={<Icon icon={LucideChevronDown} />}
                    type={'primary'}
                  />
                </Dropdown>
              </Space.Compact>
            )}
          </Flexbox>
        </Flexbox>
      </Flexbox>
    </>
  );
});

export default Footer;
