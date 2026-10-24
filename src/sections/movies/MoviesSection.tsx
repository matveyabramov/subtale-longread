import { movieCases } from './model';

export function MoviesSection() {
  return (
    <section id="movies" aria-labelledby="movies-title" data-narrative-section
      data-case-count={movieCases.length}>
      <h2 id="movies-title" tabIndex={-1}>Movies</h2>
    </section>
  );
}
