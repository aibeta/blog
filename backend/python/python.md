## python

- 字符串换行: 在行末尾用 `\`
- 字符串格式化， `sql = "%s" / (uid) `
- vscode 里选取 docker-compose 作为 interpreter
```python
goods_id = list(map((lambda i: i['id']), goods['list']))
    goods_name = list(map((lambda i: i['name']), goods['list']))
    goods_map = dict(zip(goods_id, goods_name))

    for banner in res['list']: 
        banner['jump_desc'] = goods_map.get(int(banner['jump_url']))
```