import {List, ListItemProps} from '@lobehub/ui';
import {useHover} from 'ahooks';
import {createStyles, useResponsive} from 'antd-style';
import {memo, useMemo, useRef} from 'react';

const {Item} = List;

const useStyles = createStyles(({css, token, responsive}) => {
  return {
    container: css`
      position: relative;

      margin-block: 2px;
      padding-right: 16px;
      padding-left: 8px;

      border-radius: ${token.borderRadius}px;

      ${responsive.mobile} {
        margin-block: 0;
        padding-left: 12px;
        border-radius: 0;
      }
    `,
  };
});

const ListItem = memo<ListItemProps>(
  ({active, showAction, actions, ...props}) => {
    const ref = useRef(null);
    const isHovering = useHover(ref);
    const {mobile} = useResponsive();
    const {styles} = useStyles();

    return (
      <Item
        actions={actions}
        active={mobile ? false : active}
        avatar={<></>}
        className={styles.container}
        ref={ref}
        showAction={actions && (isHovering || showAction)}
        {...(props as any)}
      />
    );
  },
);

export default ListItem;
