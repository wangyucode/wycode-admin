import { ConnectProps, ConnectState } from '@/models/connect';
import React, { Component } from 'react';
import { Icon, Tooltip } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import SelectLang from '../SelectLang';
import styles from './index.less';
import Avatar from './AvatarDropdown';
import { connect } from 'dva';

export type SiderTheme = 'light' | 'dark';

export interface GlobalHeaderRightProps extends ConnectProps {
  theme?: SiderTheme;
  layout: 'sidemenu' | 'topmenu';
}

class GlobalHeaderRight extends Component<GlobalHeaderRightProps> {
  render() {
    const { theme, layout } = this.props;
    let className = styles.right;

    if (theme === 'dark' && layout === 'topmenu') {
      className = `${styles.right}  ${styles.dark}`;
    }

    return (
      <div className={className}>
        <Tooltip
          title={formatMessage({
            id: 'component.globalHeader.help',
          })}
        >
          <a
            target="_blank"
            href="https://pro.ant.design/docs/getting-started"
            rel="noopener noreferrer"
            className={styles.action}
          >
            <Icon type="question-circle-o" />
          </a>
        </Tooltip>
        <Avatar />
        <SelectLang className={styles.action} />
      </div>
    );
  }
}

export default connect(({ settings }: ConnectState) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
