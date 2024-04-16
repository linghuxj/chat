import {API_BACKEND_ENDPOINTS} from "@/services/_url";
import {ChatMessage} from "@/types/message";
import {getMessageError} from "@/utils/fetch";
import {Login, Point} from "@/types/custom";
import {customSelectors, useCustomStore} from "@/store/custom";

export interface PointParams {
  title: string,
  content: string,
  tags?: string,
  sessionId: string,
  topicId: string | undefined
}

/**
 * 后台相关接口业务
 */
class CustomService {

  // 保存AI对话消息内容，无须确认是否保存成功
  saveMessage = (message?: ChatMessage) => {
    if (!message) return;
    const loginToken = customSelectors.getLoginToken(useCustomStore.getState());

    fetch(API_BACKEND_ENDPOINTS.saveMessage(), {
      body: JSON.stringify(message),
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + loginToken}
    }).then().catch(e => console.error(e))
  }

  // 后台账号登录
  login = async (username: string, code: string): Promise<Login> => {
    const res = await fetch(API_BACKEND_ENDPOINTS.login(), {
      body: JSON.stringify({username: username, code: code}),
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    })

    if (!res.ok) throw await getMessageError(res);

    return res.json();
  }

  // 保存AI解析的商机点列表
  savePoints = async (params: PointParams[]) => {
    const loginToken = customSelectors.getLoginToken(useCustomStore.getState());
    const res = await fetch(API_BACKEND_ENDPOINTS.savePoints(), {
      body: JSON.stringify(params),
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + loginToken}
    })

    if (!res.ok) throw await getMessageError(res);

    return res.json();
  }

  // 获取AI解析的商机点列表
  getPoints = async (sessionId: string | undefined | null, topicId: string | undefined | null) => {
    let param = `?1=1`;
    if (null != sessionId && sessionId) param += `&sessionId=${sessionId}`;
    if (null != topicId && topicId) param += `&topicId=${topicId}`;
    const res = await fetch(API_BACKEND_ENDPOINTS.getPoints() + param, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })

    if (!res.ok) throw await getMessageError(res);

    return res.json();
  }

  // 查看商机详情
  getPointDetail = async (id: number) => {
    const res = await fetch(API_BACKEND_ENDPOINTS.pointDetail(id), {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })

    if (!res.ok) throw await getMessageError(res);

    return res.json();
  }

  // 分页获取商机留言列表信息
  getComments = async (pointId: number) => {
    const res = await fetch(API_BACKEND_ENDPOINTS.getComments() + `?requireId=${pointId}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })

    if (!res.ok) throw await getMessageError(res);

    return res.json();
  }

  // 提交留言
  addComment = async (requireId: number, content: string) => {
    const loginToken = customSelectors.getLoginToken(useCustomStore.getState());
    const res = await fetch(API_BACKEND_ENDPOINTS.addComment(), {
      body: JSON.stringify({requireId, content}),
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + loginToken}
    })

    if (!res.ok) throw await getMessageError(res);

    return res.json();
  }

  // 获取商机推荐解决方案列表信息
  getPlans = async (pointId: number) => {
    const res = await fetch(API_BACKEND_ENDPOINTS.getPlans() + `?requireId=${pointId}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })

    if (!res.ok) throw await getMessageError(res);

    return res.json();
  }

  // 将当前对话的AI历史信息传递给后台进行总结提炼，并确定是否生成商机内容
  summaryMessages = async (sessionId: string | undefined, topicId: string | undefined, messages: any) => {
    const loginToken = customSelectors.getLoginToken(useCustomStore.getState());
    messages.push({
      'role': 'user',
      'content': "判断是否AI已正常提供相应的答案或解决方案。如果是否，则回答：False。如果是则提炼总结提供的相应答案或解决方案，使用JSON格式输出内容，其中包含3个字段：title、content、tags，其中content字段的内容为：提取的标准方案内容，内容为完整的Markdown格式，并在每一个内容块中判断是否需要第三方企业、其他个人或者银行协助，如需要则表明协助的内容。内容模版如下：{'title':'标题','content':'内容','tags':['主要关键词','相关关键词1','相关关键词2']}，请严格使用上述模版生成Json内容。"
    })
    const res = await fetch(API_BACKEND_ENDPOINTS.summaryMessages(), {
      body: JSON.stringify({sessionId, topicId, messages}),
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + loginToken}
    })

    if (!res.ok) throw await getMessageError(res);

    return res.json();
  }

  // 统计部分数据
  statistics = async (day: number | null = null) => {
    const param = !day ? '' : `?days=${day}`;
    const res = await fetch(API_BACKEND_ENDPOINTS.statistics() + param, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })

    if (!res.ok) throw await getMessageError(res);

    return res.json();
  }
}

export const customService = new CustomService();
