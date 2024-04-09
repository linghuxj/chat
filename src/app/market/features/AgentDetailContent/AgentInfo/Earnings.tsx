import {memo} from "react";
import {Flexbox} from "react-layout-kit";
import {Button} from "antd";
import {TeamOutlined, UserSwitchOutlined} from "@ant-design/icons";
import {useCustomStore} from "@/store/custom";

interface EarningsProps {
  agentId?: string
}

const Earnings = memo<EarningsProps>(({agentId}) => {

  const points = useCustomStore((s) => s.points);

  return (
    <Flexbox gap={16}>
      <Button type={'dashed'} size={'large'} icon={<UserSwitchOutlined />}>总合作意向数：{points.filter(point => {
        if (!agentId) return true;
        return point.identify == agentId;
      }).map(point => point.countPlan).reduce((x, y) => x + y)}</Button>
      <Button type={'dashed'} size={'large'} icon={<TeamOutlined />}>总推荐合作数：{points.filter(point => {
        if (!agentId) return true;
        return point.identify == agentId;
      }).map(point => point.countSummary).reduce((x, y) => x + y)}</Button>
    </Flexbox>
  );
})

export default Earnings;
