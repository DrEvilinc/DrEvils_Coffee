import { CollectionHero } from '../components/collection/CollectionHero';
// import { Manifesto } from '../components/collection/Manifesto';
import { CollectionGrid } from '../components/collection/CollectionGrid';
import { TiersExplained } from '../components/collection/TiersExplained';
import { Transparency } from '../components/collection/Transparency';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export function Collection() {
  useDocumentMeta({
    title: "The Collection — Six Single-Origin Lots | Dr. Evil's Coffee",
    description:
      'Six single-origin lots from Colombia, Peru, Ethiopia, and Yemen — each roasted to order in Light, House, or Dark, ground to your brew method or shipped whole bean.',
    path: '/collection',
  });

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