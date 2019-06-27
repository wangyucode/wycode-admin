import { Card } from 'antd';
import * as React from 'react';
import { Hero } from '@/models/dota';
import styles from './HeroList.less';

export default (props: { title: string; heros: Hero[]; loading: boolean }) => {
  const heroItems = props.heros.map(hero => (
    <li className={styles.li} key={hero.name}>
      <img src={hero.imageUrl} className={styles.img} alt={hero.name} />
      <span className={styles.name}>{hero.name}</span>
    </li>
  ));
  return (
    <Card bordered={false} title={props.title} loading={props.loading}>
      <ul className={styles.ul}>{heroItems}</ul>
    </Card>
  );
};
