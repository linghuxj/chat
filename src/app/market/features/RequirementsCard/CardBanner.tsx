import {DivProps} from '@lobehub/ui';
import {createStyles} from 'antd-style';
import {memo} from 'react';
import {Flexbox} from 'react-layout-kit';

import {MetaData} from '@/types/meta';

export const useStyles = createStyles(({css, token}) => ({
  banner: css`
    position: relative;

    overflow: hidden;

    height: 64px;
    margin-bottom: -56px;

    background: ${token.colorFillSecondary};

    mask-image: linear-gradient(to bottom, #fff, transparent);
  `,
  bannerImg: css`
    position: absolute;
    top: -50%;
    filter: blur(50px) saturate(2);
  `,
}));

interface CardBannerProps extends DivProps {
  mask?: boolean;
  maskColor?: string;
}

const RequirementsCardBanner = memo<CardBannerProps>(
  ({className, children, ...props}) => {
    const {styles, cx} = useStyles();

    return (
      <Flexbox
        align={'center'}
        className={cx(styles.banner, className)}
        justify={'center'}
        {...props}
      >
        {children}
      </Flexbox>
    );
  },
);

export default RequirementsCardBanner;
