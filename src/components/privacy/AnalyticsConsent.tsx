import { getAnalyticsConsent, initializeAnalytics, setAnalyticsConsent, type AnalyticsConsentChoice } from '../../analytics/metrica';
import styles from './AnalyticsConsent.module.css';

type Props = { open: boolean; onClose: () => void };

export function AnalyticsConsent({ open, onClose }: Props) {
  if (!open) return null;

  function decide(choice: AnalyticsConsentChoice) {
    setAnalyticsConsent(choice);
    if (choice === 'accepted') initializeAnalytics();
    onClose();
  }

  const existingChoice = getAnalyticsConsent();
  return (
    <aside className={styles.notice} role="region" aria-label="Настройки аналитики">
      <p className={styles.heading}>СТАТИСТИКА И COOKIES</p>
      <p className={styles.description}>
        SUBTALE использует Яндекс Метрику (включая Вебвизор), чтобы понимать, как читают лонгрид.
        Аналитика запускается только с вашего согласия.
        {' '}<a href={`${import.meta.env.BASE_URL}privacy.html`} target="_blank" rel="noopener noreferrer">
          Подробнее о данных
        </a>
      </p>
      <div className={styles.actions}>
        <button type="button" className={styles.accept} onClick={() => decide('accepted')}>Разрешить</button>
        <button type="button" className={styles.reject} onClick={() => decide('rejected')}>Не разрешать</button>
        {existingChoice !== null && <button type="button" className={styles.close} onClick={onClose}>Закрыть</button>}
      </div>
    </aside>
  );
}
