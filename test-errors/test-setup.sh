#!/bin/bash

# Скрипт для тестирования логирования и управления темой

echo "==================================="
echo "Проверка структуры проекта"
echo "==================================="

# Проверка наличия всех необходимых файлов
files_to_check=(
  "utils/logger.ts"
  "utils/theme.ts"
  "app/plugins/theme.ts"
  "app/middleware/theme.global.ts"
  "app/components/ThemeSwitcher.vue"
  "app/layout/default.vue"
  "server/middleware/logger.ts"
  "LOGGING_AND_THEME_GUIDE.md"
)

cd "c:\\OpenServer\\domains\\temp\\test-nuxt-installation\\test-errors"

echo ""
for file in "${files_to_check[@]}"; do
  if [ -f "$file" ]; then
    echo "✓ $file"
  else
    echo "✗ $file (NOT FOUND)"
  fi
done

echo ""
echo "==================================="
echo "Готово к запуску!"
echo "==================================="
echo ""
echo "Для запуска dev сервера выполните:"
echo "  npm run dev"
echo ""
echo "Затем откройте:"
echo "  http://localhost:3000"
echo ""
echo "Откройте консоль (F12) для просмотра логов:"
echo "  - Синие логи - на сервере"
echo "  - Зелёные логи - на клиенте"
echo ""
