import React from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Card, Col, Row } from 'antd';
import Pie from '@/components/Charts/Pie';
import Visitors from '@/components/dashboard/Visitors';

const data = {
  visitData2: [
    { x: '2019-06-12', y: 1 },
    { x: '2019-06-13', y: 6 },
    {
      x: '2019-06-14',
      y: 4,
    },
    { x: '2019-06-15', y: 8 },
    { x: '2019-06-16', y: 3 },
    { x: '2019-06-17', y: 7 },
    {
      x: '2019-06-18',
      y: 2,
    },
  ],
  salesData: [
    { x: '1月', y: 986 },
    { x: '2月', y: 733 },
    { x: '3月', y: 427 },
    {
      x: '4月',
      y: 253,
    },
    { x: '5月', y: 955 },
    { x: '6月', y: 800 },
    { x: '7月', y: 1113 },
    { x: '8月', y: 251 },
    {
      x: '9月',
      y: 404,
    },
    { x: '10月', y: 897 },
    { x: '11月', y: 1062 },
    { x: '12月', y: 801 },
  ],
  searchData: [
    { index: 1, keyword: '搜索关键词-0', count: 976, range: 76, status: 1 },
    {
      index: 2,
      keyword: '搜索关键词-1',
      count: 764,
      range: 42,
      status: 0,
    },
    { index: 3, keyword: '搜索关键词-2', count: 876, range: 9, status: 0 },
    {
      index: 4,
      keyword: '搜索关键词-3',
      count: 874,
      range: 34,
      status: 0,
    },
    { index: 5, keyword: '搜索关键词-4', count: 871, range: 58, status: 0 },
    {
      index: 6,
      keyword: '搜索关键词-5',
      count: 506,
      range: 54,
      status: 0,
    },
    { index: 7, keyword: '搜索关键词-6', count: 182, range: 93, status: 1 },
    {
      index: 8,
      keyword: '搜索关键词-7',
      count: 630,
      range: 71,
      status: 1,
    },
    { index: 9, keyword: '搜索关键词-8', count: 518, range: 65, status: 0 },
    {
      index: 10,
      keyword: '搜索关键词-9',
      count: 55,
      range: 95,
      status: 1,
    },
    { index: 11, keyword: '搜索关键词-10', count: 628, range: 72, status: 0 },
    {
      index: 12,
      keyword: '搜索关键词-11',
      count: 596,
      range: 44,
      status: 0,
    },
    { index: 13, keyword: '搜索关键词-12', count: 485, range: 89, status: 0 },
    {
      index: 14,
      keyword: '搜索关键词-13',
      count: 776,
      range: 96,
      status: 0,
    },
    { index: 15, keyword: '搜索关键词-14', count: 726, range: 17, status: 1 },
    {
      index: 16,
      keyword: '搜索关键词-15',
      count: 362,
      range: 57,
      status: 0,
    },
    { index: 17, keyword: '搜索关键词-16', count: 322, range: 53, status: 0 },
    {
      index: 18,
      keyword: '搜索关键词-17',
      count: 827,
      range: 70,
      status: 1,
    },
    { index: 19, keyword: '搜索关键词-18', count: 252, range: 46, status: 1 },
    {
      index: 20,
      keyword: '搜索关键词-19',
      count: 693,
      range: 17,
      status: 0,
    },
    { index: 21, keyword: '搜索关键词-20', count: 229, range: 17, status: 1 },
    {
      index: 22,
      keyword: '搜索关键词-21',
      count: 100,
      range: 81,
      status: 1,
    },
    { index: 23, keyword: '搜索关键词-22', count: 752, range: 29, status: 1 },
    {
      index: 24,
      keyword: '搜索关键词-23',
      count: 219,
      range: 75,
      status: 1,
    },
    { index: 25, keyword: '搜索关键词-24', count: 277, range: 16, status: 0 },
    {
      index: 26,
      keyword: '搜索关键词-25',
      count: 227,
      range: 34,
      status: 0,
    },
    { index: 27, keyword: '搜索关键词-26', count: 667, range: 11, status: 0 },
    {
      index: 28,
      keyword: '搜索关键词-27',
      count: 785,
      range: 30,
      status: 0,
    },
    { index: 29, keyword: '搜索关键词-28', count: 890, range: 81, status: 1 },
    {
      index: 30,
      keyword: '搜索关键词-29',
      count: 92,
      range: 10,
      status: 0,
    },
    { index: 31, keyword: '搜索关键词-30', count: 47, range: 43, status: 0 },
    {
      index: 32,
      keyword: '搜索关键词-31',
      count: 701,
      range: 4,
      status: 1,
    },
    { index: 33, keyword: '搜索关键词-32', count: 833, range: 22, status: 0 },
    {
      index: 34,
      keyword: '搜索关键词-33',
      count: 507,
      range: 31,
      status: 0,
    },
    { index: 35, keyword: '搜索关键词-34', count: 155, range: 39, status: 1 },
    {
      index: 36,
      keyword: '搜索关键词-35',
      count: 733,
      range: 4,
      status: 0,
    },
    { index: 37, keyword: '搜索关键词-36', count: 869, range: 65, status: 1 },
    {
      index: 38,
      keyword: '搜索关键词-37',
      count: 50,
      range: 80,
      status: 1,
    },
    { index: 39, keyword: '搜索关键词-38', count: 141, range: 51, status: 1 },
    {
      index: 40,
      keyword: '搜索关键词-39',
      count: 931,
      range: 54,
      status: 1,
    },
    { index: 41, keyword: '搜索关键词-40', count: 193, range: 59, status: 1 },
    {
      index: 42,
      keyword: '搜索关键词-41',
      count: 722,
      range: 7,
      status: 0,
    },
    { index: 43, keyword: '搜索关键词-42', count: 183, range: 9, status: 1 },
    {
      index: 44,
      keyword: '搜索关键词-43',
      count: 908,
      range: 81,
      status: 1,
    },
    { index: 45, keyword: '搜索关键词-44', count: 304, range: 41, status: 1 },
    {
      index: 46,
      keyword: '搜索关键词-45',
      count: 990,
      range: 54,
      status: 1,
    },
    { index: 47, keyword: '搜索关键词-46', count: 761, range: 7, status: 1 },
    {
      index: 48,
      keyword: '搜索关键词-47',
      count: 242,
      range: 7,
      status: 0,
    },
    { index: 49, keyword: '搜索关键词-48', count: 905, range: 63, status: 0 },
    {
      index: 50,
      keyword: '搜索关键词-49',
      count: 606,
      range: 88,
      status: 0,
    },
  ],
  offlineData: [
    { name: 'Stores 0', cvr: 0.2 },
    { name: 'Stores 1', cvr: 0.9 },
    {
      name: 'Stores 2',
      cvr: 0.2,
    },
    { name: 'Stores 3', cvr: 0.5 },
    { name: 'Stores 4', cvr: 0.9 },
    {
      name: 'Stores 5',
      cvr: 0.7,
    },
    { name: 'Stores 6', cvr: 0.5 },
    { name: 'Stores 7', cvr: 0.4 },
    {
      name: 'Stores 8',
      cvr: 0.7,
    },
    { name: 'Stores 9', cvr: 0.7 },
  ],
  offlineChartData: [
    { x: 1560324301167, y1: 34, y2: 87 },
    {
      x: 1560326101167,
      y1: 71,
      y2: 44,
    },
    { x: 1560327901167, y1: 33, y2: 95 },
    { x: 1560329701167, y1: 46, y2: 43 },
    {
      x: 1560331501167,
      y1: 79,
      y2: 18,
    },
    { x: 1560333301167, y1: 87, y2: 94 },
    { x: 1560335101167, y1: 84, y2: 25 },
    {
      x: 1560336901167,
      y1: 89,
      y2: 101,
    },
    { x: 1560338701167, y1: 39, y2: 57 },
    { x: 1560340501167, y1: 99, y2: 17 },
    {
      x: 1560342301167,
      y1: 83,
      y2: 10,
    },
    { x: 1560344101167, y1: 71, y2: 21 },
    { x: 1560345901167, y1: 54, y2: 105 },
    {
      x: 1560347701167,
      y1: 81,
      y2: 109,
    },
    { x: 1560349501167, y1: 50, y2: 97 },
    { x: 1560351301167, y1: 43, y2: 18 },
    {
      x: 1560353101167,
      y1: 59,
      y2: 57,
    },
    { x: 1560354901167, y1: 60, y2: 81 },
    { x: 1560356701167, y1: 67, y2: 70 },
    {
      x: 1560358501167,
      y1: 55,
      y2: 50,
    },
  ],
  salesTypeData: [
    { x: '家用电器', y: 4544 },
    { x: '食用酒水', y: 3321 },
    { x: '个护健康', y: 3113 },
    {
      x: '服饰箱包',
      y: 2341,
    },
    { x: '母婴产品', y: 1231 },
    { x: '其他', y: 1231 },
  ],
  salesTypeDataOnline: [
    { x: '家用电器', y: 244 },
    { x: '食用酒水', y: 321 },
    {
      x: '个护健康',
      y: 311,
    },
    { x: '服饰箱包', y: 41 },
    { x: '母婴产品', y: 121 },
    { x: '其他', y: 111 },
  ],
  salesTypeDataOffline: [
    { x: '家用电器', y: 99 },
    { x: '食用酒水', y: 188 },
    {
      x: '个护健康',
      y: 344,
    },
    { x: '服饰箱包', y: 255 },
    { x: '其他', y: 65 },
  ],
  radarData: [
    { name: '个人', label: '引用', value: 10 },
    {
      name: '个人',
      label: '口碑',
      value: 8,
    },
    { name: '个人', label: '产量', value: 4 },
    { name: '个人', label: '贡献', value: 5 },
    {
      name: '个人',
      label: '热度',
      value: 7,
    },
    { name: '团队', label: '引用', value: 3 },
    { name: '团队', label: '口碑', value: 9 },
    {
      name: '团队',
      label: '产量',
      value: 6,
    },
    { name: '团队', label: '贡献', value: 3 },
    { name: '团队', label: '热度', value: 1 },
    {
      name: '部门',
      label: '引用',
      value: 4,
    },
    { name: '部门', label: '口碑', value: 1 },
    { name: '部门', label: '产量', value: 6 },
    {
      name: '部门',
      label: '贡献',
      value: 5,
    },
    { name: '部门', label: '热度', value: 7 },
  ],
};

export default () => (
  <GridContent>
    <Row gutter={24}>
      <Col span={12}>
        <Visitors />
      </Col>
      <Col span={8}>
        <Card title="分类" bordered={false}>
          <Pie hasLegend data={data.salesTypeData} height={256} lineWidth={4} />
        </Card>
      </Col>
      <Col span={4}>
        <Card title="状态" bordered={false}>
          <p>
            主站：
            <a href="https://travis-ci.com/wangyucode/wycode.cn">
              <img src="https://travis-ci.com/wangyucode/wycode.cn.svg?branch=master" alt="主站" />
            </a>
          </p>
          <p>
            Admin：
            <a href="https://travis-ci.com/wangyucode/wycode-admin">
              <img
                src="https://travis-ci.com/wangyucode/wycode-admin.svg?branch=master"
                alt="Admin"
              />
            </a>
          </p>
        </Card>
      </Col>
    </Row>
  </GridContent>
);
