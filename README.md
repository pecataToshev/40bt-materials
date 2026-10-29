# Водач на кораб до 40 БТ по море: материали

Статичен сайт на Astro: светлини, дневни знаци, звукови сигнали, буйове, ветрове, време, глоби и тестове по всички 848 въпроса.

## Стартиране

```bash
npm install
npm run dev      # http://localhost:4321/
npm run build
```

## Публикуване в GitHub Pages

1. Качи кода в `main` на репото `pecataToshev/40bt-materials`.
2. В GitHub: Settings → Pages → Source: **GitHub Actions**.
3. Всеки push в `main` пуска `.github/workflows/deploy.yml`.

Адрес: https://pecatatoshev.github.io/40bt-materials/

## Забележки

- Не е официален материал. Рисунките са оригинални, не са копия от PDF-а.
- Верните отговори са взети от синьото в PDF-а. Провери съмнителните (напр. № 182/183, 286/300, 538).
- Грешките в тестовете се пазят в `localStorage` на браузъра.
