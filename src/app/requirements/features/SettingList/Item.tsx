import {Icon, List} from '@lobehub/ui';
import {createStyles, useResponsive} from 'antd-style';
import {ChevronRight, type LucideIcon} from 'lucide-react';
import {CSSProperties, ReactNode, memo} from 'react';

const {Item} = List;

const useStyles = createStyles(({css, token, responsive}) => ({
  container: css`
    position: relative;
    padding-top: 16px;
    padding-bottom: 16px;
    border-radius: ${token.borderRadius}px;

    ${responsive.mobile} {
      border-radius: 0;
    }
  `,
  noHover: css`
    pointer-events: none;
  `,
}));

export interface ItemProps {
  active?: boolean;
  className?: string;
  hoverable?: boolean;
  icon: LucideIcon;
  label: ReactNode;
  style?: CSSProperties;
}

const SettingItem = memo<ItemProps>(
  ({label, hoverable = true, active = false, style, className}) => {
    const {cx, styles} = useStyles();
    const {mobile} = useResponsive();
    return (
      <Item
        active={active}
        className={cx(styles.container, !hoverable && styles.noHover, className)}
        style={style}
        title={label as string}
      />
    );
  },
);

export default SettingItem;
