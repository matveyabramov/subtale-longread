import type { ReactNode } from 'react';
import type { ExplorerCategoryId } from './model';

interface ExplanationCopy {
  title: string;
  lead?: string;
  quote?: ReactNode;
  paragraphs: ReactNode[];
}

// Approved Stage 3.5 copy. Typography marks English phrases without changing text.
export const explorerExplanationCopy: Record<ExplorerCategoryId, ExplanationCopy> = {
  idiom: {
    title: 'ЛЁД ЗДЕСЬ НИ ПРИ ЧЁМ',
    lead: 'Break the ice',
    paragraphs: [
      <> — буквально «разбить лёд». Но на самом деле это выражение означает начать разговор и снять неловкость между людьми.</>,
      <>Поэтому среди осколков появляется телефонная трубка. Здесь лёд разбивают не руками, а словами.</>,
    ],
  },
  pun: {
    title: 'ПОЧЕМУ ВЕЛОСИПЕД УПАЛ?',
    quote: <>Why did the bicycle fall over? Because it was <strong>two-tired</strong>.</>,
    paragraphs: [
      <><strong lang="en">Two-tired</strong> — «с двумя шинами», а <strong lang="en">too tired</strong> — «слишком устал». На слух они звучат одинаково.</>,
      <>Велосипед буквально «устал» и завалился. Шутка существует именно благодаря звучанию английских слов.</>,
    ],
  },
  doubleMeaning: {
    title: 'ВИДЕТЬ ИЛИ ВСТРЕЧАТЬСЯ?',
    quote: "I'm seeing someone.",
    paragraphs: [
      <>Буквально — <strong>«Я кого-то вижу»</strong>. Но <strong lang="en">seeing someone</strong> также означает <strong>«с кем-то встречаться»</strong> в романтическом смысле.</>,
      <>Поэтому сначала ты видишь глаз, а затем — силуэты пары. Одна фраза, два разных прочтения.</>,
    ],
  },
  reference: {
    title: 'ЗИМА, КОТОРАЯ НЕ ПРО ПОГОДУ',
    lead: 'Winter is coming',
    paragraphs: [
      <> — буквально «Зима близко».</>,
      <>Но для зрителей <strong lang="en">Game of Thrones</strong> это ещё и девиз дома Старков — предупреждение о грядущей опасности.</>,
      <>Поэтому снежинки превращаются в Железный трон. Без знания сериала второй смысл фразы легко пропустить.</>,
    ],
  },
};
