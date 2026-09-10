import { coffees } from '../../data/coffees';
import { CoffeeCard } from './CoffeeCard';

export function CollectionGrid() {
  return (
    <section id="collection-grid" className="bg-black py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-zinc-500 text-sm font-mono tracking-wider mb-16 max-w-xl mx-auto">
          Pick a lot, pick your roast, pick your grind. We roast it, grind it, seal it and ship it — nothing sits on a shelf.
        </p>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-20">
          {coffees.map((coffee, index) => (
            <CoffeeCard
              key={coffee.id}
              coffee={coffee}
              image={coffee.image}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}