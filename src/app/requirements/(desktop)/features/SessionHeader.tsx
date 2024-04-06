import {createStyles} from 'antd-style';
import {memo} from 'react';
import {Flexbox} from 'react-layout-kit';


import SessionSearchBar from '../../features/SessionSearchBar';

export const useStyles = createStyles(({css, token}) => ({
  top: css`
    position: sticky;
    top: 0;
  `,
}));

const Header = memo(() => {
  const {styles} = useStyles();

  return (
    <Flexbox className={styles.top} gap={16} padding={16}>
      <Flexbox>
        商机列表
      </Flexbox>
      <SessionSearchBar />
    </Flexbox>
  );
});

export default Header;
