import {API_BACKEND_ENDPOINTS} from "@/services/_url";
import {ChatMessage} from "@/types/message";
import {getMessageError} from "@/utils/fetch";
import {Login} from "@/types/custom";
import {customSelectors, useCustomStore} from "@/store/custom";

export interface PointParams {
  title: string,
  content: string,
  type: string,
}

export interface Page {
  currentPage: number,
  pageSize: number
}

/**
 * 后台相关接口业务
 */
class CustomService {

  // 保存AI对话消息内容，无须确认是否保存成功
  saveMessage = (message?: ChatMessage) => {
    if (!message) return;

    fetch(API_BACKEND_ENDPOINTS.saveMessage(), {
      body: JSON.stringify(message),
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
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
    const s = useCustomStore.getState();
    const loginToken = customSelectors.getLoginToken(s);
    const res = await fetch(API_BACKEND_ENDPOINTS.savePoints(), {
      body: JSON.stringify(params),
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + loginToken}
    })

    if (!res.ok) throw await getMessageError(res);

    return res.json();
  }

  // 获取AI解析的商机点列表
  getPoints = async (sessionId: string, topicId: string | undefined): Promise<any> => {
    const loginToken = customSelectors.getLoginToken(useCustomStore.getState());
    let param = `?sessionId=${sessionId}`;
    if (topicId) param += `&topicId=${topicId}`;
    const res = await fetch(API_BACKEND_ENDPOINTS.getPoints() + param, {
      method: 'GET',
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + loginToken}
    })

    if (!res.ok) throw await getMessageError(res);

    return res.json();
  }

  // 查看商机详情
  getPointDetail = async (id: number) => {

  }

  // 分页获取商机留言列表信息
  getComments = async (pointId: number, page: Page) => {

  }

  // 获取商机推荐解决方案列表信息
  getPlans = async (pointId: number) => {

  }
}

export const customService = new CustomService();