import { CollectionHero } from '../components/collection/CollectionHero';
// import { Manifesto } from '../components/collection/Manifesto';
import { CollectionGrid } from '../components/collection/CollectionGrid';
import { TiersExplained } from '../components/collection/TiersExplained';
import { Transparency } from '../components/collection/Transparency';

export function Collection() {
  return (
    <div className="min-h-screen bg-black">
      <CollectionHero />
      {/* <Manifesto /> */}
      <CollectionGrid />
      <TiersExplained />
      <Transparency />
    </div>
  );
}