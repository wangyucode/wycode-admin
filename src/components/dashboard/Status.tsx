import { Card } from 'antd';
import React from 'react';

export default () => (
  <Card bordered={false}>
    主站：
    <a href="https://travis-ci.com/wangyucode/wycode.cn" style={{ marginRight: 24 }}>
      <img src="https://travis-ci.com/wangyucode/wycode.cn.svg?branch=master" alt="主站" />
    </a>
    Admin：
    <a href="https://travis-ci.com/wangyucode/wycode-admin" style={{ marginRight: 24 }}>
      <img src="https://travis-ci.com/wangyucode/wycode-admin.svg?branch=master" alt="Admin" />
    </a>
    API：
    <a href="https://wycode.cn/api.html">
      <img
        src="https://wycode.cn/web/api/public/admin/dashboard/status"
        alt="API"
        onError={e => {
          //@ts-ignore
          e.target.src =
            'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5MCIgaGVpZ2h0PSIyMCI+PGxpbmVhckdyYWRpZW50IGlkPSJhIiB4Mj0iMCIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2VlZSIgc3RvcC1vcGFjaXR5PSIuMiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1vcGFjaXR5PSIuMiIvPjwvbGluZWFyR3JhZGllbnQ+PHJlY3Qgcng9IjMiIHdpZHRoPSI5MCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzU1NSIvPjxyZWN0IHJ4PSIzIiB4PSIzNyIgd2lkdGg9IjUzIiBoZWlnaHQ9IjIwIiBmaWxsPSIjZjU1Ii8+PHJlY3QgeD0iMzciIHdpZHRoPSI0IiBoZWlnaHQ9IjIwIiBmaWxsPSIjZjU1Ii8+PHJlY3Qgcng9IjMiIHdpZHRoPSI5MCIgaGVpZ2h0PSIyMCIgZmlsbD0idXJsKCNhKSIvPjxnIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJEZWphVnUgU2FucyxWZXJkYW5hLEdlbmV2YSxzYW5zLXNlcmlmIiBmb250LXNpemU9IjExIj48dGV4dCB4PSIxOSIgeT0iMTUiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjUiPkFQSTwvdGV4dD48dGV4dCB4PSIyMCIgeT0iMTQiPkFQSTwvdGV4dD48dGV4dCB4PSI2MyIgeT0iMTUiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjUiPmVycm9yPC90ZXh0Pjx0ZXh0IHg9IjYyIiB5PSIxNCI+ZXJyb3I8L3RleHQ+PC9nPjwvc3ZnPg==';
        }}
      />
    </a>
  </Card>
);
