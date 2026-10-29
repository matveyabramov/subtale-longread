import type { ReactNode } from 'react';
import type { ExplorerCategoryId } from './model';

interface ExplanationCopy {
  title: string;
  quote?: string;
  paragraphs: ReactNode[];
}

// Approved Stage 3.5 copy. Typography marks English phrases without changing text.
export const explorerExplanationCopy: Record<ExplorerCategoryId, ExplanationCopy> = {
  idiom: {
    title: 'ЛЁД ЗДЕСЬ НИ ПРИ ЧЁМ',
    paragraphs: [
      <><strong lang="en">Break the ice</strong> — буквально «разбить лёд». Но на самом деле это выражение означает начать разговор и снять неловкость между людьми.</>,
      <>Поэтому среди осколков появляется телефонная трубка. Здесь лёд разбивают не руками, а словами.</>,
    ],
  },
  pun: {
    title: 'ПОЧЕМУ ВЕЛОСИПЕД УПАЛ?',
    quote: 'Why did the bicycle fall over? Because it was two-tired.',
    paragraphs: [
      <><strong lang="en">Two-tired</strong> — «с двумя шинами», а <strong lang="en">too tired</strong> — «слишком устал». На слух они звучат одинаково.</>,
      <>Велосипед буквально «устал» и завалился. Шутка существует именно благодаря звучанию английских слов.</>,
    ],
  },
  doubleMeaning: {
    title: 'ВИДЕТЬ ИЛИ ВСТРЕЧАТЬСЯ?',
    quote: "I'm seeing someone.",
    paragraphs: [
      <>Буквально — «Я кого-то вижу». Но <strong lang="en">seeing someone</strong> также означает «с кем-то встречаться» в романтическом смысле.</>,
      <>Поэтому сначала ты видишь глаз, а затем — силуэты пары. Одна фраза, два разных прочтения.</>,
    ],
  },
  reference: {
    title: 'ЗИМА, КОТОРАЯ НЕ ПРО ПОГОДУ',
    paragraphs: [
      <><strong lang="en">Winter is coming</strong> — буквально «Зима близко».</>,
      <>Но для зрителей <strong lang="en">Game of Thrones</strong> это ещё и девиз дома Старков — предупреждение о грядущей опасности.</>,
      <>Поэтому снежинки превращаются в Железный трон. Без знания сериала второй смысл фразы легко пропустить.</>,
    ],
  },
};
