## Примеры новых логов

### На сервере (синий):

```console
1. Server middleware
/server/middleware/logger.ts
[21 ноября 2025, 15:52, timer - 00:00:150]

2. Plugin setup
/app/plugins/theme.ts
[21 ноября 2025, 15:52, timer - 00:02:340]

3. Client middleware
/app/middleware/theme.global.ts
[21 ноября 2025, 15:52, timer - 00:05:120]
```

### На клиенте (зелёный, компактная строка):

```console
1. Server middleware  /server/middleware/logger.ts  [21 ноября 2025, 15:52, timer - 00:00:150]
2. Plugin setup  /app/plugins/theme.ts  [21 ноября 2025, 15:52, timer - 00:02:340]
3. Client middleware  /app/middleware/theme.global.ts  [21 ноября 2025, 15:52, timer - 00:05:120]
```

### Что изменилось:

- ✅ Убраны секунды из времени (15:52 вместо 15:52:13)
- ✅ Добавлены миллисекунды в таймер (00:02:340 вместо 00:02)
