import { useId, useState, type ReactNode } from 'react';
import type { MovieCaseId } from './model';

function SecondReading({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  return <>
    <button type="button" data-analysis="meaning-toggle" aria-expanded={expanded}
      aria-controls={id} onClick={() => setExpanded(!expanded)}>
      {expanded ? 'Скрыть второе прочтение' : 'Второе прочтение'} <span aria-hidden="true">{expanded ? '↑' : '↓'}</span>
    </button>
    <div id={id} hidden={!expanded}>{children}</div>
  </>;
}

// Editorial content from sp-longread/src/main.js cases, in its original order.
// Only markup is adapted to React; presentation belongs to SUBTALE CSS Modules.
export const movieAnalysis = {
  airplane: {
    category: "01 / Pun / Sound",
    film: "Airplane! (1980)",
    title: "Surely you can’t\nbe serious",
    content: <>
      <section data-analysis="case-section"><h3>На слух</h3><p data-analysis="case-quote" lang="en">Surely you can’t be serious.</p><p>«Неужели ты серьёзно?»</p></section>
      <section data-analysis="case-section"><h3>Что слышит доктор</h3><p data-analysis="case-equation"><span>Surely</span> ≈ <em>Shirley</em></p></section>
      <section data-analysis="case-section"><h3>Ответ</h3><p data-analysis="case-quote" lang="en">I am serious.<br />And don’t call me Shirley.</p></section>
      <section data-analysis="case-section case-mechanism"><h3>Механика</h3><p>Шутка держится почти целиком на звучании.<br />Surely — обычное наречие, но доктор делает вид,<br />будто услышал женское имя Shirley.</p><p>Если считывать только смысл предложения,<br />диалог остаётся понятным — а шутка исчезает.</p></section>
      <p data-analysis="case-conclusion">Ты понял вопрос.<br />Но услышал ли имя?</p></>,
  },
  backToTheFuture: {
    category: "02 / Broken idiom / Wordplay",
    film: "Back to the Future Part II (1989)",
    title: "Make like a tree and\nget out of here",
    content: <>
      <section data-analysis="case-section"><h3>Версия Биффа</h3><p data-analysis="case-quote" lang="en">Make like a tree and get out of here.</p></section>
      <section data-analysis="case-section"><h3>Как должно быть</h3><p data-analysis="case-quote" lang="en">Make like a tree and leave.</p></section>
      <section data-analysis="case-section case-mechanism"><h3>Механика</h3><p>В выражении есть каламбур:<br />leave — «уйти»,<br />leaf — «лист».</p><p>Бифф ломает шутливую конструкцию,<br />заменяя ключевое слово обычным<br />get out of here.</p><p>Во второй части старый Бифф прямо исправляет молодого:</p><p data-analysis="case-quote" lang="en">It’s leave, you idiot.</p></section>
      <p data-analysis="case-conclusion">Все слова правильные.<br />А выражение — нет.</p></>,
  },
  austinPowers: {
    category: "03 / Double meaning",
    film: "Austin Powers: International Man of Mystery (1997)",
    title: "Who does Number Two\nwork for?",
    content: <>
      <section data-analysis="case-section"><h3>Первое прочтение</h3><p>Number Two — имя / обозначение персонажа Доктора Зло.</p></section>
      <SecondReading>
        <section data-analysis="case-section"><h3>Второе прочтение</h3><p>number two — разговорное обозначение дефекации.</p></section>
        <section data-analysis="case-section case-mechanism"><h3>Механика</h3><p>Остин требует сказать, на кого работает Number Two.</p><p>Мужчина в соседней кабинке слышит второе значение<br />и думает, что Остин буквально борется<br />с содержимым унитаза.</p></section>
      </SecondReading>
      <p data-analysis="case-conclusion">Одна фраза.<br />Две сцены одновременно.</p></>,
  },
  sherlock: {
    category: "04 / Visual wordplay",
    film: "Sherlock — S02E01",
    title: "I AM\nSHER LOCKED",
    content: <>
      <div data-analysis="sherlock-construction">
        <section data-analysis="case-section"><h3>Что видно сначала</h3><p data-analysis="case-quote" lang="en">I AM <span data-analysis="blank-word">____</span> LOCKED</p><p>Телефон защищён четырёхсимвольным паролем.</p></section>
        <section data-analysis="case-section sherlock-key"><h3>Ключ</h3><p>SHER</p></section>
        <section data-analysis="case-section"><h3>Что появляется</h3><p data-analysis="case-quote" lang="en">I AM <em>SHER</em> LOCKED</p><p data-analysis="word-split"><em>SHER</em> + LOCKED</p></section>
      </div>
      <section data-analysis="case-section case-mechanism"><h3>Механика</h3><p>Фраза одновременно читается как интерфейс телефона —<br />locked —<br />и как I AM SHERLOCKED.</p><p>Имя Sherlock оказывается спрятано<br />внутри самой конструкции.</p><p>Смысл здесь возникает не только из того,<br />что сказано, но и из того, как фраза показана.</p></section>
      <p data-analysis="case-conclusion">Иногда второй смысл не произносят.<br />Его показывают.</p></>,
  },
  theShining: {
    category: "05 / Cultural reference",
    film: "The Shining (1980)",
    title: "Here’s Johnny!",
    content: <>
      <section data-analysis="case-section"><h3>Если не знать отсылку</h3><p>Джек проламывает дверь,<br />просовывает голову внутрь и говорит:</p><p data-analysis="case-quote" lang="en">Here’s Johnny!</p><p>Сама фраза почти ничего не объясняет.</p></section>
      <section data-analysis="case-section"><h3>Что слышал американский зритель</h3><p>Это узнаваемая формула,<br />которой Эд Макмэхон представлял Джонни Карсона<br />в The Tonight Show.</p></section>
      <section data-analysis="case-section case-mechanism"><h3>Что это добавляет</h3><p>На секунду сцена погони превращается<br />в абсурдный выход телеведущего.</p><p>Без культурного контекста происходящее<br />всё равно понятно,<br />но слой чёрного юмора легко пропустить.</p></section>
      <p data-analysis="case-conclusion">Ты услышал каждое слово.<br />Но часть реплики была не в фильме.</p></>,
  },
} satisfies Record<MovieCaseId, { category: string; film: string; title: string; content: ReactNode }>;
