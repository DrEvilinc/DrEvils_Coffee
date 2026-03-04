import { coffees } from '../../data/coffees';
import { CoffeeCard } from './CoffeeCard';

const coffeeImages = [
  'https://images.unsplash.com/photo-1620292361418-f48e64590736?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvbWJpYSUyMGNvZmZlZSUyMHBsYW50YXRpb24lMjBhbmRlc3xlbnwxfHx8fDE3NzI1OTQwMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1756121422046-8a3638d75efb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvbWJpYW4lMjBjb2ZmZWUlMjBjaGVycmllcyUyMGhhcnZlc3R8ZW58MXx8fHwxNzcyNTk0MDEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1712607613395-3f0612ad16eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3N0YSUyMHJpY2ElMjBjb2ZmZWUlMjBwbGFudGF0aW9ufGVufDF8fHx8MTc3MTA5MzY0OHww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1712553935892-1c537df3e96c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldGhpb3BpYSUyMGNvZmZlZSUyMHBsYW50YXRpb24lMjBoaWdobGFuZHN8ZW58MXx8fHwxNzcxMTQxNTI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1752067954948-fad43a7457de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJ1JTIwY29mZmVlJTIwZmFybSUyMG1vdW50YWluc3xlbnwxfHx8fDE3NzExNDE1MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1759458494971-377d0492243c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5ZW1lbiUyMGNvZmZlZSUyMHRlcnJhY2VzJTIwbW91bnRhaW58ZW58MXx8fHwxNzcxMTQxNTI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
];

export function CollectionGrid() {
  return (
    <section id="collection-grid" className="bg-black py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-20">
          {coffees.map((coffee, index) => (
            <CoffeeCard
              key={coffee.id}
              coffee={coffee}
              image={coffeeImages[index]}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}